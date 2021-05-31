document.getElementById('logInBtn').addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email && password){
        auth.signInWithEmailAndPassword(email, password)
        .then(function (){
            setTimeout(RedirectTo('Main'), 1000);
        }).catch(e => console.log(e.message));

    } else {
        alert('Fill all inputs.');
    }
});

