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
        isOnAllowedPages();
        console.log(user);
    }
});

function RedirectTo(path) {
    window.location.href = `${path}.html`
}

function isOnAllowedPages() {
    const currentURL = window.location.href;
    const clearURL = currentURL.substring(0, currentURL.indexOf('.html'));
    const currentPage = clearURL.substring(clearURL.lastIndexOf('/') + 1);

    fetch("js/config.json")
        .then(response => response.json())
        .then(function (json){
            if(!json.noAuthPages.includes(currentPage)){
                RedirectTo(json.noAuthRedirectPage);
            }
        });
}
