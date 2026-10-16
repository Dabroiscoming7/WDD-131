let themeToggle = document.querySelector('#theme-toggle');
let pageContent = document.querySelector('body');
let logoImg = document.querySelector('img');

themeToggle.addEventListener('change', changeTheme);

function changeTheme() {
    if (themeToggle.value === 'dark') {
        pageContent.classList.add('dark-mode');
        logoImg.src = "images/byui-logo-white.png";
    } else {
        pageContent.classList.remove('dark-mode');
        logoImg.src = "images/byui-logo-blue.jpg";
    }
}
