let socket = io.connect('localhost:3333');
let root;
let currNode;
let godlyRoot;
let currPath;

let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let submitButton = document.getElementById("submitButton");
let qSubmitButton = document.getElementById("qSubmitButton");
let inputField = document.getElementById("inputField");

yesButton.style.display = "block";
noButton.style.display = "block";
submitButton.style.display = "none";
qSubmitButton.style.display = "none";
inputField.style.display = "none";

/*
socket.on('node', function(coolNode) {
    root = coolNode;
    startGame();
});*/

function updateNode(node){
  socket.emit('updateNode', node);
}

function updateQuestion(q){
  document.getElementById("topText").innerHTML = q;
}

startGame();
function startGame(){
  yesButton.style.display = "block";
  noButton.style.display = "block";
  submitButton.style.display = "none";
  qSubmitButton.style.display = "none";
  inputField.style.display = "none";
  let no = new QuestionNode("Is it blue?", null, null, "blueberry");
  let yes = new QuestionNode("Does it have a peel", null, null, "apple");
  root = new QuestionNode("Is it red?", yes, no, "fruit");
  currNode = root;
  document.getElementById("topText").innerHTML = root.question;
}






function checkYes() {
  if(currNode.yesNode != null)
  {
    currNode = currNode.yesNode;
    updateQuestion(currNode.question);
        console.log(currNode);
  }
  else {
    currNode = currNode.yesNode;
    askToAdd(currNode)
    currPath = true;
        console.log(currNode);
  }
}

function checkNo() {
  if(currNode.noNode != null)
  {
    currNode = currNode.noNode;
    updateQuestion(currNode.question);
        console.log(currNode);
  }
  else {
    currNode = currNode.noNode;
    askToAdd(currNode)
    currPath = false;
        console.log(currNode);
  }
}

function askToAdd(questionNode) {
  yesButton.style.display = "none";
  noButton.style.display = "none";
  submitButton.style.display = "block";
  inputField.style.display = "block";
  document.getElementById("topText").innerHTML = "You found a new path! What were you thinking of?";
}

function submit(){
  let x = document.getElementById("inputField").value;
    currNode = new QuestionNode(x, null, null, "");
  submitButton.style.display = "none";
  document.getElementById("topText").innerHTML = "What is a question that differentiates this?";
  qSubmitButton.style.display = "block";
}

function qSubmit(){
  let x = document.getElementById("inputField").value;
  currNode.question = x;
  console.log(root);
  updateNode(root);
  startGame();
}
