//global variables

let level, answer, score, username, thisTime, bestTimed, first = true, averageTime = 0, timesPlayed = 0, totalTime = 0, silly = "asdf";
const levelArr = document.getElementsByName("level");
const scoreArr = [];

let currentDate = new Date();
let month = currentDate.getMonth();
let day = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();



if(month == 0){
    month = "January";
} else if(month == 1){
    month = "February";
} else if(month == 2){
    month = "March";
} else if(month == 3){
    month = "April";
} else if(month == 4){
    month = "May";
} else if(month == 5){
    month = "June";
} else if(month == 6){
    month = "July";
} else if(month == 7){
    month = "August";
} else if(month == 8){
    month = "September";
} else if(month == 9){
    month = "October";
} else if(month == 10){
    month = "November";
} else if(month == 11){
    month = "December";
}

let dateSuffix;

if(day == 1 || day == 21 || day == 31){
    dateSuffix = "st";
} else if(day == 2 || day == 22){
    dateSuffix = "nd";
} else if(day == 3 || day == 23){
    dateSuffix = "rd";
} else if(day > 3 && day < 21 || day > 23 && day < 31){
    dateSuffix = "th";
}

date.textContent = month + " " + day + dateSuffix + ", " + hours + ":" + minutes;

nameInput.placeholder = "Enter a name";
nameSubmit.addEventListener("click",setName);
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", giveUpFunc);

function setName(){
    username = String(nameInput.value);
    if(username == ""){
        nameCreation.textContent = "Enter a valid name!";
    } else{
        nameInput.disabled = true;
        nameSubmit.disabled = true;
        playBtn.disabled = false;
    }
}

function play(){
    resetStopwatch();
    startStopwatch();
    temp.textContent = "";
    silly = "asdf";
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUp.disabled = false;
    guess.disabled = false;

    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    
    msg.textContent = username + ", guess a number from 1 to " + level;
    answer = Math.floor(Math.random()*level) + 1;
    guess.placeholder = "Enter a guess";
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = username + ", enter a valid number from 1 to " + level;
        return;
    }
    
    if(silly == userGuess){
        msg.textContent = username + ", don't guess the same number twice!";
        return;
    }
    silly = userGuess;
    score++;

    if(userGuess > answer){
        msg.textContent = username + ", that guess is too high...";
    } else if(userGuess < answer){
        msg.textContent = username + ", that guess is too low...";
    } else{
        stopStopwatch();
        thisTime = elapsedTime;
        if(first == true){
            bestTimed = thisTime;
            first = false;
        } else if(thisTime < bestTimed){
            bestTimed = thisTime;
        }

        timesPlayed++;
        totalTime += thisTime;
        averageTime = totalTime/timesPlayed;

        if(score > 1){
            msg.textContent = "You got it, " + username + "! it took you " + score + " tries. Press play to play again";
        } else{
            msg.textContent = "You got it, " + username + "! it took you " + score + " try! Press play to play again";
            confetti({
                particleCount: 150,
                spread: 90,
                startVelocity: 40,
                gravity: 1,
                decay: 0.87,
                colors: ['#fdf064ff', '#29cdff', '#ff4444ff', '#f171ffff', '#fdff6a']
            });
        }
        
        if(level == 100){
            if(score == 1){
                temp.textContent = "That was really lucky!";
            } else if(score < 5){
                temp.textContent = "Good job!";
            } else if(score < 10){
                temp.textContent = "Fair score!";
            } else if(score < 20){
                temp.textContent = "Okay score...";
            } else if(score < 40){
                temp.textContent = "Bad score.....";
            } else{
                temp.textContent = username + ", you have a skill issue."
            }
        }

        if(level == 10){
            if(score == 1){
                temp.textContent = "That was really lucky!";
            } else if(score < 3){
                temp.textContent = "Good job!";
            } else if(score < 4){
                temp.textContent = "Fair score!";
            } else if(score < 5){
                temp.textContent = "Okay score...";
            } else if(score < 6){
                temp.textContent = "Bad score.....";
            } else{
                temp.textContent = username + ", you have a skill issue."
            }
        }
        if(level == 3){
            if(score == 1){
                temp.textContent = "Nice!";
            } else if(score < 4){
                temp.textContent = "Oof...";
            } else {
                temp.textContent = "How are you this bad?";
            }
        }

        reset();
        updateScore();
    }


    if(level == 100){
        if(Math.abs(answer-userGuess) > 50){
            temp.textContent = "You're cold.";
        } else if(Math.abs(answer-userGuess) > 25){
            temp.textContent = "You're lukewarm...";
        } else if(Math.abs(answer-userGuess) > 10){
            temp.textContent = "You're warm!";
        } else if(Math.abs(answer-userGuess) > 5){
            temp.textContent = "You're hot!";
        } else if(Math.abs(answer-userGuess) > 0){
            temp.textContent = "You're very hot!";
        }
    }

    if(level == 10){
        if(Math.abs(answer-userGuess) > 5){
            temp.textContent = "You're cold.";
        } else if(Math.abs(answer-userGuess) > 2){
            temp.textContent = "You're warm!";
        } else if(Math.abs(answer-userGuess) > 0){
            temp.textContent = "You're hot!";
        }
    }

}

function giveUpFunc(){
    stopStopwatch();
    thisTime = level*3000;
    if(first == true){
        bestTimed = thisTime;
        first = false;
    } else if(thisTime < bestTimed){
        bestTimed = thisTime;
    }

    timesPlayed++;
    totalTime += thisTime;
    averageTime = totalTime/timesPlayed;
    score = level;
    msg.textContent = "You gave up, " + username + "... Your score is " + score + ". Press play to play again";
    reset();
    updateScore();
}

function reset(){

    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    giveUp.disabled = true;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
    
}

function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);

    let lb = document.getElementsByName("leaderboard");

    wins.textContent = "Total wins: " + scoreArr.length;

    let sum = 0;
    for(let i=0; i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }

    let avg = sum/scoreArr.length;

    avgScore.textContent = "Average Score: " + avg.toFixed(2);
    bestTime.textContent = "Fastest Time: " + formatTime(bestTimed);
    avgTime.textContent = "Average Time: " + formatTime(averageTime);


}

let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  ms %= 60000;
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10); // Displaying centiseconds

  return (
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(2, '0')
  );
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds for smoother display
    isRunning = true;
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "Time taken:" + "00:00:00";
}