export async function commentPost(url, data) {
  try {
    const token = localStorage.getItem("accessToken");

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
