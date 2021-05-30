document.getElementById('logInBtn').addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(email && password){
        auth.signInWithEmailAndPassword(email, password);
    } else {
        alert('Fill all inputs.');
    }
});