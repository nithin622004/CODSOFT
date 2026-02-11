function login() {
  const user = document.getElementById("username");
  if (!user) return;

  if (user.value === "") {
    alert("Please enter name");
    return;
  }

  localStorage.setItem("user", user.value);
  document.getElementById("menu").style.display = "block";
}

let quiz = JSON.parse(localStorage.getItem("quiz")) || [];

function saveQuestion() {
  if (!document.getElementById("question")) return;

  let q = document.getElementById("question").value;
  let o1 = document.getElementById("opt1").value;
  let o2 = document.getElementById("opt2").value;
  let o3 = document.getElementById("opt3").value;
  let o4 = document.getElementById("opt4").value;
  let ans = document.getElementById("answer").value;

  if (!q || !o1 || !o2 || !o3 || !o4 || !ans) {
    alert("Fill all fields");
    return;
  }

  quiz.push({
    question: q,
    options: [o1, o2, o3, o4],
    answer: ans
  });

  localStorage.setItem("quiz", JSON.stringify(quiz));
  alert("Question saved!");

  document.getElementById("question").value = "";
  document.getElementById("opt1").value = "";
  document.getElementById("opt2").value = "";
  document.getElementById("opt3").value = "";
  document.getElementById("opt4").value = "";
  document.getElementById("answer").value = "";
}

if (document.getElementById("quizBox")) {

  let questions = JSON.parse(localStorage.getItem("quiz")) || [];
  let index = 0;
  let score = 0;

  if (questions.length === 0) {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("noQuiz").style.display = "block";
  } else {
    loadQuestion();
  }

  function loadQuestion() {
    document.getElementById("qno").innerText =
      "Question " + (index + 1);

    document.getElementById("question").innerText =
      questions[index].question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questions[index].options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;

      btn.onclick = function () {
        if (i + 1 == questions[index].answer) {
          score++;
        }

        index++;

        if (index < questions.length) {
          loadQuestion();
        } else {
          localStorage.setItem("score", score);
          window.location.href = "result.html";
        }
      };

      optionsDiv.appendChild(btn);
    });
  }
}

function deleteQuiz() {
  localStorage.removeItem("quiz");
  localStorage.removeItem("score");
  alert("Quiz deleted successfully");
  window.location.href = "index.html";
}
