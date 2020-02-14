let socket = io.connect('localhost:3333');
let root;
let currNode;
let currNodeParent;
let currPath = null;
let checkingObject;

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

//Pulls from database
socket.on('node', function(coolNode) {
    root = coolNode;
    startGame();
});

//Pushes to the database
function updateNode(node){
  socket.emit('updateNode', node);
}

function updateQuestion(q){
  document.getElementById("topText").innerHTML = q;
}
//startGame()
function startGame(){
  currPath = null;
  yesButton.style.display = "block";
  noButton.style.display = "block";
  submitButton.style.display = "none";
  qSubmitButton.style.display = "none";
  inputField.style.display = "none";
  checkingObject = true;

  //let no = new QuestionNode("Is it blue?", null, null, "Blueberry");
  //let yes = new QuestionNode("Does it have a peel?", null, null, "Apple");
  //root = new QuestionNode("Is it red?", yes, no, "Strawberry");
  currNode = root;
  document.getElementById("topText").innerHTML = currNode.question;
}

function checkYes() {
  if(checkingObject)
  {
    console.log(currNode);
    document.getElementById("topText").innerHTML = "Is it a " + currNode.answer + "?";
    currPath = true;
    checkingObject = false;
  }
  else{
      document.getElementById("topText").innerHTML = "I was right! It is a " + currNode.answer + "!";
    //else {
    //  currNodeParent = currNode;
    //  currNode = currNode.yesNode;
    //  askToAdd(currNode)
    //  currPath = true;
    //      console.log(currNode);
  //}
    }
  }


function checkNo() {
  checkingObject = true

if(currPath) {
  if(currNode.yesNode != null)
  {
    currNodeParent = currNode;
    currNode = currNode.yesNode;
    updateQuestion(currNode.question);
        console.log(currNode);
  }
  else {
    currNodeParent = currNode;
    currNode = currNode.yesNode;
    askToAdd(currNode)
    currPath = true;
        console.log(currNode);
}
}
  else
  if(currNode.noNode != null)
  {
    currNodeParent = currNode;
    currNode = currNode.noNode;
    updateQuestion(currNode.question);
        console.log(currNode);
  }
  else {
    currNodeParent = currNode;
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
  newParentNode = currNode;
  console.log(newParentNode)
    currNode = new QuestionNode("", null, null, x);
  submitButton.style.display = "none";
  document.getElementById("topText").innerHTML = "What is a question that differentiates this?";
  qSubmitButton.style.display = "block";
}

function qSubmit(){
  let x = document.getElementById("inputField").value;
  currNode.question = x;
  if(currPath) {
    currNodeParent.yesNode = currNode;
  }
  else {
    currNodeParent.noNode = currNode;
    console.log("successfulNoNodeThingy");
  }
  console.log("good");
  console.log(root);
  updateNode(root);
  startGame();
}
