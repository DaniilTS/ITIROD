document.getElementById('logOutBtn').addEventListener('click', (e) => {
    auth.signOut();
    RedirectTo('Login');
});

document.getElementById('createNewBtn').addEventListener('click', (e)=>{
    RedirectTo('CreateNew');
});