document.getElementById('logOutBtn').addEventListener('click', (e) => {
    auth.signOut();
    RedirectTo('Login');
});