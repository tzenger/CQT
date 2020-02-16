let socket = io.connect('localhost:3333');
let root;
let currNode;
let currNodeParent;
let currPath = null;
let checkingObject;
let checkingSubmit;
let questionNum;

let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let submitButton = document.getElementById("submitButton");
let inputField = document.getElementById("inputField");
let restartButton = document.getElementById("restartButton");

yesButton.style.display = "block";
noButton.style.display = "block";
submitButton.style.display = "none";
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

function updateQuestion(q){ //Updates displayed question
  document.getElementById("topText").innerHTML = "Q" + questionNum + ". " + q;
}
//startGame()
function startGame(){
  currPath = null;
  yesButton.style.display = "block";
  noButton.style.display = "block";
  submitButton.style.display = "none";
  restartButton.style.display = "none";
  inputField.style.display = "none";
  questionNum = 1;
  checkingObject = true;
  checkingSubmit = true;

  //let no = new QuestionNode("Is it blue?", null, null, "Blueberry");
  //let yes = new QuestionNode("Does it have a peel?", null, null, "Apple");
  //root = new QuestionNode("Is it red?", yes, no, "Strawberry");
  currNode = root;
  document.getElementById("topText").innerHTML = "Q" + questionNum + ". " + currNode.question;
}

//CheckingObject = true means were answering the yes or no of the  QUESTION
//CheckingObject = false means were answering the yes or no of the Is it THIS OBJECT

function checkYes() {
  console.log("Chekcing Object? " + checkingObject)
  console.log("CurrPath? " + currPath)
  if(checkingObject) //Answering the QUESTION Yes
  {
    console.log(currNode);
    document.getElementById("topText").innerHTML = "Is it a " + currNode.answer + "?"; //Prompts the Object
    currPath = true;
    checkingObject = false; //Prepares switch to make it refer to the OBJECT
  }
  else { //Answering the OBJECT Yes
      document.getElementById("topText").innerHTML = "I was right! It is a " + currNode.answer + "!";
      restartButton.style.display = "block";
      yesButton.style.display = "none";
      noButton.style.display = "none";
    }
  }


function checkNo() {
  console.log("Chekcing Object? " + checkingObject)
  console.log("CurrPath " + currPath)

if(checkingObject) { //Answering the QUESTION No
  //if(currPath) { //If current path is "Yes"
    if(currNode.noNode != null)
    {
      questionNum++;
      currNodeParent = currNode;
      currNode = currNode.noNode;
      updateQuestion(currNode.question);
      currPath = false;
      checkingObject = true;
    }
    else {
      currNodeParent = currNode;
      currNode = currNode.noNode;
      askToAdd(currNode)
      currPath = false;
      checkingObject = true;
    }
  }
  else { //Answering the OBJECT No
    if(currNode.yesNode != null)
    {
      questionNum++;
      currNodeParent = currNode;
      currNode = currNode.yesNode;
      updateQuestion(currNode.question);
      currPath = true;
      checkingObject = true;
    }
    else {
      currNodeParent = currNode;
      currNode = currNode.yesNode;
      askToAdd(currNode)
      currPath = true;
      checkingObject = true;
    }
  }
}

function askToAdd(questionNode) { //Adds a question when path results in null
  yesButton.style.display = "none";
  noButton.style.display = "none";
  submitButton.style.display = "block";
  inputField.style.display = "block";
  document.getElementById("topText").innerHTML = "You found a new path! What were you thinking of?";
}

function submit(){
  if(checkingSubmit) { //Answer submit
    let x = document.getElementById("inputField").value;
    newParentNode = currNode;

      currNode = new QuestionNode("", null, null, x);
    document.getElementById("topText").innerHTML = "What is a question that differentiates this?";
    document.getElementById('inputField').value = ""; //Clears Text Box
    checkingSubmit = false;
  }
  else { //Question Submit
    let x = document.getElementById("inputField").value;
    currNode.question = x;
    if(currPath) {
      currNodeParent.yesNode = currNode;
    }
    else {
      currNodeParent.noNode = currNode;
    }
    updateNode(root);
    submitButton.style.display = "none";
    document.getElementById('inputField').value = ""; //Clears Text Box
    checkingSubmit = true;
    startGame();
  }
}
