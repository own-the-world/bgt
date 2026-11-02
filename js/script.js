// ==================== МОБИЛЬНОЕ МЕНЮ (БУРГЕР) ====================
const burgerToggle = document.getElementById('burgerToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (burgerToggle && mobileMenu) {
    burgerToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            !burgerToggle.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });
}

// ==================== КНОПКА "НАВЕРХ" ====================
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    // Отслеживаем прокрутку страницы
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Плавный скролл наверх при клике
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== ПЛАВАЮЩЕЕ МЕНЮ (FAB) ====================
const fabMenu = document.getElementById('fabMenu');
const fabToggle = document.getElementById('fabToggle');

if (fabToggle && fabMenu) {
    fabToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        fabMenu.classList.toggle('open');
    });

    // Закрываем меню при клике вне его области
    document.addEventListener('click', (e) => {
        if (fabMenu.classList.contains('open') && !fabMenu.contains(e.target)) {
            fabMenu.classList.remove('open');
        }
    });
}
