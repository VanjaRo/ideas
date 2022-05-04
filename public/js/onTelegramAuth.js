function onTelegramAuth(user) {
  fetch("/auth/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
    }),
  })
    .then(
      // reload the page
      (res) => window.location.reload()
    )
    .catch((err) => console.log(err));
}
