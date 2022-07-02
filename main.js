let cards = [];
let card = [];
let order;
let pair;
let img;
let flipped = 0;
let card1, card2;
let lives = 20;
let timeRun = true;
let Interval;
let milliseconds = 0;
let seconds = 0;
const pairs = [];

for (let i = 0; i < 24; i++) pairs.push(i);

function Shuffle(v) {
  order = 1;
  v.sort(function(a,b) {return 0.5 - Math.random()});
  cards = document.querySelectorAll('.card');
  for (let i = 0; i < 24; i += 2) {
    cards[v[i]].setAttribute('pair', order);
    cards[v[i+1]].setAttribute('pair', order);
    order ++;
  }
}


window.onload = () => {
  Shuffle(pairs);
  for (const x of cards) x.onclick = mainAct;
  const again = document.querySelectorAll('.again');
  for (const x of again) x.onclick = Reset;
}


function mainAct() {
  pair = 'pair' + this.getAttribute('pair');
  flip(this);
  card.push(this);
  if (flipped == 0) {
    card1 = this.getAttribute('pair');
    this.onclick = null;
    flipped = 1;
  } else {
    card2 = this.getAttribute('pair');
    this.onclick = null;
    Check();
    flipped = 0;
  }
  
  if (timeRun) {
    Interval = setInterval(Time, 10);
    timeRun = false;
  }
}

function flip(y) {
  y.className = 'flip';
  img = document.createElement('img');
  img.src = pair + '.jpg';
  img.alt = 'error';
  y.appendChild(img);
} 


function Check() {
  if (card1 == card2) {
    for (const x of card) setTimeout(function() {x.className = 'correct'}, 600)
    checkWin();
  } else {
    lives --;
    checkLose();
    for (const x of card) {
      x.onclick = mainAct;
      setTimeout(function(){
        x.className = 'card';
        x.innerText = '';
      }, 600);
    }
    document.querySelector('.lives span').innerText = lives;
  }
  card1 = null;
  card2 = null;
  card = [];
}


function Reset() {
  const unflip = document.querySelectorAll('.container div');
    for (const y of unflip) y.className = 'card';
    Shuffle(pairs);
    for (const t of cards) {
      t.onclick = mainAct;
      t.innerText = '';
    }
    seconds = 0;
    milliseconds = 0;
    timeRun = true;
    lives = 20;
    clearInterval(Interval);
    document.querySelector('.milliseconds').innerText = '00';
    document.querySelector('.seconds').innerText = '00';
    document.querySelector('.lives span').innerText = 20;
    try {
    document.querySelector('.over').className = 'end';
    document.querySelector('.status').className = 'kq';
    } catch (err) {}
}

function Time() {
  milliseconds ++;
  if (milliseconds == 100) {
    seconds ++;
    milliseconds = 0;
  }
  if (milliseconds.toString().length == 1) {
    document.querySelector('.milliseconds').innerText = '0' + milliseconds;
  } else {
    document.querySelector('.milliseconds').innerText = milliseconds;
  }
  if (seconds.toString().length == 1) {
    document.querySelector('.seconds').innerText = '0' + seconds;
  } else {
    document.querySelector('.seconds').innerText = seconds;
  }
}


function checkWin() {
  if (!document.querySelector('.card')) {
    document.querySelector('.end').className = 'over';
    document.querySelector('.kq').className = 'status';
    clearInterval(Interval);
    document.querySelector('.time1').innerText = seconds + ' : ' + milliseconds;
    document.querySelector('.lives1').innerText = lives;
  }
}

function checkLose() {
  if (lives <= 0) {
    clearInterval(Interval);
    document.querySelector('.end').className = 'over';
    document.querySelectorAll('.kq')[1].className = 'status';
  }
}
