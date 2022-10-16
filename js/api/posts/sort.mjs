import { postTemp } from "../../templates/post.mjs";

export function sort(posts) {
  var sorted = [];
  const postCollection = [...posts];
  const sortContainer = document.getElementById("sort-container");
  const sort = document.getElementById("sort");

  sort.addEventListener("change", () => {
    const feed = document.getElementById("feed");
    if (sort.value === "oldest") {
      sorted = postCollection.sort((a, b) => new Date(a.created) - new Date(b.created));
    } else if (sort.value === "newest") {
      sorted = postCollection.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    feed.innerHTML = "";
    sorted.forEach((post) => {
      feed.append(postTemp(post));
    });
  });
  if (window.location.reload) {
    sortContainer.reset();
  }
}
