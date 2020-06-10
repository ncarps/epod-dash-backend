require('dotenv').config()
import { ApolloServer } from 'apollo-server-express'
import gql from 'graphql-tag'
import express from 'express'
import { resolvers, typeDefs } from './graphql'
import { injectMiddlewareAsync } from './commons/utils'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  makeExecutableSchema,
  mergeSchemas,
  SchemaDirectiveVisitor,
} from 'graphql-tools'
const cache = new InMemoryCache()
import fetch from 'cross-fetch'
import { fetchDelivery, fetchDriverLocation, fetchDriver } from './helper'

const { authURI, PORT, EPOD_API_URI } = process.env

const getUser = async (authorizationToken) => {
  const [tokenType, token] = authorizationToken.split(' ')
  let authGqlClient
  console.log('AuthURI', authURI, authorizationToken)

  if (tokenType) {
    authGqlClient = new ApolloClient({
      cache: cache,
      link: new HttpLink({
        uri: authURI,
        fetch,
        headers: {
          Authorization: authorizationToken,
        },
      }),
      name: 'epod-dash-service',
      version: '0.0.0',
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })
  }

  if (tokenType === 'Bearer') {
    console.log('Bearer ', authorizationToken)
    const query = authGqlClient.query({
      query: gql`
        query {
          getUser {
            id
            username
          }
        }
      `,
    })

    return new Promise((resolve, reject) => {
      query
        .then((d) => {
          resolve(d)
        })
        .catch((e) => {
          reject(e)
        })
    })
  } else if (tokenType === 'Basic') {
    console.log('Basic ', authorizationToken)
    const buff64 = new Buffer(token, 'base64')
    const ascData = buff64.toString('ascii')
    const [user, pass] = ascData.split(':')
    console.log('ascii', ascData)

    const mutate = authGqlClient.mutate({
      mutation: gql`
        mutation authenticate($user: String, $pass: String) {
          authenticate(
            serviceName: "password"
            params: { user: { username: $user }, password: $pass }
          ) {
            __typename
            ... on LoginResult {
              sessionId
              tokens {
                refreshToken
                accessToken
              }
              user {
                id
                username
              }
            }
          }
        }
      `,
      variables: {
        user,
        pass,
      },
    })

    return new Promise((resolve, reject) => {
      mutate
        .then((d) => {
          resolve(d)
        })
        .catch((e) => {
          console.log('Schema call error', e)
          reject(e)
        })
    })
  }

  return new Promise((resolve, reject) => {
    reject(new Error('Please login.'))
  })
}

const determineContextObjs = async (session) => {
  const { contextObjs, authFn } = await serverContext(session)

  Object.keys(contextObjs).forEach((fname) => {
    if (typeof contextObjs[fname] === 'function') {
      contextObjs[fname] = injectMiddlewareAsync(contextObjs[fname], authFn)
    }
  })

  return contextObjs
}

const createAuthSchema = async (authURI) => {
  //  //stitch
  //  const http = new HttpLink({ uri: authURI, fetch })
  //  const link = setContext((request, previousContext) => {
  //    if (!previousContext.graphqlContext) {
  //      return {}
  //    }
  //
  //    return {
  //      headers: {
  //        Authorization: 'Bearer ' + previousContext.graphqlContext.authToken,
  //      },
  //    }
  //  }).concat(http)
  //
  //  const remoteSchema = await introspectSchema(link)
  //
  //  //m refreshTokens
  //  //m logout
  //  //m authenticate
  //  //m verifyAuthenticate
  //  //m verifyAuthentication
  //  //q twoFactorSecret
  //  //q getUser
  //
  //  const executableRemoteSchema = makeRemoteExecutableSchema({
  //    schema: remoteSchema,
  //    link,
  //  })

  return {
    executableRemoteSchema: {}, //executableRemoteSchema,
    schemaRemoteDirectives: {}, //accounts.schemaDirectives,
    contextRemoteFn: () => {}, //accounts.context,
  }
}

const makeWrapToCheckAuth = (user) => () => {
  return new Promise((resolve, reject) => {
    if (user.username !== '' && user.id !== '') {
      resolve()
    }
    reject(new Error('Incorrect Credentials, Please login.'))
  })
}

const buildServer = async () => {
  if (authURI) {
    console.log('auth dependency', authURI)

    const {
      executableRemoteSchema,
      schemaRemoteDirectives,
      contextRemoteFn,
    } = await createAuthSchema(authURI)

    const executableSchema = makeExecutableSchema({ typeDefs, resolvers })

    return await new ApolloServer({
      schema: mergeSchemas({
        schemas: [executableSchema], //, executableRemoteSchema],
        //        schemaDirectives: {
        //          ...schemaRemoteDirectives,
        //        },
      }),
      context: async (session) => {
        //console.log('session auth', session.req.headers)
        //const remoteContext = await contextRemoteFn(session)
        const context = {
          //...remoteContext,
          ...(await determineContextObjs(session)),
        }
        return context
      },
    })
  }

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async (session) => {
      return await determineContextObjs(session)
    },
  })
}

const serverContext = async (session) => {
  const authorizationToken = session.req.headers.authorization || ''

  let user: any
  try {
    const u: any = await getUser(authorizationToken)
    user = u.data.authenticate.user
  } catch (e) {
    console.log('auth query err', e)
    user = {
      username: '',
      id: '',
    }
  }

  const authFn = makeWrapToCheckAuth(user)
  return {
    authFn,
    contextObjs: {
      user,
      fetchDelivery: async () =>
        fetchDelivery(session.req.headers.authorization),
      fetchDriverLocation: async () =>
        fetchDriverLocation(session.req.headers.authorization),
      fetchDriver: async () => fetchDriver(session.req.headers.authorization),
    },
  }
}
class AuthenticatedDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: any) {
    //field.resolve = authenticated(field.resolve);
    console.log('visit field', field)
  }

  public visitObject(object: any) {
    const fields = object.getFields()
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      if ('resolve' in field) {
        //field.resolve = authenticated(field.resolve);
        console.log('visit field obj', field)
      }
    })
  }
}
const startServer = async () => {
  const server = await buildServer()
  const app = express()
  const port = PORT || 5000
  server.applyMiddleware({ app })

  app.listen({ port: port }, () =>
    console.log(
      `🚀  Server ready at http://localhost:${port}${server.graphqlPath}`,
    ),
  )
}

startServer()
