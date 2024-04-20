const socket = io({
  auth: {
    // for authentication
    token: "123", // your token
  },
});

//Error for connect_error middleware
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
