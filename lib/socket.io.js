import io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.SOCKET_URL
    : "http://localhost:80";

// const URL = "https://turuq-be-test.onrender.com";

export const socket = io(URL, {
  autoConnect: false,
});
