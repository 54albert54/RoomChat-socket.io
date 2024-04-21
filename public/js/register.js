registerButon.addEventListener("click", () => {
  const username = document.getElementById("username");
  console.log("username", username.value);

  if (username.value === "") {
    alert("Please enter a username");
  } else {
    document.cookie = `username=${username.value}`;
    document.location.href = "/";
  }
});
