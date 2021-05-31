const leftRadioBtn = document.getElementById('creation-form__left-input');
const rightRadioBtn = document.getElementById('creation-form__right-input');
const addReminderBtn = document.getElementById('addReminderBtn');
const remindersList = document.getElementById('remindersList');
const createNewBtn = document.getElementById('createNewBtn');

createReminder();

leftRadioBtn.addEventListener('click', (e)=>{
   rightRadioBtn.checked = false;
});

rightRadioBtn.addEventListener('click', (e)=>{
    leftRadioBtn.checked = false;
});

addReminderBtn.addEventListener('click', (e)=>{
    createReminder();
});

createNewBtn.addEventListener('click', (e)=>{
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const place = document.getElementById('place').value;
    const color = document.getElementById('color').value;

    const checkResult = checkRemindersInputs();

    if(title && description && start && end && color && checkResult[0]){
        const taskOrAppointment = leftRadioBtn.checked ? 'tasks' : 'appointments';
        database.ref(`users/${auth.currentUser.uid}/${taskOrAppointment}`).set({
            title: title,
            description: description,
            start: start,
            end: end,
            place: place,
            color: color,
            reminders: checkResult[1]
        });
    } else {
        alert('fill all inputs and reminders');
    }
});

function checkRemindersInputs(){
    const liList = remindersList.getElementsByTagName('li');
    const listLength = liList.length;
    let remindersArray = [];

    for(let i = 0; i < listLength; i++){
        let reminder = liList[i].children[0].value;
        if(!reminder) {
            return [false, null];
        }
        remindersArray.push(reminder);
    }
    return [true, remindersArray];
}

function createDateTimeInput(){
    let dateTimeInput = document.createElement('input');
    dateTimeInput.setAttribute('class', 'creation-form__input reminder-input');
    dateTimeInput.type = 'datetime-local';
    dateTimeInput.value = Date();
    dateTimeInput.addEventListener('change', (e)=>{

    });

    return dateTimeInput;
}

function createDeleteReminderBtn(reminder){
    const btn = document.createElement('button');
    btn.setAttribute('class', 'creation-form__button delete-button');
    btn.type = 'button';
    btn.innerText = 'Delete';
    btn.addEventListener('click', (e)=>{
        remindersList.removeChild(reminder);
    });
    return btn;
}

function createReminder(){
    const reminder = document.createElement('li');
    reminder.setAttribute('class', 'reminders-list__item');

    const reminderInput = createDateTimeInput();
    const deleteReminderBtn = createDeleteReminderBtn(reminder);

    reminder.appendChild(reminderInput);
    reminder.appendChild(deleteReminderBtn);

    remindersList.appendChild(reminder);
}
