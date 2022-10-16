import { idPostTemp } from "../../templates/postId.mjs";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
export const id = params.get("id");

const idContainer = document.getElementById("id-container");

export async function postById(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    showPostById(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

function showPostById(post) {
  document.title = `${post.author.name} - ${post.title}`;
  idContainer.append(idPostTemp(post));
}

