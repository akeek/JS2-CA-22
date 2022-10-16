import { postTemp } from "../../templates/post.mjs";

export function search(posts) {
  const input = document.getElementById("search");
  const form = document.getElementById("search-form");
  const postCollection = [...posts];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = input.value;
    const filtered = postCollection.filter((post) => {
      const {
        author: { name },
        title,
        body,
      } = post;

      if (
        name.toLowerCase().includes(search.toLowerCase()) ||
        title.toLowerCase().includes(search.toLowerCase()) ||
        body.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      }
    });

    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    filtered.forEach((post) => {
      feed.append(postTemp(post));
    });
  });
}
