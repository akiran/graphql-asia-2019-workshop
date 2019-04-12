import {
  getPosts,
  getPost,
  getUsers,
  getUser,
  getComments,
  createPost,
  publishPost,
  createComment
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
    posts: () => getPosts(),
    post: (_, args) => getPost(args.id),
    users: (_, args, ctx) => {
      console.log("context", ctx.user);
      return getUsers();
    },
    user: (_, args) => getUser(args.id)
  }
};

export default resolvers;
