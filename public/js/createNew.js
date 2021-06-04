createNewBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const place = document.getElementById('place').value;
    const color = document.getElementById('color').value;

    const remindersCheckResult = checkRemindersInputs();
    if (checkInputs([title, description, start, end, color]) && remindersCheckResult.allInputsFilled) {

        const currentTimeInSeconds = dateTimeLocalToSeconds(getCurrentDateTime());
        const taskOrAppointmentDbRef =
            database.ref(`users/${auth.currentUser.uid}/tasks|appointments/${currentTimeInSeconds}`);

        taskOrAppointmentDbRef.set({
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
    } else {
        alert('fill all inputs and reminders');
    }
});


