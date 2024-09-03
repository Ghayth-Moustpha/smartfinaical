
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        const navItems = document.getElementById('nav-items');
        if (navItems) {
            navItems.classList.toggle('show');
        }
    });
}
