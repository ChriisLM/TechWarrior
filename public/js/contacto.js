//Menu del perfil
function toggleMenu() {
    var menu = document.getElementById('opcionesMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

//Menu hamburguesa
function toggleMenuHamburguesa() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.classList.toggle('open');
    const menuItems = document.querySelectorAll('.nav-container .ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navContainer.classList.remove('open');
        });
    });
}
