let gameseq=[];
let userseq=[];

let level=0;let highest_score=0;
let start=false;
let colors=["red","green","blue","yellow"];
let p=document.querySelector("p");

document.addEventListener("keypress",()=>{
    if(!start){
        start=true;
    }
   levelup();
    
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },300);
}


function userFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },300);
}


function levelup(){
    userseq=[];
    level++;
    p.innerText=`level : ${level}`;

    let randind=Math.floor(Math.random()*4);
    let randcolor=colors[randind];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    // console.log(randind);
    // console.log(randcolor);
    // console.log(randbtn);
    btnFlash(randbtn);
}

let btns=document.querySelectorAll(".btn");
//console.log(btns);
for(bt of btns){
    //console.log(bt);
    bt.addEventListener("click",btnPress);
    
}

function checkMatch(ind){
    if(userseq[ind]===gameseq[ind]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }else{
        if(highest_score<level){
            highest_score=level;
        }
        p.innerText=`Game Over! Your Score is ${level} AND HiGHEST SCORE = ${highest_score} Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
      
        //reset
        level=0;
        gameseq=[];userseq=[];
        start=false;
       
    }
}
function btnPress(){
   if(start){
     //console.log(this);
     let btn=this;    userFlash(btn);
   
     let color=btn.getAttribute("id")
     userseq.push(color);
 
     console.log(userseq);
 
 
     checkMatch(userseq.length-1);
     //console.log(userseq);
   }
   else{
    alert("Please press any key to restart any game ");
   }
    
}

//adding flow of code .. how it works in explaination of games/simon.md

//## 2) Flow explanation — step by step
/*
Initial state

gameseq = [], userseq = [], level = 0, start = false.

Page shows a <p> element for messages/level. There are 4 colored buttons (classes match "red"|"green"|"blue"|"yellow" and id attribute used to read color on click).

Start (keypress)

When the user presses any key, start becomes true (if not already true) and levelup() is called.

levelup()

Clears userseq (so the player starts fresh for the new level).

Increments level.

Picks a random color from colors and appends it to gameseq.

Flashes the chosen button so the player sees the new sequence (note: only the newly added color is flashed; earlier colors are not re-flashed).

Displays current level in <p>.

Player input

Player clicks one of the colored buttons (handler btnPress).

If start is false (game not started), an alert asks the user to press a key first.

If start is true: it flashes the button for feedback, reads the button id as the color, pushes it into userseq, then calls checkMatch for the latest index.

checkMatch(ind)

Compares userseq[ind] with gameseq[ind].

If they match:

If the user has completed the whole sequence (userseq.length == gameseq.length), after 1 second levelup() is called to add another color (progress to next level).

If not completed, waits for the next button click.

If they do not match:

Updates highest_score if current level is higher than stored highest_score.

Shows a red flash on the page background and displays the Game Over message in <p> with scores.

Resets level, gameseq, userseq, and start so a keypress will restart the game.
*/


//###  3) Small notes & suggested improvements
/*
Score vs Level nuance: Currently you display level as the score on game over. Depending on game logic, you may want the score to be level - 1 (for example, if level increments before the user successfully repeats a round). Decide whether level means "current round number" or "rounds completed" and adjust the displayed score accordingly.

Sequence replay: Classic Simon usually replays the entire sequence each round (1 → show whole seq [color1], 2 → show color1 then color2, etc.). Your code only flashes the newly added color. If you want to replay whole sequence for clarity, loop over gameseq with timed flashes instead of only flashing randbtn.

Input locking during animation: Right now the user could click while the game is flashing. Consider disabling clicks while the sequence is being shown (set a busy flag) to prevent mis-clicks.

Debounce keypress: You set start = true inside the keypress handler but still call levelup() even if start was already true. This can cause duplicate levels if the user hits keys mid-game. Guard so levelup() only runs when start was false (i.e., call levelup() inside the if (!start) block).

Highest score persist: If you want the highest score to survive page reloads, store it in localStorage.

Accessibility: Add keyboard controls (e.g., map keys to colors) and aria attributes for assistive tech.

*/
