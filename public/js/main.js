const monthSelect = document.getElementById('monthSelect');
const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const taskBar = document.getElementById('taskBar');
const taskBarList = document.getElementById('taskBarList');
const taskBarBtn = document.getElementById('taskBarBtn');
const createNewBtn = document.getElementById('createNewBtn');
const body = document.getElementById('body');

setTimeout(() => {
    updateTaskBar();
}, 500)

function updateTaskBar() {
    const tasksAppointmentsDbRef = database.ref(`users/${auth.currentUser.uid}/tasks|appointments`);
    tasksAppointmentsDbRef.on('value', (snapshot) => {
        document.getElementById('taskBarList').innerHTML = '';
        if (snapshot.val()) {
            createTaskBarItem(snapshot.val());
        }
    });
}

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

function createTaskBarListItems(item, itemKey) {
    let li = document.createElement('li');
    li.classList.add('upcoming-tasks-bar__item');
    li.classList.add('bar-item');
    li.tabIndex = 1;

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('bar-item__time');
    timeSpan.innerText = item.reminders ? item.reminders[0].substring(11) : item.title;

    const colorSpan = document.createElement('span');
    colorSpan.classList.add('bar-item__color');
    colorSpan.style.backgroundColor = item.color;
    if (item.isDone === false) {
        colorSpan.innerText = 'T';
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

    document.getElementById('taskBarList').appendChild(li);

    li.addEventListener('click', () => {
        createDialog(itemKey);
    })

}

let dialogIsOpen = false;

function createDialog(itemKey) {
    if (!dialogIsOpen) {
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

function createDialogCloseButton(dialogBlock) {
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__close-button');
    btn.innerText = 'X';
    btn.addEventListener('click', () => {
        dialogIsOpen = false;
        dialogBlock.remove();
    });
    return btn;
}

function createDialogEditButton() {
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__button');
    btn.innerText = 'Edit';
    btn.addEventListener('click', () => {
        redirectTo('EditTA');
    });
    return btn;
}

function createDialogDeleteButton(dialogBlock) {
    let btn = document.createElement('button');
    btn.classList.add('dialog-block__button');
    btn.innerText = 'Delete';
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this element?')) {
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

function recountMonthDays(year, selectedMonth) {
    const days = document.getElementsByClassName('day-number');
    let daysInCurrentMonth = daysInMonth(year, selectedMonth);
    let currentDate = new Date();
    console.log('Текущее число месяца:', currentDate.getDate())
    console.log('Текущий день недели', currentDate.getDay());

    for (let i = 0; i < daysInCurrentMonth; i++) {
        days[i].innerHTML = (i + 1).toString();
        days[i].classList.remove('day_not-this-month-day')
    }

    const diff = 35 - daysInCurrentMonth;
    for (let i = 0; i < diff; i++) {
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
        taskBarBtnAction = 2;
        taskBarBtn.classList.add('upcoming-tasks-bar__button__action');

        createNewBtn.hidden = true;

        document.getElementById('taskBarList').innerHTML = '';

        drawOpenedTaskBarList();

        taskBar.classList.add('task-bar-open');
    } else {
        taskBar.innerHTML = '';

        const list = document.createElement('ul');
        list.id = 'taskBarList';
        list.classList.add('upcoming-tasks-bar__list');

        taskBar.appendChild(list);
        taskBar.appendChild(taskBarBtn);

        updateTaskBar();

        taskBarBtnAction = 1;
        taskBarBtn.classList.remove('upcoming-tasks-bar__button__action');
        createNewBtn.hidden = false;
        taskBar.classList.remove('task-bar-open');
    }
});

function drawOpenedTaskBarList() {
    drawTop();
    drawOpenedGrid();
}

function drawTop() {
    const topDiv = document.createElement('div');
    topDiv.classList.add('task-bar-open__top');

    const topText = document.createElement('h2');
    topText.innerText = 'Appointments/Tasks for today:';
    topText.classList.add('task-bar-open__h2');

    const taskBarBtn = document.getElementById('taskBarBtn');
    document.getElementById('taskBarBtn').remove();

    topDiv.appendChild(topText);
    topDiv.appendChild(taskBarBtn);

    taskBar.insertBefore(topDiv, taskBar.firstChild);
}

function drawOpenedGrid() {
    document.getElementById('taskBarList').classList.add('list-open');

    database.ref(`users/${auth.currentUser.uid}/tasks|appointments`).on('value', (snapshot) => {
        document.getElementById('taskBarList').innerHTML = '';
        if (snapshot.val()) {
            updateOpenedGrid(snapshot.val());
        }
    });
}

function updateOpenedGrid(data) {
    let TA_keys = Object.keys(data);
    let TA_values = Object.values(data);
    let counter = 0;
    TA_values.forEach(item => {
        createGridItem(item, TA_keys[counter]);
        counter++;
    });
}

function createGridItem(object, itemKey) {
    let li = document.createElement('li');
    li.classList.add('list-open__item');
    li.classList.add('list-item');

    const leftContentDiv = document.createElement('div');
    leftContentDiv.classList.add('list-item__left-content');

    const itemSpanClass = 'list-item__span';
    let resultRemindersArray = [];
    if (object.reminders) {
        object.reminders.forEach(reminder => {
            resultRemindersArray.push(reminder.substring(11));
        });
    }

    const titleSpan = createSpanWithClass(`Title: ${object.title}`, itemSpanClass);
    const startSpan = createSpanWithClass(`Start Time: ${object.start.substring(11)}`, itemSpanClass);
    const endSpan = createSpanWithClass(`End Time: ${object.end.substring(11)}`, itemSpanClass);
    const reminderSpan = createSpanWithClass(`Reminders: ${resultRemindersArray}`, itemSpanClass);
    const placeSpan = createSpanWithClass(`Place: ${object.place}`, itemSpanClass);
    const descriptionSpan = createSpanWithClass(`Description: ${object.description}`, itemSpanClass);

    leftContentDiv.appendChild(titleSpan);
    leftContentDiv.appendChild(startSpan);
    leftContentDiv.appendChild(endSpan);
    leftContentDiv.appendChild(reminderSpan);
    leftContentDiv.appendChild(placeSpan);
    leftContentDiv.appendChild(descriptionSpan);

    const rightContentDiv = document.createElement('div');
    rightContentDiv.classList.add('list-item__right-content');

    const colorSpan = createSpanWithClass(object.isDone === false ? 'T' : '', 'list-item__color');
    colorSpan.style.backgroundColor = object.color;

    rightContentDiv.appendChild(colorSpan);
    if (object.isDone === false) {
        const doneBtn = document.createElement('button');
        doneBtn.classList.add('list-item__button');
        doneBtn.tabIndex = 1;
        doneBtn.innerText = 'Done';
        doneBtn.addEventListener('click', (e) => {
            if (confirm('Yoy really done this ?')) {
                const selectedItemId = localStorage.getItem('selectedElementId');
                const tasksAppointmentsDbRef = database.ref(`users/${auth.currentUser.uid}/tasks|appointments/${selectedItemId}`);
                tasksAppointmentsDbRef.remove();
            }
        })

        rightContentDiv.appendChild(doneBtn);
    }

    li.appendChild(leftContentDiv);
    li.appendChild(rightContentDiv);

    li.addEventListener('click', () => {
        createDialog(itemKey);
    })

    document.getElementById('taskBarList').appendChild(li);
}

function createSpanWithClass(innerText, className) {
    let span = document.createElement('span');
    span.classList.add(className);
    span.innerText = innerText;
    return span;
}