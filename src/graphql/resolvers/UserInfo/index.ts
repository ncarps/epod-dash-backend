const userInfoResolver = {
  Query: {
    userInfo: async (parent, args, context, info) => {
      const { user } = context

      return {
        username: user.username,
        fullname: user.username,
      }
    },
  },
}

export default userInfoResolver
