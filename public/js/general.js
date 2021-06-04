"use strict"

let firebaseConfig = {
    apiKey: "AIzaSyCyA7o_CrfUjvxVD9pkPyLaGKOrdWTOKSw",
    authDomain: "remindme-calendar-f4e5b.firebaseapp.com",
    projectId: "remindme-calendar-f4e5b",
    storageBucket: "remindme-calendar-f4e5b.appspot.com",
    messagingSenderId: "543928970050",
    appId: "1:543928970050:web:c094f81cbb1482f289b6db",
    measurementId: "G-MVJG3GXLDW"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
    } else {
        checkUserIsOnAllowedPage();
    }
});

function redirectTo(path) {
    window.location.href = `${path}.html`;
}

function checkUserIsOnAllowedPage() {
    const currentURL = window.location.href;
    const clearURL = currentURL.substring(0, currentURL.indexOf('.html'));
    const currentPage = clearURL.substring(clearURL.lastIndexOf('/') + 1);

    fetch("js/config.json")
        .then(response => response.json())
        .then(function (json){
            if(!json.noAuthPages.includes(currentPage)){
                setTimeout(() => redirectTo(json.noAuthRedirectPage), 1000);
            }
        });
}

function dateTimeLocalToSeconds(dateTimeValue) {
    return Math.round(new Date(dateTimeValue) / 1000).toString();
}

function formatDateTime(input){
    let epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    let date = epoch.toISOString();
    return date.split('.')[0].split(' ')[0] + ' ' + epoch.toLocaleTimeString().split(' ')[0];
}

function getCurrentDateTime() {
    let date = new Date().getFullYear() + '-' + getFullMonth() + '-' + getFullDate();
    let time = getFullHours() + ":" + getFullMinutes();
    return date + 'T' + time;
}

function getFullMonth() {
    let currentMonth = (new Date().getMonth() + 1).toString();
    return checkLength(currentMonth);
}

function getFullDate() {
    let currentDate = (new Date().getDate()).toString();
    return checkLength(currentDate);
}

function getFullHours() {
    let currentHours = (new Date().getHours()).toString();
    return checkLength(currentHours);
}

function getFullMinutes() {
    let currentMinutes = (new Date().getMinutes()).toString();
    return checkLength(currentMinutes);
}

function checkLength(value) {
    if (value.length === 1) {
        value = '0' + value;
    }
    return value;
}
