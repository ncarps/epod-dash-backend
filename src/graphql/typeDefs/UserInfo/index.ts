import { gql } from 'apollo-server'

const userInfoTypeDef = gql`
  type UserInfo {
    id: ID
    username: String
    fullname: String
  }

  type Query {
    userInfo: UserInfo
  }
`

export default userInfoTypeDef
