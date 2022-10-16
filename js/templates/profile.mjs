// Template for profile

export function profileTemp(data) {
  const { name, _count, avatar } = data;

  // Create profile
  const headline = document.getElementById("author-name")
  const fullProfile = document.createElement("div");
  const countContainer = document.createElement("div");
  const counter = document.createElement("p");
  const profilePicture = document.createElement("img");

  // Style profile
  headline.classList.add("h1", "text-center", "mb-3");
  fullProfile.classList.add("card-body", "align-items-center", "d-flex", "flex-column-reverse");
  profilePicture.classList.add("mt-3", "img-fluid", "medium");
  countContainer.classList.add("d-flex", "text-muted", "mt-3", "mb-0", "fw-lighter");

  // HTML Profile
  counter.textContent = `Number of posts: ${_count.posts}`;
  headline.textContent = name

  if (avatar !== "") {
    profilePicture.src = avatar;
  } else {
    profilePicture.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  countContainer.append(counter);
  fullProfile.append(countContainer, profilePicture);

  // Display full profile
  return fullProfile;
}
