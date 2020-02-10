run();

function run() {
  let root = new QuestionNode();
  root.question = "Is it an object?";
  document.getElementById("topText").innerHTML = root.question;

}

function checkYes() {
  if(question.yesNode != null)
  {
    root = root.yesNode()
  }
  else {
    askToAdd(root)
  }
}

function checkNo() {
  if(question.noNode != null)
  {
    root = root.noNode()
  }
  else {
    askToAdd(root)
  }
}

function askToAdd(questionNode) {
  document.getElementById("topText") = "You found a new path! What is a question which would distinguish the thing you're thinking of?";

}
