
let dateHeader = $("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
let textAreaId = ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
let today = moment().format("MMM Do YY");
let taskListDate = localStorage.getItem("taskListDate");

if(taskListDate !== today) {
    taskListDate = today;
    localStorage.setItem("taskListDate", taskListDate);

    for (let k = 0; k < textAreaId.length; k++){
        localStorage.setItem(`taskHr${textAreaId[k]}`, "");
    }
}

//Function for color coding and adding locally saved tasks into their proper areas
function updateSchedule() {
    let time = moment().format('h:mm a');
    let currentHour = parseInt(time.split(':', 1));

    //If "PM" then convert to military time
    if(time.includes("p")){
        currentHour += 12;
    }

    for(let j = 0; j < textAreaId.length; j++){
        let hour = parseInt(textAreaId[j]);
        let textArea = $(`#${textAreaId[j]}`);
        
        textArea.text(localStorage.getItem(`taskHr${textAreaId[j]}`));

        if (hour < currentHour) {
            textArea.addClass("past");

        } else if(hour === currentHour) {
            textArea.addClass("present");

        } else {
            textArea.addClass("future");
        }   
    }  
}

updateSchedule();

function saveTask() {
    let btnName = $(this).attr("name");
    let taskTxt = $(`#${btnName}`).val();

    localStorage.setItem(`taskHr${btnName}`, taskTxt);
}

$(document).on('click', '.saveBtn', saveTask);