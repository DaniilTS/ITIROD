const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const createNewBtn = document.getElementById('createNewBtn');
const body = document.getElementById('body');
const yearViewBtn = document.getElementById('yearView');
const monthViewBtn = document.getElementById('monthView');
const weekViewBtn = document.getElementById('weekView');

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
document.getElementById('logOutBtn').addEventListener('click', () => {
    auth.signOut();
});

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


