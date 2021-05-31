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

});

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
        if(remindersList.getElementsByTagName('li').length > 1) {
            remindersList.removeChild(reminder);
        } else {
            alert("you can't delete last remainder.");
        }
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
