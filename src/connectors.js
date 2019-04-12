import db from "./db";

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
