import { search } from "./search.mjs";
import { sort } from "./sort.mjs";
import { postTemp } from "../../templates/post.mjs";

export async function getPosts(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const json = await response.json();
    displayPostFeed(json);
    search(json);
    sort(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

function displayPostFeed(posts) {
  const feed = document.getElementById("feed");
  posts.forEach((post) => {
    feed.append(postTemp(post));
  });
}
