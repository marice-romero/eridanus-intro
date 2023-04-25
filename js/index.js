const todaysDate = new Date();
const thisYear = todaysDate.getFullYear();

const skills = [
  "HTML/CSS",
  "JavaScript",
  "SPSS",
  "Wondershare Filmora",
  "Questionnaire Design",
  "Proficient in Spanish and French",
  "Pub Trivia Champion",
];
const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.textContent = skills[i];
  skill.classList.add(`skill-${[i]}`);
  skillsList.appendChild(skill);
}

const footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.textContent = `\xA9 Marice Romero ${thisYear}`;
footer.appendChild(copyright);

const messageForm = document.getElementById("leave_message");
messageForm.addEventListener("submit", submitMessage);

function submitMessage(event) {
  event.preventDefault();
  var userName = event.target.usersName.value;
  var userEmail = event.target.usersEmail.value;
  var userMessage = event.target.usersMessage.value;
  console.log(userName);
  console.log(userEmail);
  console.log(userMessage);

  const messageSection = document.getElementById("messages");
  const messageHeader = document.createElement("h2");
  messageHeader.textContent = "messages";
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${userEmail}" id="emailLink">${userName}</a> 
    <span id="messageSpan">wrote: ${userMessage}</span> `;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.type = "button";

  editButton.addEventListener("click", () => {
    const editText = document.createElement("textarea");
    editText.id = "editedMessageInput";

    if (editButton.textContent === "Edit") {
      editText.placeholder = userMessage;
      newMessage.insertBefore(editText, editButton);
      editButton.textContent = "Save";
    } else if (editButton.textContent === "Save") {
      const editedInput = document.getElementById("editedMessageInput");
      const editedMessage = editedInput.value;
      console.log(editedMessage);
      userMessage = editedMessage;
      editedInput.remove();
      const ogMessageSpan = newMessage.children[1];
      ogMessageSpan.remove();
      const newMessageSpan = document.createElement("span");
      newMessageSpan.innerHTML = `<span id="messageSpan">wrote: ${editedMessage}</span> `;
      newMessage.insertBefore(newMessageSpan, editButton);
      editButton.textContent = "Edit";
    }
  });
  newMessage.appendChild(editButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.setAttribute("type", "button");
  removeButton.addEventListener("click", () => {
    const entry = removeButton.parentNode;
    entry.remove();
    messageHeader.remove();
  });
  newMessage.appendChild(removeButton);

  if (
    messageSection.childNodes.length > 1 &&
    messageSection.childNodes.length < 4
  ) {
    messageSection.insertBefore(messageHeader, messageList);
  }

  messageList.appendChild(newMessage);

  messageForm.reset();
}

const navBar = document.getElementById("nav-bar");
const fixed = navBar.offsetTop;
const scrollHeader = document.getElementById("scroll-header");

window.onscroll = function () {
  fixPosition();
};
function fixPosition() {
  if (window.pageYOffset > fixed) {
    navBar.classList.add("fixed");
    scrollHeader.classList.remove("top-header-hide");
    scrollHeader.classList.add("top-header-show");
  } else {
    navBar.classList.remove("fixed");
    scrollHeader.classList.remove("top-header-show");
    scrollHeader.classList.add("top-header-hide");
  }
}

/* XMLHTTPRequest version
const gitHubRequest = new XMLHttpRequest();
gitHubRequest.open("GET", "https://api.github.com/users/marice-romero/repos");
gitHubRequest.send();

let repositories = [];
gitHubRequest.addEventListener("load", function () {
  repositories = JSON.parse(this.response);
  console.log(repositories);

  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");

  for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement("li");
    project.innerHTML = `<a href="${repositories[i].html_url}">${repositories[i].name}</a>`;
    projectList.appendChild(project);
  }
}); */

fetch("https://api.github.com/users/marice-romero/repos", { mode: "cors" })
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < response.length; i++) {
      const project = document.createElement("li");
      project.innerHTML = `<a href="${response[i].html_url}">${response[i].name}</a>`;
      project.classList.add(`project-${[i]}`);
      projectList.appendChild(project);
    }
  })
  .catch(function (error) {
    console.error("Error!");
    const errorDisplay = document.createElement("h3");
    errorDisplay.textContent = `The limit does not exist! Github says: ${error.message}`;
    projectSection.appendChild(errorDisplay);
  });
