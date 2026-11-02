document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== ПЛАВАЮЩЕЕ МЕНЮ (FAB) ====================
    const fabMenu = document.getElementById('fabMenu');
    const fabToggle = document.getElementById('fabToggle');

    if (fabToggle && fabMenu) {
        // Открытие/закрытие по клику на главную кнопку
        fabToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            fabMenu.classList.toggle('open');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (fabMenu.classList.contains('open') && !fabMenu.contains(e.target)) {
                fabMenu.classList.remove('open');
            }
        });

        // Закрытие при клике на любую кнопку внутри меню (чтобы меню не оставалось висеть после перехода)
        const fabBtns = fabMenu.querySelectorAll('.fab-btn');
        fabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                fabMenu.classList.remove('open');
            });
        });
    }

    // ==================== КНОПКА "НАВЕРХ" ====================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
