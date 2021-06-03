const logOutBtn = document.getElementById('logOutBtn');
const leftRadioBtn = document.getElementById('creation-form__left-input');
const rightRadioBtn = document.getElementById('creation-form__right-input');
const addReminderBtn = document.getElementById('addReminderBtn');
const remindersList = document.getElementById('remindersList');
const createNewBtn = document.getElementById('createNewBtn');

logOutBtn.addEventListener('click', () => {
    auth.signOut();
});

leftRadioBtn.addEventListener('click', () => {
    rightRadioBtn.checked = false;
});

rightRadioBtn.addEventListener('click', () => {
    leftRadioBtn.checked = false;
});

addReminderBtn.addEventListener('click', () => {
    createReminder();
});

createNewBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const place = document.getElementById('place').value;
    const color = document.getElementById('color').value;

    const remindersCheckResult = checkRemindersInputs();
    if (title && description && start && end && color && remindersCheckResult.allInputsFilled) {

        const currentTimeInSeconds = dateTimeLocalToSeconds(getCurrentDateTime());
        const taskOrAppointmentDbRef =
            database.ref(`users/${auth.currentUser.uid}/tasks|appointments/${currentTimeInSeconds}`);

        taskOrAppointmentDbRef.set({
            title: title,
            description: description,
            start: dateTimeLocalToSeconds(start),
            end: dateTimeLocalToSeconds(end),
            place: place,
            color: color,
            reminders: remindersCheckResult.reminders
        });

        if (leftRadioBtn.checked) {
            taskOrAppointmentDbRef.update({
                isDone: false
            });
        }

        setTimeout(() => redirectTo('Main'), 1000);
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

function createReminder() {
    const reminder = document.createElement('li');
    reminder.setAttribute('class', 'reminders-list__item');

    const reminderInput = createDateTimeInput();
    const deleteReminderBtn = createReminderDeleteBtn(reminder);

    reminder.appendChild(reminderInput);
    reminder.appendChild(deleteReminderBtn);

    remindersList.appendChild(reminder);
}


