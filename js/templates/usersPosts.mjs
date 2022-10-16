// Template for the users posts on the profilepage

export function usersPosts(data) {
  const { created, title, body, media, id, owner} = data;

  // Dropdown/more-button
  const more = document.createElement("div");
  more.innerHTML = `<button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <svg width="30" height="30" viewBox="0 0 48 48" fill="#4267B2" fill-opacity="1" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
    <path d="M40 28L24 40L8 28" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 10H40" stroke="#333" stroke-width="1" stroke-linecap="round"/>
    <path d="M8 18H40" stroke="#333" stroke-width="1" stroke-linecap="round"/>
    </svg>
    </button>
  <ul class="dropdown-menu">
  <li><button class="dropdown-item edit-btn" id="${id}" data-bs-toggle="modal" data-bs-target="#modal" >Edit post</button></li>
  <li><Button class="dropdown-item delete-btn" id="${id}">Delete post</button></li>
  </ul>`;

  // Top
  // Create top
  const topContainer = document.createElement("div");
  const topText = document.createElement("div");
  const authorName = document.createElement("h2");
  const timeAndDate = document.createElement("span");
  const profilePictureContainer = document.createElement("div");
  const avatar = document.createElement("img");

  // Style top
  topContainer.classList.add("row");
  topText.classList.add("col-auto");
  timeAndDate.classList.add("text-muted", "fst-italic", "mt-0");
  authorName.classList.add("m-0", "mt-2", "fw-semibold", "fs-5");
  profilePictureContainer.classList.add("col-auto");
  avatar.classList.add("rounded-circle", "img-fluid", "thumbnail");
  more.classList.add("dropdown", "col-auto", "ms-auto");

  const timeCreated = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
  timeAndDate.textContent = timeCreated;

  const avatarStored = localStorage.getItem("avatar");
  if (avatarStored !== "") {
    avatar.src = avatarStored;
  } else {
    avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  authorName.textContent = owner;

  profilePictureContainer.append(avatar);
  topText.append(authorName, timeAndDate);
  topContainer.append(profilePictureContainer, topText, more);

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
  

  // Full post
  // Create full post
  const fullPost = document.createElement("div");
  const postContent = document.createElement("div");

  // Style full post
  fullPost.classList.add("card", "border-0", "mb-4");
  fullPost.id = id;
  postContent.classList.add("card-body");

  postContent.append(topContainer, contentContainer);
  fullPost.append(postContent);

  // Display full post
  return fullPost;
}
