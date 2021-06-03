const monthSelect = document.getElementById('monthSelect');
const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const taskBar = document.getElementById('taskBar');
const taskBarList = document.getElementById('taskBarList');
const taskBarBtn = document.getElementById('taskBarBtn');

setTimeout(() => {
    const tasksAppointmentsDbRef = database.ref(`users/${auth.currentUser.uid}/tasks|appointments`);
    tasksAppointmentsDbRef.on('value', (snapshot) => {
        taskBarList.innerHTML='';
        createTaskBarItem(snapshot.val());
    });
}, 500)

function createTaskBarItem(data) {
    let TA_keys = Object.keys(data);
    let TA_values = Object.values(data);
    const currentTime = dateTimeLocalToSeconds(getCurrentDateTime());
    const endOfDayTime = dateTimeLocalToSeconds(getCurrentDateTime().substring(0, 11) + '23:59');
    TA_values.forEach(item => {
        createTaskBarListItems(item)
    });
}

function createTaskBarListItems(item){
    console.log(item.isDone);
    if(item.reminders){
        item.reminders.forEach(reminderVal =>{
            let li = document.createElement('li');
            li.classList.add('upcoming-tasks-bar__item');
            li.classList.add('bar-item');

            const timeSpan = document.createElement('span');
            timeSpan.classList.add('bar-item__time');
            timeSpan.innerText = secondToLocaleTimeString(reminderVal);

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
        });
    } else {
        let li = document.createElement('li');
        li.classList.add('upcoming-tasks-bar__item');
        li.classList.add('bar-item');

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
    }
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
taskBarBtn.addEventListener('click', () => {
    if (taskBarBtnAction === 1) {
        taskBarBtn.classList.add('upcoming-tasks-bar__button__action');
        taskBar.classList.add('task-bar-open');
        taskBarBtnAction = 2;
    } else {
        taskBarBtn.classList.remove('upcoming-tasks-bar__button__action');
        taskBar.classList.remove('task-bar-open');
        taskBarBtnAction = 1;
    }
});