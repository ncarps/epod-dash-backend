import { gql } from 'apollo-server'

const userInfoTypeDef = gql`
  type UserInfo {
    username: String
    fullname: String
  }

  type Query {
    userInfo: UserInfo
  }
`

export default userInfoTypeDef
