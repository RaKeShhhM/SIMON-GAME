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
