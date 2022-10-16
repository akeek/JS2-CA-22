import { BASE_API_URL } from "../../index.mjs";

const body = document.getElementById("post-container");
const title = document.getElementById("title");
const postForm = document.getElementById("post-form");
const media = document.getElementById("media");

async function newPost(url, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    postForm.reset();
    window.location.reload();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export function sendPost() {
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const postValue = {
      title: title.value,
      body: body.value,
      media: media.value,
    };
    if (!postValue.media) {
      delete postValue.media;
    }
    newPost(`${BASE_API_URL}/api/v1/social/posts`, postValue);
  });
}
