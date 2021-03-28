let colors = ["yellow", "red", "blue", "violet", "green"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll(".score");
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector(".total-shadow");
let bgMusic = document.querySelector(".bg-music");
let speed = 36;
let startBtn = document.querySelector(".start-game-button");
let diff = document.getElementById("difficulty");
let crazy = 800;

function createBalloon() {
	let div = document.createElement("div");
	let rand = Math.floor(Math.random() * colors.length);
	div.className = "balloon balloon-" + colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = rand + "px";
	div.dataset.number = currentBalloon;
	currentBalloon++;
	body.appendChild(div);
	animateBallon(div);	
}

function animateBallon(elem) {
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(frame, speed - Math.floor(num / 10) + random);
	function frame() {
		if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
			clearInterval(interval);
			gameOver = true;
		}
		else {
			pos++;
			elem.style.top = windowHeight - pos + "px";
		}
	}
}

function deleteBalloon(elem) {
	elem.remove();
}
function playBallSound() {
	let audio = document.createElement("audio");
	audio.src = "sounds/pop.mp3";
	audio.play();
}

function updateScore() {
	for(let i = 0; i < scores.length; i++) {
		scores[i].textContent = num;
	}
}
function startGame() {
	restartGame();
	if(diff.value === "easy") {
		speed = 36;
	}
	if(diff.value === "medium") {
		speed = 24;
	}
	if(diff.value === "hard") {
		speed = 12;
	}
	if(diff.value === "crazy") {
		crazy = 400;
		speed = 12;
	}
	let timeout = 0;
	let loop = setInterval(function() {
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num!== total) {
			createBalloon();
		}
		else if(num == total) {
			clearInterval(loop);
			totalShadow.style.display = "flex";
			totalShadow.querySelector(".win").style.display = "block";
		}
		else {
			clearInterval(loop);
			totalShadow.style.display = "flex";
			totalShadow.querySelector(".loose").style.display = "block";	
		}
		
	}, timeout + crazy);
}

function restartGame() {
	let forRemoving = document.querySelectorAll(".balloon");
	for(let i = 0; i < forRemoving.length; i++) {
		forRemoving[i].remove();
	}
	gameOver = false;
	num = 0;
	updateScore();
	bgMusic.muted = false;
}

function hidePopUp() {
	totalShadow.style.display = "none";
	totalShadow.querySelector(".win").style.display = "none";
	totalShadow.querySelector(".loose").style.display = "none";
}

document.addEventListener("click", function(event) {
	if(event.target.classList.contains("balloon")) {
		deleteBalloon(event.target);
		num++;
		updateScore();
		playBallSound();
	}
})

document.querySelectorAll(".restart").forEach(item => {
  item.addEventListener('click', event => {
    hidePopUp();
	startGame();
  })
})

document.querySelectorAll(".cancel").forEach(item => {
  item.addEventListener('click', event => {
    hidePopUp();
	restartGame();
	document.querySelector(".start-game-window").style.display = "flex";
	bgMusic.muted = true;	
  })
})

startBtn.addEventListener("click", function() {
	startGame();
	bgMusic.play();
	document.querySelector(".start-game-window").style.display = "none";
})
