// Template for posts
export function postTemp(data) {
  const { author, body, comments, created, media, title, updated, id } = data;

  // Top
  // Create top
  const authorName = document.createElement("h2");
  const topContainer = document.createElement("div");
  const topText = document.createElement("div");
  const timeAndDate = document.createElement("span");
  const profilePictureContainer = document.createElement("div");
  const avatar = document.createElement("img");

  // Style top
  authorName.classList.add("m-0", "mt-2", "fw-semibold", "fs-5");
  profilePictureContainer.classList.add("col-auto");
  avatar.classList.add("rounded-circle", "img-fluid", "thumbnail");
  topContainer.classList.add("row");
  topText.classList.add("col-auto");
  timeAndDate.classList.add("text-muted", "fst-italic", "mt-0");

  const timeCreated = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
  const timeUpdated = new Date(updated).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
  timeAndDate.textContent = timeCreated;
  
  if (created !== updated) {
    timeAndDate.textContent = `${timeUpdated} (Updated)`;
  }

  if (author.avatar !== "") {
    avatar.src = data.author.avatar;
  } else {
    avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  authorName.textContent = author.name;

  profilePictureContainer.append(avatar);
  topText.append(authorName, timeAndDate);
  topContainer.append(profilePictureContainer, topText);

  // Body
  // Create body
  const contentContainer = document.createElement("div");
  const titleContainer = document.createElement("a");
  const bodyContainer = document.createElement("a");
  const mediaContainer = document.createElement("img");

  // Style body
  bodyContainer.classList.add("pb-2", "text-decoration-none", "fw-light")
  titleContainer.classList.add("mt-2","fs-2", "fw-bolder")
  contentContainer.classList.add("row");
  mediaContainer.classList.add("mb-2")

  titleContainer.href = `post-by-id.html?id=${id}`;
  titleContainer.textContent = title;
  bodyContainer.href = `post-by-id.html?id=${id}`;
  bodyContainer.textContent = body;
  mediaContainer.src = media;

  contentContainer.append(titleContainer, bodyContainer, mediaContainer);

  // Bottom
  // Create bottom
  const bottomContainer = document.createElement("div");
  const commentCounter = document.createElement("a");

  // Style bottom
  commentCounter.classList.add("fw-lighter", "text-decoration-none", "text-muted")
  commentCounter.textContent = `Number of comments (${comments.length})`;
  commentCounter.href = `post-by-id.html?id=${id}`;

  bottomContainer.append(commentCounter);

  // Full post
  // Create full post
  const fullPost = document.createElement("div");
  const postContent = document.createElement("div");

  // Style full post
  fullPost.classList.add("card", "mb-5");
  postContent.classList.add("card-body");

  postContent.append(topContainer, contentContainer, bottomContainer);
  fullPost.append(postContent);

  // Display full post
  return fullPost;
}
