let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");
let sendButton = document.getElementById("send-button");

// Ajouter un nouveau message à la boîte de chat
function addMessage(message, isRobotMessage) {
  let newMessage = document.createElement("div");
  newMessage.innerHTML = message;
  if (isRobotMessage) {
    newMessage.classList.add("robot-message");
  } else {
    newMessage.classList.add("user-message");
  }
  chatBox.appendChild(newMessage);

  // Mettre à jour la position de défilement de la boîte de chat
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", function() {
  let robotResponses = [
    "Bonjour, je suis le robot de l'incubateur, rendez-vous sur www.quai-alpha.com",
    "Mmmh, voyons voir... Pour cette question, je vous conseille de déposer directement un dossier de candidature sur www.quai-alpha.com/incubateur",
  ];

  let robotResponse = robotResponses[Math.floor(Math.random() * robotResponses.length)];

  let userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.innerHTML = '<div class="user-icon-container" style="background-color: #5C6BC0;">💬</div>' + userInput.value;
  chatBox.appendChild(userMessage);

  let robotMessage = document.createElement("div");
  robotMessage.classList.add("robot-message");
  chatBox.appendChild(robotMessage);

  let i = 0;
  let robotIconDisplayed = false;
  let typingInterval = setInterval(function() {
    if (i < robotResponse.length) {
      if (!robotIconDisplayed) {
        robotMessage.innerHTML = '<div class="robot-icon-container" style="background-color: #00897B;">🤖</div>';
        robotIconDisplayed = true;
      }
      robotMessage.innerHTML += robotResponse.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);

  userInput.value = "";
});

userInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendButton.click();
  }
});


