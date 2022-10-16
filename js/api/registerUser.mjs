import { BASE_API_URL } from "../index.mjs";

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerForm = document.getElementById("register-form");
const errorMessageContainer = document.getElementById("error-message");

async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    if ((json.statusCode === 400)) {
      error();
    } else {
      window.location.href = "login.html";
    }
    registerForm.reset();
    return json;
  } catch (error) {
    console.log(error);
    error();
  }
}

function error() {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Ups! Error. Please try again!";
  errorMessageContainer.appendChild(errorMessage);
}

export function submitUserValues() {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userValue = {
      name: username.value,
      email: email.value,
      password: password.value,
    }
    registerUser(`${BASE_API_URL}/api/v1/social/auth/register`, userValue);
  });
}
