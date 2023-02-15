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
  let userQuestion = userInput.value.toLowerCase();

  let robotResponses = {
    "bonjour": "Bonjour, je suis le robot de l'incubateur !",
    "salut": "Salut, je suis le robot de l'incubateur !",
    "hello": "Hello, je suis le robot de l'incubateur !",
    "incubateur": "Pour déposer un dossier de candidature, rendez-vous sur www.quai-alpha.com/incubateur",
    "startup": "Pour déposer un dossier de candidature, rendez-vous sur www.quai-alpha.com/incubateur",
    "candidature": "Pour déposer un dossier de candidature, rendez-vous sur www.quai-alpha.com/incubateur",
    "aide": "Je suis là pour vous aider ! Comment puis-je vous aider ?"
  };

  let robotResponse = "Désolé, je n'ai pas compris ce que vous voulez dire. Pour plus d'informations, rendez-vous sur www.quai-alpha.com";

  for (let key in robotResponses) {
    if (userQuestion.indexOf(key) !== -1) {
      robotResponse = robotResponses[key];
      break;
    }
  }

  // Correction de faute simple
  for (let key in robotResponses) {
    let levenshteinDistance = calculateLevenshteinDistance(userQuestion, key);
    if (levenshteinDistance <= 2) {
      robotResponse = robotResponses[key];
      break;
    }
  }

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

      // Réinitialiser la propriété de zoom de la fenêtre à 1 après avoir envoyé le message
      document.body.style.zoom = 1;
    }
  }, 50);

  userInput.value = "";
});

userInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

//Fonction de calcul de distance de Levenshtein
function calculateLevenshteinDistance(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  let matrix = [];

  // initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
};
