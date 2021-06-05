document.getElementById('logInBtn').addEventListener('click', ()=>{
   redirectTo('LogIn');
});

document.getElementById('signUpBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const birthdayDate = document.getElementById('birthdayDate').value;

    console.log(password);
    if(email && username && password && birthdayDate){
        signUpUser(email, username, password, birthdayDate);
    } else {
        alert('Fill all inputs.');
    }
});

function signUpUser(email, password, username, birthdayDate){
    auth.createUserWithEmailAndPassword(email, password)
        .then(function (data){
            database.ref('users/' + data.user.uid).set({
                username: username,
                email: email,
                birthdayDate: birthdayDate
            }).then(function (){
                setTimeout(() => redirectTo('Main'), 1000);
            });
        })
        .catch(e => console.log(e.message));
}