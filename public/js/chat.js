const socket = io();

let isSocketUser;
let isUserOwner;
let count = 0;
const messageToSend = document.getElementById("textArea");
const showUsers = document.getElementById("users");

socket.on("all-clients", (users) => {
  if (users) {
    showUsers.innerHTML = "";
    const userName = users.find((user) => user.id === socket.id).userName;

    isUserOwner = userName;

    users
      .filter((user) => user.id !== socket.id)
      .forEach((user) => {
        draUser({ user: user.userName });
      });
  }
});

socket.on("add-user", (data) => {
  bringAllMessages(data);
});

socket.on("receive-message", (data) => {
  bringAllMessages(data);
});
const bringAllMessages = (data) => {
  if (data) {
    messages.innerHTML = "";
    data.forEach((message) => {
      drawMessage(message);
    });
  }
};
const sendAMessage = () => {
  const message = messageToSend.value;

  socket.emit("send-message", message);

  messageToSend.value = "";

  count++;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (messageToSend.value != "") {
    sendAMessage();
  }
});

sendMEssageButon.addEventListener("click", () => {
  if (messageToSend.value != "") {
    sendAMessage();
  }
});

const drawMessage = ({ user, message }) => {
  let isUser = isUserOwner === user;

  const msj = ` 
          <div
            class="w-full min-h-[80px] bg-slate-100 translate-x-[${
              isUser ? "33px" : "-33px"
            }] px-5 py-2  ${
    isUser ? "rounded-bl-2xl" : "rounded-br-2xl"
  } rounded-t-2xl flex flex-col gap-2 relative shadow-lg"
                      >
            <div class="h-[90%] pb-1">
            <p class=" ${isUser ? "text-right" : "text-left"} pl-4">
              ${message}
            </p>
            </div>
            <div class="w-[96%]  bottom-2 overflow-hidden ${
              isUser ? "right-4" : ""
            }">
              <div class="h-[2px] bg-slate-300 "></div>
              <p class="${
                isUser ? "text-right pr-3" : "text-left pl-2"
              } text-sm ">${user}</p>
            </div>
          </div>`;

  messages.innerHTML += msj;

  chatContainer.scrollTop += chatContainer.scrollHeight;
};

const draUser = ({ user }) => {
  const msj = `
          <li
            class="text-xl font-bold hover:translate-y-2 animate-all duration-300 rounded-2xl p-2 flex flex-col sm:flex-row gap-4 items-center cursor-pointer bg-slate-200 hover:bg-slate-400 active:bg-slate-500 shadow-lg"
          >
            <img
              class="w-8 h-8"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
            />
            <p>${user}</p>
          </li>
  `;
  showUsers.innerHTML += msj;
};
