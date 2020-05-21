const userInfoResolver = {
  Query: {
    userInfo: async (parent, args, context, info) => {
      const { user } = context

      return {
        id: user.username,
        username: user.username,
        fullname: user.username,
      }
    },
  },
}

export default userInfoResolver
