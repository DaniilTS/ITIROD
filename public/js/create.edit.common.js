const leftRadioBtn = document.getElementById('creation-form__left-input');
const rightRadioBtn = document.getElementById('creation-form__right-input');
const addReminderBtn = document.getElementById('addReminderBtn');
const remindersList = document.getElementById('remindersList');
const createNewBtn = document.getElementById('createNewBtn');
const closeBtn = document.getElementById('closeBtn');

leftRadioBtn.addEventListener('click', () => {
    rightRadioBtn.checked = false;
});

rightRadioBtn.addEventListener('click', () => {
    leftRadioBtn.checked = false;
});

addReminderBtn.addEventListener('click', () => {
    createReminder('');
});

closeBtn.addEventListener('click', () => {
    localStorage.setItem('selectedElementId', '')
    redirectTo('Main');
});

function checkInputs(inputs){
    for (let i = 0; i < inputs.length; i++){
        if(!inputs[i]){
            return false
        }
    }
    return true;
}

function checkRemindersInputs(start, end) {
    const liList = remindersList.getElementsByTagName('li');
    const listLength = liList.length;
    let remindersArray = [];

    for (let i = 0; i < listLength; i++) {
        let reminderTime = liList[i].children[0].value;
        if (!reminderTime || reminderTime < start || reminderTime > end) {
            return {
                allInputsFilledAndCorrect: false
            };
        }
        remindersArray.push(reminderTime);
    }

    return {
        allInputsFilledAndCorrect: true,
        reminders: remindersArray
    };
}

function createDateTimeInput(val) {
    let dateTimeInput = document.createElement('input');
    dateTimeInput.setAttribute('class', 'creation-form__input reminder-input');
    dateTimeInput.type = 'datetime-local';
    dateTimeInput.value = val;

    return dateTimeInput;
}

function createReminderDeleteBtn(reminder) {
    const btn = document.createElement('button');
    btn.setAttribute('class', 'creation-form__button delete-button');
    btn.type = 'button';
    btn.innerText = 'Delete';
    btn.addEventListener('click', () => {
        remindersList.removeChild(reminder);
    });

    return btn;
}

function createReminder(val) {
    const reminder = document.createElement('li');
    reminder.setAttribute('class', 'reminders-list__item');

    const reminderInput = createDateTimeInput(val);
    const deleteReminderBtn = createReminderDeleteBtn(reminder);

    reminder.appendChild(reminderInput);
    reminder.appendChild(deleteReminderBtn);

    remindersList.appendChild(reminder);
}