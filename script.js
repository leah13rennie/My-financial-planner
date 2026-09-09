// ==========================
// STUDYOS CORE DATA
// ==========================


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let xp = Number(localStorage.getItem("xp")) || 0;

let completed = Number(localStorage.getItem("completed")) || 0;

let focusMinutes = Number(localStorage.getItem("focus")) || 0;

let streak = Number(localStorage.getItem("streak")) || 1;



// ==========================
// DISPLAY DATA
// ==========================


function updateDashboard(){

document.getElementById("xp").innerHTML =
xp + " XP";


document.getElementById("completed").innerHTML =
completed;


document.getElementById("focusTime").innerHTML =
focusMinutes + " min";


document.getElementById("streak").innerHTML =
streak + " Days";


document.getElementById("level").innerHTML =
Math.floor(xp / 100) + 1;


localStorage.setItem("xp",xp);
localStorage.setItem("completed",completed);
localStorage.setItem("focus",focusMinutes);
localStorage.setItem("streak",streak);

}



// ==========================
// TASK SYSTEM
// ==========================


function renderTasks(){

let list=document.getElementById("taskList");

list.innerHTML="";


tasks.forEach((task,index)=>{


let li=document.createElement("li");


li.innerHTML=`

<span>${task}</span>

<button onclick="completeTask(${index})">
✓
</button>

`;


list.appendChild(li);


});


}



function addTask(){

let input=document.getElementById("taskInput");


if(input.value.trim()=="") return;


tasks.push(input.value);


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


input.value="";


renderTasks();

}



function completeTask(index){


tasks.splice(index,1);


completed++;

xp += 20;


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);


updateDashboard();


renderTasks();


showToast("Task completed +20 XP 🚀");


}









// ==========================
// POMODORO TIMER
// ==========================


let seconds = 1500;

let timer;


function updateTimer(){


let min=Math.floor(seconds/60);

let sec=seconds%60;


document.getElementById("timer")
.innerHTML =
`${min}:${sec<10?"0":""}${sec}`;


}



function startTimer(){


clearInterval(timer);


timer=setInterval(()=>{


seconds--;


updateTimer();



if(seconds<=0){


clearInterval(timer);


focusMinutes+=25;


xp+=50;


updateDashboard();


showToast(
"Focus session complete! +50 XP 🔥"
);


seconds=1500;


updateTimer();


}


},1000);


}




function pauseTimer(){

clearInterval(timer);

}



function resetTimer(){

clearInterval(timer);

seconds=1500;

updateTimer();

}










// ==========================
// DAILY GOALS
// ==========================


function saveGoal(){

let goal=document.getElementById("goalInput").value;


localStorage.setItem(
"goal",
goal
);


document.getElementById("goal")
.innerHTML =
"🎯 " + goal;


}



function loadGoal(){


let goal =
localStorage.getItem("goal");


if(goal){

document.getElementById("goal")
.innerHTML =
"🎯 "+goal;

}


}










// ==========================
// NOTES
// ==========================


let notes=document.getElementById("notes");


notes.value =
localStorage.getItem("notes") || "";


notes.addEventListener(
"input",
()=>{


localStorage.setItem(
"notes",
notes.value
);


});









// ==========================
// AI STUDY ASSISTANT
// ==========================


function askAI(){


let input =
document.getElementById("aiInput").value;


let response="";


if(input.toLowerCase().includes("biology")){


response=
"🧬 Biology Plan:<br><br>"+
"1. Read concept<br>"+
"2. Create flashcards<br>"+
"3. Practice questions<br>"+
"4. Review mistakes";


}


else if(input.toLowerCase().includes("math")){


response=
"📐 Math Plan:<br><br>"+
"1. Learn formula<br>"+
"2. Solve examples<br>"+
"3. Practice 20 problems";


}


else{


response=
"🚀 Study Strategy:<br><br>"+
"Break your goal into small tasks, "+
"use Pomodoro sessions, "+
"and review daily.";


}



document.getElementById("aiResponse")
.innerHTML=response;


}










// ==========================
// CHART
// ==========================


let ctx =
document.getElementById("studyChart");


new Chart(ctx,{

type:"doughnut",


data:{


labels:[
"Completed Tasks",
"Remaining Energy"
],


datasets:[{

data:[
completed+1,
10
]


}]


},


options:{


responsive:true


}


});









// ==========================
// DARK MODE
// ==========================


document
.getElementById("themeBtn")
.onclick=function(){


document.body.classList.toggle("light");


};









// ==========================
// TOAST
// ==========================


function showToast(message){


let toast=document.createElement("div");


toast.innerHTML=message;


toast.style.position="fixed";

toast.style.bottom="30px";

toast.style.right="30px";

toast.style.padding="15px 25px";

toast.style.background="#38bdf8";

toast.style.color="black";

toast.style.borderRadius="15px";

toast.style.fontWeight="bold";


document.body.appendChild(toast);



setTimeout(()=>{


toast.remove();


},2500);



}










// START APP


renderTasks();

updateDashboard();

loadGoal();

updateTimer();