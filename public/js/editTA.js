const selectedElementId = localStorage.getItem('selectedElementId');
const title = document.getElementById('title');
const description = document.getElementById('description');
const start = document.getElementById('start');
const end = document.getElementById('end');
const place = document.getElementById('place');
const color = document.getElementById('color');

setTimeout(function (){
    const taskOrAppointmentDbRef =
        database.ref(`users/${auth.currentUser.uid}/tasks|appointments/${selectedElementId}`);

    taskOrAppointmentDbRef.on('value', (snapshot) => {
        fillForm(snapshot.val());
    });

    document.getElementById('updateBtn').addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const place = document.getElementById('place').value;
        const color = document.getElementById('color').value;

        const remindersCheckResult = checkRemindersInputs();
        if (checkInputs([title, description, start, end, color]) && remindersCheckResult.allInputsFilled) {
            taskOrAppointmentDbRef.update({
                title: title,
                description: description,
                start: start,
                end: end,
                place: place,
                color: color,
                isDone: leftRadioBtn.checked ? false : '',
                reminders: remindersCheckResult.reminders
            });

            setTimeout(() => redirectTo('Main'), 1000);
        }
    });
}, 500)

function fillForm(object){
    setRadioButtons(object);
    setInputs(object);
    setReminders(object);
}

function setReminders(object){
    if(object.reminders){
        object.reminders.forEach(reminder => {
           createReminder(reminder)
        });
    }
}

function setInputs(object){
    console.log(object);
    title.value = object.title;
    description.value = object.description;
    start.value = object.start;
    end.value = object.end;
    place.value = object.place;
    color.value = object.color;
}

function setRadioButtons(object){
    if(object.isDone === false){
        setRadioButtonsValue(true, false);
    } else {
        setRadioButtonsValue(false, true);
    }
}

function setRadioButtonsValue(val1, val2){
    leftRadioBtn.checked = val1;
    rightRadioBtn.checked = val2;
}


