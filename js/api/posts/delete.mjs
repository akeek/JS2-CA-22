export async function deletePost(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
