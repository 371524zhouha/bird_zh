var bgm=document.querySelector('.bgm')
var gameover_bgm=document.querySelector('.gameover_bgm')
var up_bgm=document.querySelector('.up_bgm')
bgm.pause();
gameover_bgm.pause();
up_bgm.pause();
var canvas=document.querySelector(".canvas");
// var isGameover=true;
var stop=false;
var isGameover=true;
var speed=0,speedMax=8;
var bird = document.getElementById("flybird");
var DownTimer=null;
var upTimer=null;

var thisScore=document.querySelector('.thisScore');
var historyScore=document.querySelector('.historyScore');
var scoreDiv=document.querySelector('#scroing');
var score=0;
var conduitTimer=null;
var space=100;

function floorText() {
    var t1=bird.offsetTop;
    if(t1>396){
        gameover();
    }
    if(t1<0){
        gameover();
    }
}
function gameover() {
    gameover_bgm.play();
    isGameover = false;
    bgm.pause();
    clearTimer();
    bird.id = 'flybird';
    bird.className = 'birddown'
    bird.style.top = '392px';
    var historyscore = localStorage.getItem('maxScore');
    if (historyscore == null || historyscore < score) {
        localStorage.setItem('maxScore', score);
        historyscore = score
    }
    historyScore.innerHTML = historyscore;
    thisScore.innerHTML = score;
    document.querySelector('.gameover').style.display = 'block';

}
function down() {
    if (isGameover) {
        speed += 1;
        bird.id = 'flybird_down'
        up_bgm.pause();
        if (speed >= speedMax) {
            speed = speedMax;
        }
        bird.style.top = bird.offsetTop + speed + 'px';
        floorText();
    }
}
function up() {
    if(isGameover){
        speed-=0.8;
        bird.id='flybird_up'
        up_bgm.play();
        if(speed<=0){
          speed=0;
          clearInterval(upTimer);
          DownTimer=setInterval(down,30);
        }
        bird.style.top=bird.offsetTop-speed+'px';
    }
}
function birdJump() {
    speed=speedMax;
    if(isGameover){
        clearInterval(upTimer);
        clearInterval(DownTimer);
        upTimer=setInterval(up,30);
    }
}

function rand(min,max) {
    return parseInt(Math.random()* (max-min)+min);
}
function create_pipe() {
    if(isGameover) {
        // if(isGameover) {
            var conduit_group = document.querySelector(".conduit_group");
        // if(isGameover) {
            var conduitItem = document.createElement("div");
        // if(isGameover) {
            conduitItem.className = 'conduitItem';
            // if(isGameover) {
            conduit_group.appendChild(conduitItem);
            var topHeight = rand(60, 223);
            var bottomHeight = 373 - space - topHeight;
            conduitItem.innerHTML = '<div class="top_conduit"><div style="height:' + topHeight + 'px"></div></div><div class="bottom_conduit"><div style="height: ' + bottomHeight + 'px"></div></div>'
            var maxWidth = canvas.offsetWidth;
            conduitItem.style.left = maxWidth + 'px';
            conduitItem.AddToscore = true;
        // }
        conduitItem.movetimer = setInterval(function () {
            if(isGameover) {
                maxWidth -= 3;
                conduitItem.style.left = maxWidth + 'px'
            }
            if (maxWidth <= -70) {
                clearInterval(conduitItem.movetimer);
                conduit_group.removeChild(conduitItem);
            }
            if (conduitItem.offsetLeft <= 30 && conduitItem.AddToscore == true) {
                score++;
                conduitItem.AddToscore = false;
                scoreFn(score);
                console.log(score);
            }

        }, 30)
    }
    }

function scoreFn(score) {
    var newscore=score;
    var scoreText=newscore.toString();
    scoreDiv.innerHTML=null;
    for(var i=0;i<scoreText.length;i++){
        var img=document.createElement('img');
        img.src='../images/'+scoreText[i]+'.jpg';
        scoreDiv.appendChild(img);
    }
}

function crashTest(obj1,obj2) {
    var l1=bird.offsetLeft;
    var r1=bird.offsetWidth+l1;
    var t1=bird.offsetTop;
    var b1=t1+bird.offsetHeight;

    var l2=obj2.offsetLeft;
    var r2=obj2.offsetWidth+l2;
    var t2=obj1.offsetTop;
    var b2=t2+obj1.offsetHeight;
    if(r1>l2 && l1<r2 && b1>t2&&t1<b2){
        gameover();
    }
}

function judge() {
    var conduitItem = document.querySelector('.conduit_group').querySelectorAll('.conduitItem');
    for(i=0;i<conduitItem.length;i++){
        var top_conduit=conduitItem[i].querySelector('.top_conduit');
        var bottom_conduit=conduitItem[i].querySelector('.bottom_conduit');
        console.log(top_conduit.offsetLeft,top_conduit.offsetX,conduitItem[i].offsetLeft);
        crashTest(top_conduit,conduitItem[i]);
        crashTest(bottom_conduit,conduitItem[i]);
    }
}

var start_btn=document.querySelector('.start_btn');
var gameStartDiv=document.querySelector('.game_start');
var pausekey_btn=document.querySelector('.pause');

function init() {
    start_btn.onclick=function () {
        gameStartDiv.style.display='none';
        bird.style='display:block';
        bird.style.top='200px';
        bgm.play();
        conduitTimer=setInterval(create_pipe,2000)
        document.addEventListener('click',birdJump,false)
        document.addEventListener('keydown',pause,false)
        crashTestTimer=setInterval(judge,1000/60);
    }
}
function pause() {
    // pausekey_btn.onclick = function () {
        if (isGameover) {
            isGameover = false;
            pausekey_btn.innerHTML = '<img src="../images/start.jpg" alt="">';
            clearInterval(birdJump);
        } else {
            isGameover = true;
            pausekey_btn.innerHTML = '<img src="../images/submit.jpg" alt="">';
        }
    // }
}
init();
// pause();

var game_restart=document.querySelector('.game_restart')
game_restart.onclick=restart;
var conduit_group=document.querySelector('.conduit_group')
function restart() {
    bird.className='bird'
    clearTimer();
    scoreDiv.innerHTML=null;
    isGameover=true;
    speed=0;
    score=0;
    speedMax=8;
    space=100;
    document.querySelector('.gameover').style.display='none';
    gameStartDiv.style.display='block';
    bird.style.display='none';
    conduit_group.innerHTML='';

}


function clearTimer() {
    var timer=setInterval(function () {},30);
    for(i=0;i<timer;i++){
        clearInterval(i);
    }
}
