import { BASE_API_URL } from "../index.mjs";
import { postId } from "./posts/updatePost.mjs";
import { usersPosts } from "../templates/usersPosts.mjs";
import { profileTemp } from "../templates/profile.mjs";
import { deletePost } from "./posts/delete.mjs";
export const user = localStorage.getItem("username");

export async function findProfile(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    showPosts(json);
    showProfile(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

function showPosts(profile) {
  const postsContainer = document.getElementById("posts-container");
  const posts = profile.posts;
  posts.forEach((post) => {
    postsContainer.append(usersPosts(post));
  });
  editPost();
}

function showProfile(profile) {
  const profileContainer = document.getElementById("profile-container");
  profileContainer.append(profileTemp(profile));
}

function editPost() {
  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      postId.value = editBtn.id;
    });
  });

  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      deletePost(`${BASE_API_URL}/api/v1/social/posts/${deleteBtn.id}`);
    });
  });
}
