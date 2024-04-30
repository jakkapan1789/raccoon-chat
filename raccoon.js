// Create and style the chat button

const chatButton = document.createElement("button");
chatButton.classList.add("chatButton");
chatButton.setAttribute("id", "chatButton");
chatButton.onclick = openChat;
const chatButtonImg = document.createElement("img");
chatButtonImg.src = "bot.png";
chatButton.appendChild(chatButtonImg);

const chatPopup = document.createElement("div");
chatPopup.classList.add("popup");
chatPopup.setAttribute("id", "chatPopup");

const popupHeader = document.createElement("div");
popupHeader.classList.add("popup-header");
const popupTitle = document.createElement("span");
popupTitle.textContent = "Raccoon";

const closeButton = document.createElement("button");
closeButton.classList.add("btn-close");
closeButton.setAttribute("id", "closeButton");
// closeButton.textContent = "x";
closeButton.onclick = closeChat;
popupHeader.appendChild(popupTitle);
popupHeader.appendChild(closeButton);

// Create and style the chat message container
const chatMessages = document.createElement("div");
chatMessages.classList.add("popup-content");
chatMessages.setAttribute("id", "chatMessages");

// Create and style the chat input
const chatInput = document.createElement("div");
chatInput.classList.add("chat-input");
const messageInput = document.createElement("input");
messageInput.classList.add("input");
messageInput.setAttribute("id", "messageInput");
messageInput.setAttribute("type", "text");
messageInput.placeholder = "Type your message...";
messageInput.addEventListener("keydown", handleKeyPress);
const sendButton = document.createElement("button");
sendButton.classList.add("button");
sendButton.setAttribute("id", "sendButton");
sendButton.textContent = "Send";
sendButton.onclick = sendMessage;
chatInput.appendChild(messageInput);
chatInput.appendChild(sendButton);

// Append elements to the chat popup
chatPopup.appendChild(popupHeader);
chatPopup.appendChild(chatMessages);
chatPopup.appendChild(chatInput);

document.body.appendChild(chatButton);
document.body.appendChild(chatPopup);

function openChat() {
  chatPopup.classList.add("show");
  const messageInput = document.getElementById("messageInput");
  messageInput.focus();
}

function closeChat() {
  chatPopup.classList.remove("show");
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

async function search(message) {
  try {
    let data = {
      topic: "",
      message: message,
    };
    const response = await fetch(
      "http://localhost:3000/api/raccoon/bot/searcher",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send data");
    }
    const responseData = await response.json();
    displayMessage(responseData, "bot");
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  if (message !== "") {
    displayMessage(message, "user");
    messageInput.value = "";
    setTimeout(() => {
      search(message);
      //   displayMessage(
      //     "I am just a demo. I cannot respondxdddSorry, I am just a demo. I cannot respond.",
      //     "bot"
      //   );
    }, 1000);
  }
}
initailMessage();
function initailMessage() {
  displayMessage("Hi, What I can do for you today?", "bot");
}

// function displayMessage(message, sender) {
//   const chatMessages = document.getElementById("chatMessages");
//   const messageContainer = document.createElement("div");
//   messageContainer.classList.add("message-container");

//   const profilePicElement = document.createElement("div");
//   profilePicElement.classList.add("profile-pic-small");
//   const profilePic = document.createElement("img");
//   profilePic.src = "bot.png";

//   profilePicElement.appendChild(profilePic);

//   const messageElement = document.createElement("div");
//   messageElement.classList.add("message");
//   messageElement.innerText = message;

//   if (sender === "bot") {
//     messageElement.style.backgroundColor = "#F6F5F2";
//   } else {
//     messageElement.style.float = "right";
//   }
//   messageElement.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";

//   if (sender === "bot") {
//     messageContainer.appendChild(profilePicElement);
//   }
//   messageContainer.appendChild(messageElement);
//   chatMessages.appendChild(messageContainer);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// }

function displayMessage(message, sender) {
  const chatMessages = document.getElementById("chatMessages");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerText = message;

  if (sender === "bot") {
    const profilePicElement = document.createElement("div");
    profilePicElement.classList.add("profile-pic-small");
    const profilePic = document.createElement("img");
    profilePic.src = "bot.png";
    profilePicElement.appendChild(profilePic);
    messageContainer.appendChild(profilePicElement);
    messageElement.style.backgroundColor = "#F6F5F2";
    messageElement.classList.add("message-bot");
  } else {
    messageElement.classList.add("message-user");
  }

  messageElement.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";

  messageContainer.appendChild(messageElement);
  chatMessages.appendChild(messageContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
