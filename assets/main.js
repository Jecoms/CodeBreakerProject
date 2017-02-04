let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (!answer.value) { // && (!attempt.value && attempt.value !== 0)
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    }

    attempt.value++;

    if (getResults(input.value)) {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (attempt.value > 9) {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }
}

//implement new functions here
function setHiddenFields() {
  answer.value = ("000" + Math.floor(Math.random() * 9999)).slice(-4);
  attempt.value = 0;

  //console.log('Setting answer and attempt.');
}

function setMessage(newMessage) {
  message.innerHTML = newMessage;
}

function validateInput(input) {
  if (input && input.match(/^[0-9]{4}$/)) {
    return true;
  } else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(input) {
  let results = document.getElementById('results');
  let correctNumbers = [];

  let resultHTML = `<div class="row"><span class="col-md-6">${input}</span><div class="col-md-6">`;

  input.split('').forEach((char, i) => {
    resultHTML += getResultIcon(char, i, correctNumbers);
  });

  resultHTML += '</div></div>';

  results.innerHTML += resultHTML;

  return correctNumbers.length === 4;
}

function getResultIcon(char, i, correctNumbers) {
  console.log(`Char: ${char} Index: ${i}`);
  if (char === answer.value.charAt(i)) {
    correctNumbers.push(1);
    return '<span class="glyphicon glyphicon-ok"></span>';
  } else if (!!~answer.value.indexOf(char)) {
    return '<span class="glyphicon glyphicon-transfer"></span>';
  } else {
    return '<span class="glyphicon glyphicon-remove"></span>';
  }
}

function showAnswer(playerDidWin) {
  let code = document.getElementById('code');

  code.innerHTML = answer.value;

  code.className += (playerDidWin)
    ? ' success'
    : ' failure';
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
