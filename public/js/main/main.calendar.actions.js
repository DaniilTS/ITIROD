const calendarViewsBtnList = document.querySelectorAll('button.calendar-views__button');
const createNewBtn = document.getElementById('createNewBtn');
const body = document.getElementById('body');

selectedViewIndex = {
    aInternal: 10,
    aListener: function(val) {},
    set value(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get value() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}

selectedViewIndex.value = 1;

selectedViewIndex.registerListener(function (val){
    document.getElementById('middleTag').remove();
    const controlBlock = document.getElementById('viewControlBlock');
    const prevElButton = document.getElementById('previousElement'),
        prevClone = prevElButton.cloneNode(true);
    const nextElButton = document.getElementById('nextElement'),
        nextClone = nextElButton.cloneNode(true);

    prevElButton.parentNode.replaceChild(prevClone, prevElButton);
    nextElButton.parentNode.replaceChild(nextClone, nextElButton);

    if(val === 0){ buildYearElements(controlBlock);}
    else if(val === 1) { buildMonthElements(controlBlock); }
    else { buildWeekElements(controlBlock); }
});

function buildYearElements(controlBlock){
    let div = document.createElement('div');
    div.id = 'middleTag';
    div.classList.add('view-control__middle-tag');

    let span = document.createElement('span');
    span.innerText = currentYear.toString();

    div.appendChild(span);
    controlBlock.insertBefore(div, controlBlock.childNodes[2]);

    document.getElementById('previousElement').addEventListener('click', () => {
        subtractInSpan('middleTag');
        currentYear--;
    });

    document.getElementById('nextElement').addEventListener('click', () => {
        addInSpan('middleTag');
        currentYear++;
    });
}

function buildMonthElements(controlBlock){
    let select = document.createElement('select');
    select.id = 'middleTag';
    select.classList.add('view-control__middle-tag');
    select.addEventListener('change', () => { recountMonthDays(currentYear); });

    months.forEach(month => {
        const option = document.createElement('option');
        option.textContent = month;
        select.appendChild(option);
    });

    controlBlock.insertBefore(select, controlBlock.childNodes[2]);

    document.getElementById('previousElement').addEventListener('click', subtractMonth);
    document.getElementById('nextElement').addEventListener('click', addMonth);
}

function buildWeekElements(controlBlock){
    let div = document.createElement('div');
    div.id = 'middleTag';
    div.classList.add('view-control__middle-tag');

    let span = document.createElement('span');
    span.innerText = '0';

    div.appendChild(span);
    controlBlock.insertBefore(div, controlBlock.childNodes[2]);

    document.getElementById('previousElement').addEventListener('click', () => subtractInSpan('middleTag'));
    document.getElementById('nextElement').addEventListener('click', () => addInSpan('middleTag'));
}

setCurrentMonth();
setViewButtonsActions();

function setCurrentMonth() {
    const currentMonth = new Date().getMonth();
    document.getElementById('middleTag')[currentMonth].selected = true;
}

function setViewButtonsActions() {
    for (let i = 0; i < calendarViewsBtnList.length; i++) {
        let btn = calendarViewsBtnList[i];
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('calendar-views__button_focused')) {
                btn.classList.add('calendar-views__button_focused');
                calendarViewsBtnList[selectedViewIndex.value].classList.remove('calendar-views__button_focused');
                selectedViewIndex.value = i;
            }
        })
    }
}

createNewBtn.addEventListener('click', () => {
    redirectTo('CreateNew');
});
document.getElementById('nextElement').addEventListener('click', addMonth, false);
document.getElementById('previousElement').addEventListener('click', subtractMonth, false);
document.getElementById('logOutBtn').addEventListener('click', () => {
    auth.signOut();
});
document.getElementById('middleTag').addEventListener('click', () => {
    recountMonthDays(currentYear);
});

function addMonth() {
    const monthSelect = document.getElementById('middleTag');
    if (monthSelect.selectedIndex !== 11) {
        monthSelect.selectedIndex += 1;
    } else {
        monthSelect.selectedIndex = 0;
        currentYear++;
    }
    recountMonthDays(currentYear);
}
function subtractMonth() {
    const monthSelect = document.getElementById('middleTag');
    if (monthSelect.selectedIndex !== 0) {
        monthSelect.selectedIndex -= 1;
    } else {
        monthSelect.selectedIndex = 11;
        currentYear--;
    }
    recountMonthDays(currentYear);
}

function addInSpan(id){
    const span = document.getElementById(id).innerText;
    document.getElementById(id).innerText = (parseInt(span) + 1).toString();
}
function subtractInSpan(id){
    const span = document.getElementById(id).innerText;
    document.getElementById(id).innerText = (parseInt(span) - 1).toString();
}


