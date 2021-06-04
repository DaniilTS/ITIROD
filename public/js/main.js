const monthSelect = document.getElementById('monthSelect');
const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const taskBar = document.getElementById('taskBar');
const taskBarList = document.getElementById('taskBarList');
const taskBarBtn = document.getElementById('taskBarBtn');
const createNewBtn = document.getElementById('createNewBtn');
const body = document.getElementById('body');

setTimeout(() => {
    const tasksAppointmentsDbRef = database.ref(`users/${auth.currentUser.uid}/tasks|appointments`);
    tasksAppointmentsDbRef.on('value', (snapshot) => {
        taskBarList.innerHTML='';
        if(snapshot.val()){
            createTaskBarItem(snapshot.val());
        }
    });
}, 500)

function createTaskBarItem(data) {
    let TA_keys = Object.keys(data);
    let TA_values = Object.values(data);
    // const currentTime = dateTimeLocalToSeconds(getCurrentDateTime());
    // const endOfDayTime = dateTimeLocalToSeconds(getCurrentDateTime().substring(0, 11) + '23:59');
    let counter = 0;
    TA_values.forEach(item => {
        createTaskBarListItems(item, TA_keys[counter]);
        counter++;
    });
}

function createTaskBarListItems(item, itemKey){
    if(item.reminders){
        item.reminders.forEach(reminderVal => {
            let li = document.createElement('li');
            li.classList.add('upcoming-tasks-bar__item');
            li.classList.add('bar-item');
            li.tabIndex=1;

            const timeSpan = document.createElement('span');
            timeSpan.classList.add('bar-item__time');
            timeSpan.innerText = reminderVal.toString().substring(11, 16);

            const colorSpan = document.createElement('span');
            colorSpan.classList.add('bar-item__color');
            colorSpan.style.backgroundColor = item.color;
            if(item.isDone === false){
                colorSpan.innerText='T';
            }

            const hr = document.createElement('hr');
            hr.classList.add('bar-item__hr');

            const definition = document.createElement('p');
            definition.classList.add('bar-item__definition');
            definition.innerText = item.description;

            li.appendChild(timeSpan);
            li.appendChild(colorSpan);
            li.appendChild(hr);
            li.appendChild(definition);

            taskBarList.appendChild(li);

            li.addEventListener('click', ()=>{
                createDialog(itemKey);
            })
        });
    } else {
        let li = document.createElement('li');
        li.classList.add('upcoming-tasks-bar__item');
        li.classList.add('bar-item');
        li.tabIndex = 1;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('bar-item__time');
        timeSpan.innerText = item.title;

        const colorSpan = document.createElement('span');
        colorSpan.classList.add('bar-item__color');
        colorSpan.style.backgroundColor = item.color;
        if(item.isDone === false){
            colorSpan.innerText='T';
        }

        const hr = document.createElement('hr');
        hr.classList.add('bar-item__hr');

        const definition = document.createElement('p');
        definition.classList.add('bar-item__definition');
        definition.innerText = item.description;

        li.appendChild(timeSpan);
        li.appendChild(colorSpan);
        li.appendChild(hr);
        li.appendChild(definition);

        taskBarList.appendChild(li);

        li.addEventListener('click', ()=>{
            createDialog(itemKey);
        })
    }
}

let dialogIsOpen = false;
function createDialog(itemKey){
    if(!dialogIsOpen){
        dialogIsOpen = true;
        localStorage.setItem('selectedElementId', itemKey);

        const dialogBlock = document.createElement('div');
        dialogBlock.classList.add('dialog-block');

        const dialogCloseBtn = createDialogCloseButton(dialogBlock);

        const mainButtonsDiv = document.createElement('div');
        mainButtonsDiv.classList.add('dialog-block__main-buttons');

        let editBtn = createDialogEditButton();
        let deleteBtn = createDialogDeleteButton(dialogBlock);

        mainButtonsDiv.appendChild(editBtn);
        mainButtonsDiv.appendChild(deleteBtn);

        dialogBlock.appendChild(dialogCloseBtn);
        dialogBlock.appendChild(mainButtonsDiv);
        body.appendChild(dialogBlock);
    } else {
        alert('Close current dialog to open another!');
    }
}

function createDialogCloseButton(dialogBlock){
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__close-button');
    btn.innerText = 'X';
    btn.addEventListener('click', () => {
        dialogIsOpen = false;
        dialogBlock.remove();
    });
    return btn;
}

function createDialogEditButton(){
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__button');
    btn.innerText = 'Edit';
    btn.addEventListener('click', () => {
        redirectTo('EditTA');
    });
    return btn;
}

function createDialogDeleteButton(dialogBlock){
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__button');
    btn.innerText = 'Delete';
    btn.addEventListener('click', () => {
        if(confirm('Are you sure you want to delete this element?')){
            const selectedItemId = localStorage.getItem('selectedElementId');
            const tasksAppointmentsDbRef = database.ref(`users/${auth.currentUser.uid}/tasks|appointments/${selectedItemId}`);
            tasksAppointmentsDbRef.remove();
            dialogBlock.remove();
            dialogIsOpen = false;
        }
    });

    return btn;
}

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

createNewBtn.addEventListener('click', () => {
    redirectTo('CreateNew');
});


let currentYear = new Date().getFullYear();
recountMonthDays(currentYear, monthSelect.selectedIndex);

document.getElementById('nextMonth').addEventListener('click', () => {
    if (monthSelect.selectedIndex !== 11) {
        monthSelect.selectedIndex += 1;
    } else {
        monthSelect.selectedIndex = 0;
        currentYear++;
    }
    recountMonthDays(currentYear, monthSelect.selectedIndex);
});

document.getElementById('previousMonth').addEventListener('click', () => {
    if (monthSelect.selectedIndex !== 0) {
        monthSelect.selectedIndex -= 1;
    } else {
        monthSelect.selectedIndex = 11;
        currentYear--;
    }
    recountMonthDays(currentYear, monthSelect.selectedIndex);
});

function recountMonthDays(year, selectedMonth){
    const days = document.getElementsByClassName('day-number');
    let daysInCurrentMonth = daysInMonth(year, selectedMonth);
    for(let i = 0; i < daysInCurrentMonth; i++){
        days[i].innerHTML = (i + 1).toString();
        days[i].classList.remove('day_not-this-month-day')
    }

    const diff = 35 - daysInCurrentMonth;
    for(let i = 0; i < diff; i++){
        let notThisMonthDay = days[35 - diff + i];
        notThisMonthDay.innerHTML = i + 1;
        notThisMonthDay.classList.add('day_not-this-month-day')
    }
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

let taskBarBtnAction = 1;
taskBarBtn.addEventListener('click', () => {
    if (taskBarBtnAction === 1) {
        taskBarBtn.classList.add('upcoming-tasks-bar__button__action');
        createNewBtn.hidden = true;
        taskBar.classList.add('task-bar-open');
        taskBarBtnAction = 2;
    } else {
        taskBarBtn.classList.remove('upcoming-tasks-bar__button__action');
        createNewBtn.hidden = false;
        taskBar.classList.remove('task-bar-open');
        taskBarBtnAction = 1;
    }
});