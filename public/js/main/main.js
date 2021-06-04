const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const createNewBtn = document.getElementById('createNewBtn');
const body = document.getElementById('body');
const yearViewBtn = document.getElementById('yearView');
const monthViewBtn = document.getElementById('monthView');
const weekViewBtn = document.getElementById('weekView');
let previousCurrentDayIndex = 0;

let currentYear = new Date().getFullYear();
let selectedViewIndex = 1;

yearViewBtn.addEventListener('click', () => {
    changeView(addYear, subtractYear, 'yearSpan');
});

weekViewBtn.addEventListener('click', () => {
    changeView(addWeek, subtractWeek, 'weekSpan');
})

function changeView(addFunction, subtractFunction, newSpanId){
    // document.getElementById('middleTag').remove();
    //
    // const div = document.createElement('div');
    // div.classList.add('view-control__middle-tag');
    // div.id = 'middleTag';
    //
    // const span = document.createElement('span');
    // span.id = newSpanId;
    // span.innerText = currentYear.toString();
    //
    // div.appendChild(span);
    // document.getElementById('viewControlBlock')
    //     .insertBefore(div, document.getElementById('nextElement'));
    //
    // const prevElButton = document.getElementById('previousElement');
    // const nextElButton = document.getElementById('nextElement');
    //
    // prevElButton.removeEventListener('click', subtractWeek, false);
    // nextElButton.removeEventListener('click', addWeek, false);
    // prevElButton.removeEventListener('click', subtractMonth, false);
    // nextElButton.removeEventListener('click', addMonth, false);
    // prevElButton.removeEventListener('click', subtractYear, false);
    // nextElButton.removeEventListener('click', addYear, false);
    //
    // prevElButton.addEventListener('click', addFunction);
    // nextElButton.addEventListener('click', subtractFunction);
}


setCurrentMonth();
setViewButtonsActions();
recountMonthDays(currentYear, document.getElementById('middleTag').selectedIndex);

function setCurrentMonth() {
    const currentMonth = new Date().getMonth();
    document.getElementById('middleTag')[currentMonth].selected = true;
}

function setViewButtonsActions() {
    for (let i = 0; i < calendarViewsBtnList.length; i++) {
        let btn = calendarViewsBtnList[i];
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('calendar-views__button_focused')) {
                btn.classList.add('calendar-views__button_focused');
                calendarViewsBtnList[selectedViewIndex].classList.remove('calendar-views__button_focused');
                selectedViewIndex = i;
            }
        })
    }
}

createNewBtn.addEventListener('click', () => {
    redirectTo('CreateNew');
});

document.getElementById('nextElement').addEventListener('click', addMonth, false);
document.getElementById('previousElement').addEventListener('click', subtractMonth, false);

function addMonth() {
    const monthSelect = document.getElementById('middleTag');
    if (monthSelect.selectedIndex !== 11) {
        monthSelect.selectedIndex += 1;
    } else {
        monthSelect.selectedIndex = 0;
        currentYear++;
    }
    recountMonthDays(currentYear, monthSelect.selectedIndex);
}
function subtractMonth() {
    const monthSelect = document.getElementById('middleTag');
    if (monthSelect.selectedIndex !== 0) {
        monthSelect.selectedIndex -= 1;
    } else {
        monthSelect.selectedIndex = 11;
        currentYear--;
    }
    recountMonthDays(currentYear, monthSelect.selectedIndex);
}

function addYear() { addInSpan('yearSpan'); }
function subtractYear() { subtractInSpan('yearSpan'); }

function addWeek(){ addInSpan('weekSpan'); }
function subtractWeek(){ subtractInSpan('weekSpan'); }

function addInSpan(id){
    const span = document.getElementById(id).innerText;
    document.getElementById(id).innerText = (parseInt(span) + 1).toString();
}
function subtractInSpan(id){
    const span = document.getElementById(id).innerText;
    document.getElementById(id).innerText = (parseInt(span) - 1).toString();
}

function recountMonthDays(year, selectedMonth) {
    const days = document.getElementsByClassName('day-number');
    const daysInCurrentMonth = daysInMonth(year, selectedMonth);

    if(selectedMonth === 0){
        year--;
        selectedMonth = 11;
    }
    const daysInPreviousMonth = daysInMonth(year, selectedMonth - 1);

    let date = new Date(`${months[selectedMonth]} 01, ${year} 00:00:00`);
    let startDay = date.getDay();

    days[previousCurrentDayIndex].parentNode.classList.remove('calendar__day_today');

    for (let i = 0; i < days.length; i++) {
        days[i].innerHTML = '';
    }

    if(startDay === 0){
        startDay = 7;
    }

    for(let i = 0; i < startDay - 1; i++){
        days[i].innerHTML = (daysInPreviousMonth - startDay + i + 2).toString();
        days[i].classList.add('day_not-this-month-day')
    }

    let counter = 1;
    for (let i = startDay - 1; i < daysInCurrentMonth + startDay - 1; i++) {
        days[i].innerHTML = (counter).toString();
        days[i].classList.remove('day_not-this-month-day');
        counter++;
    }

    counter = 1;
    for (let i = daysInCurrentMonth + startDay - 1; i < days.length; i++) {
        days[i].innerHTML = counter.toString();
        days[i].classList.add('day_not-this-month-day')
        counter++;
    }

    previousCurrentDayIndex = (new Date().getDate() + (startDay - 2));
    days[previousCurrentDayIndex].parentNode.classList.add('calendar__day_today');
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


document.getElementById('logOutBtn').addEventListener('click', () => {
    auth.signOut();
});
