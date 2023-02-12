document.getElementById("send-button").addEventListener("click", function() {
  let userInput = document.getElementById("user-input").value;
  let robotResponse = "Bonjour, je suis le robot de l'incubateur, rendez-vous sur quai-alpha.com";
  let chatBox = document.getElementById("chat-box");

  let userMessage = document.createElement("div");
  userMessage.classList.add("user-message");
  userMessage.innerHTML = '<div class="user-icon-container" style="background-color: #5C6BC0;">💬</div>' + userInput;
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

  document.getElementById("user-input").value = "";
});

document.getElementById("user-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    document.getElementById("send-button").click();
  }
});
