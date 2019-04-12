import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "./config";
import db from "./db";
import pubsub from "./pubsub";

export function getUsers() {
  return db.get("users");
}

export function getUser(id) {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export function getPosts() {
  return db.get("posts");
}

export function getPost(id) {
  const posts = getPosts();
  return posts.find(post => post.id === id);
}

export function getComments(postId) {
  const comments = db.get("comments");
  return comments.filter(comment => comment.post === postId);
}

export function signup(user, { res }) {
  const users = getUsers();
  const salt = bcrypt.genSaltSync(10);
  const newUser = {
    id: users.length + 1,
    ...user,
    password: bcrypt.hashSync(user.password, salt)
  };
  const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
  const newUsers = users.concat(newUser);
  db.set("users", newUsers);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  });
  return true;
}

export function login(user, { res }) {
  const users = getUsers();
  const foundUser = users.find(u => u.email === user.email);
  if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
    const token = jwt.sign({ id: foundUser.id }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
    return true;
  }
  throw new Error("Not Authroized");
}

export function logout({ res, user }) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date()
  });
  return true;
}

export function createPost(post) {
  const posts = getPosts();
  const newPost = {
    id: posts.length + 1,
    ...post
  };
  const newPosts = posts.concat(newPost);
  db.set("posts", newPosts);
  pubsub.publish("ON_NEW_POST", newPost);
  return newPost;
}

export function publishPost(args) {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === args.id);
  if (index >= 0) {
    posts[index].published = true;
    db.set("posts", posts);
    return true;
  }
  return false;
}
export function createComment(comment) {
  const comments = db.get("comments");
  const newComment = {
    id: comments.length + 1,
    ...comment
  };
  const newComments = comments.concat(newComment);
  db.set("comments", newComments);
  return newComment;
}
