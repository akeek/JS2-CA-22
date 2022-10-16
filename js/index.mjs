import { submitUserValues } from "./api/registerUser.mjs";
import { submitLoginUser } from "./api/login.mjs";
import { findProfile } from "./api/findProfile.mjs";
import { user } from "./api/findProfile.mjs";
import { getPosts } from "./api/posts/getPosts.mjs";
import { sendPost } from "./api/posts/newPost.mjs";
import { submitUpdatedPost } from "./api/posts/updatePost.mjs";
import { id } from "./api/posts/idPost.mjs";
import { postById } from "./api/posts/idPost.mjs";

export const path = location.pathname;
export const BASE_API_URL = "https://nf-api.onrender.com";

if (path === "/register.html") {
  submitUserValues();
} else if (path === "/login.html") {
  submitLoginUser();
} else if (path === "/profile.html") {
  findProfile(`${BASE_API_URL}/api/v1/social/profiles/${user}?_posts=true`);
  sendPost();
  submitUpdatedPost();
} else if (path === "/index.html") {
  getPosts(`${BASE_API_URL}/api/v1/social/posts?_author=true&_comments=true&_reactions=true`);
} else if (path === "/post-by-id.html") {
  postById(`${BASE_API_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`);
}
