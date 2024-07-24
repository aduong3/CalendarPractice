const displayCalendar = document.querySelector('.displayCalendar');
const DateTitle = document.querySelector('.DateTitle');
const monthYearDisplay = document.querySelector('#monthYearDisplay');
const prevMonthButton = document.querySelector('.prevMonth');
const nextMonthButton = document.querySelector('.nextMonth');
const addEventsPanel = document.querySelector('.addEvents');
const addEventButton = document.querySelector('.addEventButton');
const displayEvents = document.querySelector('.displayEvents');

let d = new Date();
let getYear = d.getFullYear();
let getMonth = d.getMonth();
let selectedDate = '';

let html = '';
let DataArr = [];

display();
function display(){
    const firstDay = new Date(getYear, getMonth, 1);
    const firstIndex = firstDay.getDay(); //gets the placement of which Day it will be on, 0=Sunday, 1=Monday, ...

    const lastDay = new Date(getYear, getMonth + 1, 0);
    const lastDate = lastDay.getDate(); //to actually get the last Date which would be 31 for July
    const lastIndex = lastDay.getDay(); //same as firstIndex but for the last day of the month

    const previousLastDay = new Date(getYear, getMonth, 0).getDate();
    //console.log(previousLastDay);

    //console.log(firstIndex);
    //console.log(lastDate);
    //console.log(lastIndex);  

    let previousCounter = firstIndex;
    while(previousCounter !== 0){
        //console.log(previousLastDay - previousCounter + 1); 
        previousCounter--; //putting the counter-- here means I would not need to offset by adding 1, like in the console.log above
        html += `<p onclick="addEvents(this)" class="previousMonthDates notToday">${previousLastDay - previousCounter}</p>`;
        
    
    }

    for(var i = 1; i <= lastDate; i++){
        //console.log(i);
        // expression ? true : false
        let today = ((i === d.getDate() && getMonth === new Date().getMonth() && getYear === new Date().getFullYear())) ? 'today' : ''; 
        if(today){
        //console.log(`today: ${i}`);
        html += `<p onclick="addEvents(this)" class=${today}>${i}</p>`
        }
        else
        html += `<p onclick="addEvents(this)" class="notToday">${i}</p>`


    }

    let counter = 1;

    for(var i = lastIndex; i < 6; i++){
        html += `<p onclick="addEvents(this)" class="nextMonthDates notToday">${counter}</p>`
        counter++;
    }

    monthYearDisplay.innerHTML = `${new Date(getYear,getMonth).toLocaleString('en-US', {month: "long", year: "numeric"})}`;

    displayCalendar.innerHTML = html;
    html = '';

   // console.log(displayCalendar);

}


function addEvents(obj){
    let checkMonth = getMonth;
    //console.log(obj.classList.contains('previousMonthDates') || obj.classList.contains('nextMonthDates'));

    if(obj.classList.contains('previousMonthDates')){
        checkMonth = getMonth - 1;
    } else if (obj.classList.contains('nextMonthDates')){
        checkMonth = getMonth + 1;
    }

    

    DateTitle.innerHTML = `${new Date(getYear,checkMonth, parseInt(obj.innerHTML)).toLocaleString('en-US',{
    year: "numeric",
    month: "long",
    day: "2-digit",
    }
)}`
    selectedDate = DateTitle.innerHTML;
    addEventButton.style.display = 'inline';

}

function EventForm(){   
    //console.log(addEventsPanel.style.display)
    if(addEventsPanel.style.display == 'none' || addEventsPanel.style.display == '' && selectedDate){
    addEventsPanel.style.display = 'flex';
    addEventButton.style.display = 'none';
    } else {
    addEventsPanel.style.display = 'none';
    selectedDate = '';
    }
}



function submitForm(e){
    e.preventDefault();
    let eventTitle = document.querySelector('#eventTitle');
    let startTime = document.querySelector('#startTime');
    let endTime = document.querySelector('#endTime');
    // console.log(eventTitle.value);
    // console.log(startTime.value);
    // console.log(endTime.value);
    let dataTitle = DateTitle.innerHTML;
    DataArr.push({[dataTitle]: {title: eventTitle.value, start: startTime.value, end: endTime.value}});

    eventTitle.value = '';
    startTime.value = '';
    endTime.value = '';
    //console.log(DataArr);
    DataArr.forEach(item => {
        //console.log(Object.entries(item)[0][1]);
        let findDateKey = Object.keys(item);
        let findDateEntries = Object.entries(item)[0][1];
        if(findDateKey == DateTitle.innerHTML){
            html += `<h3>${findDateEntries.title}:</h3> <p>${findDateEntries.start} - ${findDateEntries.end}</p>`;
            //console.log(findDateEntries.title);
        }

    })
    displayEvents.innerHTML = html;
    html = '';
    addEventsPanel.style.display = 'none';
}



function buttonControls(){
    getMonth = this === nextMonthButton ? getMonth + 1 : getMonth - 1;

    if(getMonth < 0 || getMonth > 11){ //0-11 months
        d = new Date(getYear, getMonth);
        //console.log(d);

        getYear = d.getFullYear();

        getMonth = d.getMonth(); // so number is not  < 0 or > 11.
    }
    else{
        d = new Date();
    }

    display();
}
prevMonthButton.addEventListener('click',buttonControls);
nextMonthButton.addEventListener('click',buttonControls);

