const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
let previousCurrentDayIndex = 0;
let currentYear = new Date().getFullYear();
let currentWeek = new Date().getWeek();

setTimeout(() => {
    recountMonthDays(currentYear)
}, 600);

function recountMonthDays(year) {
    let selectedMonth = document.getElementById('middleTag').selectedIndex;
    const days = document.getElementsByClassName('day-number');
    removeCurrentDayStyle(days);

    const daysInCurrentMonth = daysInMonth(year, selectedMonth);

    if(selectedMonth === 0){
        year--;
        selectedMonth = 11;
    }

    const daysInPreviousMonth = daysInMonth(year, selectedMonth - 1);
    let startDay = getStartDate(selectedMonth, year);

    fillPreviousMonthDays(days, startDay, daysInPreviousMonth);
    fillCurrentMonthDays(days, startDay, daysInCurrentMonth);
    fillNextMonthDays(days, startDay, daysInCurrentMonth);

    setCurrentDayStyle(days, startDay);
}

function getStartDate(selectedMonth, year){
    let date = new Date(`${months[selectedMonth]} 01, ${year} 00:00:00`);
    if(date.getDay() === 0){
        return  7;
    }

    return date.getDay();
}

function fillPreviousMonthDays(days, startDay, daysInPreviousMonth){
    for(let i = 0; i < startDay - 1; i++){
        days[i].innerHTML = '';
        days[i].innerHTML = (daysInPreviousMonth - startDay + i + 2).toString();
        days[i].classList.add('day_not-this-month-day')
    }
}

function fillCurrentMonthDays(days, startDay, daysInCurrentMonth){
    let counter = 1;
    for (let i = startDay - 1; i < daysInCurrentMonth + startDay - 1; i++) {
        days[i].innerHTML = '';
        days[i].innerHTML = (counter).toString();
        days[i].classList.remove('day_not-this-month-day');
        counter++;
    }
}

function fillNextMonthDays(days, startDay, daysInCurrentMonth){
    let counter = 1;
    for (let i = daysInCurrentMonth + startDay - 1; i < days.length; i++) {
        days[i].innerHTML = '';
        days[i].innerHTML = counter.toString();
        days[i].classList.add('day_not-this-month-day')
        counter++;
    }
}

function removeCurrentDayStyle(days){
    days[previousCurrentDayIndex].parentNode.classList.remove('calendar__day_today');
}

function setCurrentDayStyle(days, startDay){
    previousCurrentDayIndex = (new Date().getDate() + (startDay - 2));
    days[previousCurrentDayIndex].parentNode.classList.add('calendar__day_today');
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}