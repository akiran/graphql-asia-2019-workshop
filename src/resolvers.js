import {
  getPosts,
  getPost,
  getUsers,
  getUser,
  getComments,
  createPost,
  publishPost,
  createComment,
  signup,
  login,
  logout
} from "./connectors";
import pubsub from "./pubsub";

const resolvers = {
  User: {
    fullName: (user, args, ctx) => {
      return `${user.firstName} ${user.lastName}`;
    }
  },
  Post: {
    author: (post, args, ctx) => {
      return getUser(post.author);
    },
    comments: post => {
      return getComments(post.id);
    }
  },
  Comment: {
    author: (post, args, ctx) => {
      return getUser(post.author);
    }
  },
  Query: {
    ping: () => true,
    me: (_, args, ctx) => {
      if (!ctx.user) {
        throw new Error("Not logged in");
      }
      return getUser(ctx.user.id);
    },
    posts: () => getPosts(),
    post: (_, args) => getPost(args.id),
    users: (_, args, ctx) => {
      console.log("context", ctx.user);
      return getUsers();
    },
    user: (_, args) => getUser(args.id)
  },
  Mutation: {
    createPost: (_, args) => createPost(args),
    publishPost: (_, args, ctx) => publishPost(args, ctx),
    createComment: (_, args) => createComment(args),
    signup: (_, args, ctx) => signup(args, ctx),
    login: (_, args, ctx) => login(args, ctx),
    logout: (_, args, ctx) => logout(ctx)
  },
  Subscription: {
    onNewPost: {
      resolve(payload, args, ctx) {
        return payload;
      },
      subscribe: () => pubsub.asyncIterator("ON_NEW_POST")
    }
  }
};

export default resolvers;
