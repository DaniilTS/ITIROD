const monthSelect = document.getElementById('monthSelect');
const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const taskBar = document.getElementById('taskBar');
const taskBarList = document.getElementById('taskBarList');
const taskBarBtn = document.getElementById('taskBarBtn');

setCurrentMonth();
setViewButtonsActions();

function setCurrentMonth() {
    const currentMonth = new Date().getMonth();
    monthSelect[currentMonth].selected = true;
}

let selectedViewIndex = 1;
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

document.getElementById('logOutBtn').addEventListener('click', () => {
    auth.signOut();
});

document.getElementById('createNewBtn').addEventListener('click', () => {
    redirectTo('CreateNew');
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (monthSelect.selectedIndex !== 11) {
        monthSelect.selectedIndex += 1;
    } else {
        monthSelect.selectedIndex = 0;
    }
});

document.getElementById('previousMonth').addEventListener('click', () => {
    if (monthSelect.selectedIndex !== 0) {
        monthSelect.selectedIndex -= 1;
    } else {
        monthSelect.selectedIndex = 11;
    }
});

let taskBarBtnAction = 1;
taskBarBtn.addEventListener('click', ()=>{
    if (taskBarBtnAction === 1){
        taskBarBtn.classList.add('upcoming-tasks-bar__button__action');
        taskBar.classList.add('task-bar-open');
        taskBarBtnAction = 2;
    } else {
        taskBarBtn.classList.remove('upcoming-tasks-bar__button__action');
        taskBar.classList.remove('task-bar-open');
        taskBarBtnAction = 1;
    }
});