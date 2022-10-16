import { BASE_API_URL } from "../index.mjs";

const passwordValue = document.getElementById("password");
const emailValue = document.getElementById("email");
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

async function userLogIn(url, data) {
  try {
    const postInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postInfo);
    const json = await response.json();
    const accessToken = json.accessToken;
    const username = json.name;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("username", username);

    if (json.statusCode === 400 | json.message === "Invalid email or password") {
      showError();
    } else {
      window.location.href = "profile.html";
    }
    return json;
  } catch (error) {
    console.log(error);
    showError();
  }
}

function showError() {
  errorMessage.innerHTML = `<p>Wrong email or password. Try again.</p>`;
}

export function submitLoginUser() {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginUser = {
      email: emailValue.value,
      password: passwordValue.value,
    };
    userLogIn(`${BASE_API_URL}/api/v1/social/auth/login`, loginUser);
  });
}
