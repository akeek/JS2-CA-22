import { BASE_API_URL } from "../index.mjs";
import { commentPost } from "../api/posts/comment.mjs";

// Template for a single post when fetched by ID
export function idPostTemp(data) {
  const { author, body, comments, created, media, title} = data;

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
  authorName.classList.add("mb-0", "mt-0", "fw-bolder");
  timeAndDate.classList.add("text-muted", "fst-italic", "mt-0");
  profilePictureContainer.classList.add("col-auto");
  avatar.classList.add("rounded-circle","img-fluid", "thumbnail");

  const timeCreated = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });

  authorName.textContent = author.name;
  timeAndDate.textContent = timeCreated;

  if (author.avatar !== "") {
    avatar.src = data.author.avatar;
  } else {
    avatar.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  profilePictureContainer.append(avatar);
  topText.append(authorName, timeAndDate);
  topContainer.append(profilePictureContainer, topText);

  // Body
  // Create body
  const contentContainer = document.createElement("div");
  const titleContainer = document.createElement("h3");
  const bodyContainer = document.createElement("span");
  const mediaContainer = document.createElement("img");

  // Style body
  mediaContainer.classList.add("pb-3")
  bodyContainer.classList.add("pb-2")
  titleContainer.classList.add("mt-2", "fw-bolder")
  contentContainer.classList.add("row");

  titleContainer.textContent = title;
  bodyContainer.textContent = body;
  mediaContainer.src = media;

  contentContainer.append(titleContainer, bodyContainer, mediaContainer);

  // Comments
  // Form for writing comments
  const commentContainer = document.createElement("div");
  const commentForm = document.createElement("form");

  commentForm.innerHTML = `<label for="comment-body" class="form-label visually-hidden">Comment</label>
  <textarea class="form-control border-1" id="comment-body" name="comment-body" rows="2" placeholder="Comment here" required></textarea>
<div class="d-flex mt-3">
<button type="submit" class="btn btn-primary m-auto">Post comment</button>
</div>`;

  commentContainer.append(commentForm);

  // Display comments
  const commentsContainer = document.createElement("div");
  const commentsTitle = document.createElement("p");
  const commentInfo = document.createElement("div");

  comments.forEach((comment) => {
    const { owner, created, body } = comment;

    const commentSection = document.createElement("div");
    const commentTop = document.createElement("div");
    const commentName = document.createElement("p");
    const commentText = document.createElement("p");
    const commentTime = document.createElement("p");

    commentText.classList.add("mb-3")
    commentTop.classList.add("d-flex", "gap-2");
    commentName.classList.add("m-0", "fw-bolder");
    commentTime.classList.add( "fst-italic", "text-muted", "mb-0");

    const timeCreated = new Date(created).toLocaleString("en-GB", { timeStyle: "short", dateStyle: "short" });
    commentTime.textContent = timeCreated;

    commentName.textContent = owner;
    commentText.textContent = body;

    commentTop.append(commentName, commentTime);
    commentSection.append(commentTop, commentText);

    commentInfo.append(commentSection);
  });

  commentsContainer.append(commentsTitle, commentContainer, commentInfo);

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userComment = document.getElementById("comment-body");
    const commentInput = {
      body: userComment.value,
      replyToId: 0,
    };
    if (commentInput.replyToId === 0) {
      delete commentInput.replyToId;
    }
    console.log(userComment.value);
    commentPost(`${BASE_API_URL}/api/v1/social/posts/${data.id}/comment`, commentInput);
  });

  // Card
  // Create full post
  const fullPost = document.createElement("div");
  const postContent = document.createElement("div");
  
  // Style full post
  fullPost.classList.add("card", "m-5");
  postContent.classList.add("card-body");

  postContent.append(topContainer, contentContainer, commentsContainer);
  fullPost.append(postContent);

  // Display full post
  return fullPost;
}
