// sockets for voting and updating votes for themes
var socket = io();

// serving "+" button with function
function onPlusClick(id) {
  socket.emit("plus", { id });
}

// serving "-" button with function
function onMinusClick(id) {
  socket.emit("minus", { id });
}

// receive upvote from client
socket.on("plus", function (data) {
  let currentCount = document.getElementById(
    "vote-counter-" + data.id
  ).innerHTML;
  document.getElementById("vote-counter-" + data.id).innerHTML =
    +currentCount + 1;
});

// receive downvote from client
socket.on("minus", function (data) {
  let currentCount = document.getElementById(
    "vote-counter-" + data.id
  ).innerHTML;
  document.getElementById("vote-counter-" + data.id).innerHTML =
    +currentCount - 1;
});
