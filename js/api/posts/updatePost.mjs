import { BASE_API_URL } from "../../index.mjs";
export const postId = document.getElementById("updated-id");

const updatedBody = document.getElementById("updated-body");
const updatedForm = document.getElementById("updated-form");
const updatedTitle = document.getElementById("updated-title");
const updatedMedia = document.getElementById("updated-media");

async function updatePost(url, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export function submitUpdatedPost() {
  updatedForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedPost = {
      title: updatedTitle.value,
      body: updatedBody.value,
      media: updatedMedia.value,
    };
    if (!updatedPost.media) {
      delete updatedPost.media;
    }
    updatePost(`${BASE_API_URL}/api/v1/social/posts/${postId.value}`, updatedPost);
  });
}
