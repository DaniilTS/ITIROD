const leftRadioBtn = document.getElementById('creation-form__left-input');
const rightRadioBtn = document.getElementById('creation-form__right-input');
const addReminderBtn = document.getElementById('addReminderBtn');
const remindersList = document.getElementById('remindersList');
const createNewBtn = document.getElementById('createNewBtn');

leftRadioBtn.addEventListener('click', (e) => {
    rightRadioBtn.checked = false;
});

rightRadioBtn.addEventListener('click', (e) => {
    leftRadioBtn.checked = false;
});

addReminderBtn.addEventListener('click', (e) => {
    createReminder();
});

createNewBtn.addEventListener('click', (e) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const place = document.getElementById('place').value;
    const color = document.getElementById('color').value;

    const remindersCheckResult = checkRemindersInputs();
    if (title && description && start && end && color && remindersCheckResult.allInputsFilled) {
        const taskOrAppointment = leftRadioBtn.checked ? 'tasks' : 'appointments';

        const currentTimeInSeconds = dateTimeLocalToSeconds(getCurrentDateTime());
        const taskOrAppointmentDbRef =
            database.ref(`users/${auth.currentUser.uid}/${taskOrAppointment}/${currentTimeInSeconds}`);

        taskOrAppointmentDbRef.set({
            title: title,
            description: description,
            start: dateTimeLocalToSeconds(start),
            end: dateTimeLocalToSeconds(end),
            place: place,
            color: color,
            reminders: remindersCheckResult.reminders
        });

        if (taskOrAppointment === 'tasks') {
            taskOrAppointmentDbRef.update({
                isDone: false
            });
        }

        // setTimeout(RedirectTo('Main'), 1000);
    } else {
        alert('fill all inputs and reminders');
    }
});

function checkRemindersInputs() {
    const liList = remindersList.getElementsByTagName('li');
    const listLength = liList.length;
    let remindersArray = [];

    for (let i = 0; i < listLength; i++) {
        let reminderTime = liList[i].children[0].value;
        if (!reminderTime) {
            return {
                allInputsFilled: false
            };
        }
        remindersArray.push(dateTimeLocalToSeconds(reminderTime));
    }

    return {
        allInputsFilled: true,
        reminders: remindersArray
    };
}

function createDateTimeInput() {
    let dateTimeInput = document.createElement('input');
    dateTimeInput.setAttribute('class', 'creation-form__input reminder-input');
    dateTimeInput.type = 'datetime-local';
    dateTimeInput.value = Date();

    return dateTimeInput;
}

function createDeleteReminderBtn(reminder) {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'creation-form__button delete-button');
    btn.type = 'button';
    btn.innerText = 'Delete';
    btn.addEventListener('click', (e) => {
        remindersList.removeChild(reminder);
    });

    return btn;
}

function createReminder() {
    const reminder = document.createElement('li');
    reminder.setAttribute('class', 'reminders-list__item');

    const reminderInput = createDateTimeInput();
    const deleteReminderBtn = createDeleteReminderBtn(reminder);

    reminder.appendChild(reminderInput);
    reminder.appendChild(deleteReminderBtn);

    remindersList.appendChild(reminder);
}

function dateTimeLocalToSeconds(dateTimeValue) {
    return Math.round(new Date(dateTimeValue) / 1000).toString();
}

function getCurrentDateTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + getFullMonth() + '-' + getFullDate();

    let time = getFullHours() + ":" + getFullMinutes();
    return date + 'T' + time;
}

function getFullMonth(){
    let currentMonth = (new Date().getMonth() + 1).toString();
    return checkLength(currentMonth);
}

function getFullDate(){
    let currentDate = (new Date().getDate()).toString();
    return checkLength(currentDate);
}

function getFullHours(){
    let currentHours = (new Date().getHours()).toString();
    return checkLength(currentHours);
}

function getFullMinutes(){
    let currentMinutes = (new Date().getMinutes()).toString();
    return checkLength(currentMinutes);
}

function checkLength(value){
    if(value.length === 1){
        value = '0' + value;
    }
    return value;
}
