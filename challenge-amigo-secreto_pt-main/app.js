const addButton = document.querySelector(".add");
const sortButton = document.querySelector(".sort");
const resetButton = document.querySelector(".reset");

const nameInput = document.querySelector("#names");
const listElement = document.querySelector(".list");
const errorElement = document.querySelector(".erro");
const resultElement = document.querySelector(".result-list");

let friends = [];

const validateName = (name) => name.trim().length > 2;
const isNameUnique = (name) => !friends.includes(name);
const displayError = (message) => (errorElement.textContent = `ERRO: ${message}`);
const clearInput = () => (nameInput.value = "");
const updateList = () => (listElement.textContent = friends.join(", "));

const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const drawNames = () => {
  if (friends.length < 4) {
    displayError("Mínimo 4 nomes para sortear.");
    return;
  }

  const shuffledFriends = shuffle(friends);
  const results = shuffledFriends.map((friend, index) => {
    const nextIndex = (index + 1) % shuffledFriends.length;
    return `${friend} tirou ${shuffledFriends[nextIndex]}`;
  });

  resultElement.innerHTML = results.map((text) => `<li>${text}</li>`).join("");
};

const addFriend = () => {
  const name = nameInput.value.trim();

  if (!validateName(name)) {
    displayError("Nome inválido (mínimo 3 caracteres).");
    return;
  }

  if (!isNameUnique(name)) {
    displayError(`${name} já está na lista.`);
    return;
  }

  friends.push(name);
  updateList();
  clearInput();
  errorElement.textContent = "";
};

const resetGame = () => {
  friends = [];
  updateList();
  resultElement.innerHTML = "";
  clearInput();
  errorElement.textContent = "";
};

const handleDraw = () => {
  drawNames();
};

addButton.addEventListener("click", addFriend);
sortButton.addEventListener("click", handleDraw);
resetButton.addEventListener("click", resetGame);
nameInput.addEventListener("input", () => (errorElement.textContent = ""));

resetGame();