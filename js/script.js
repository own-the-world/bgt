document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== 1. ПЛАВАЮЩЕЕ МЕНЮ СВЯЗИ (FAB ВНИЗУ СПРАВА) ====================
    const fabMenu = document.getElementById('fabMenu');
    const fabToggle = document.getElementById('fabToggle');

    if (fabToggle && fabMenu) {
        fabToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            fabMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (fabMenu.classList.contains('open') && !fabMenu.contains(e.target)) {
                fabMenu.classList.remove('open');
            }
        });

        const fabBtns = fabMenu.querySelectorAll('.fab-btn');
        fabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                fabMenu.classList.remove('open');
            });
        });
    }

    // ==================== 2. КНОПКА "НАВЕРХ" ====================
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== 3. ВЕРХНИЙ БУРГЕР И МЕНЮ ====================
    const burgerToggle = document.getElementById('burgerToggle');
    const burgerOverlay = document.getElementById('burgerOverlay');
    const addressLink = document.getElementById('addressLink');

    if (burgerToggle && burgerOverlay) {
        // Открытие/закрытие по клику на бургер
        burgerToggle.addEventListener('click', () => {
            burgerOverlay.classList.toggle('open');
            burgerToggle.classList.toggle('active');
        });

        // Закрытие по клику на оверлей (вне панели)
        burgerOverlay.addEventListener('click', (e) => {
            if (e.target === burgerOverlay) {
                burgerOverlay.classList.remove('open');
                burgerToggle.classList.remove('active');
            }
        });

        // Закрытие при клике на любую ссылку в меню
        const navLinks = burgerOverlay.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerOverlay.classList.remove('open');
                burgerToggle.classList.remove('active');
            });
        });
    }

    // ==================== 4. ВЫБОР КАРТ ДЛЯ АДРЕСА ====================
    if (addressLink) {
        const mapModalHtml = `
            <div class="map-modal-overlay" id="mapModal">
                <div class="map-modal-content">
                    <h3>Открыть адрес в:</h3>
                    <div class="map-buttons">
                        <a href="https://yandex.ru/maps/?text=Владивосток,%20улица%20Волнистая,%2012" target="_blank" rel="noopener" class="map-btn">Яндекс Карты</a>
                        <a href="https://2gis.ru/vladivostok/geo/70030076984894836/131.944335%2C43.156838?m=131.945686%2C43.15699%2F16.78&immersive=on" target="_blank" rel="noopener" class="map-btn">2ГИС</a>
                        <a href="https://www.google.com/maps/search/?api=1&query=Владивосток,+улица+Волнистая,+12" target="_blank" rel="noopener" class="map-btn">Google Карты</a>
                        <button class="map-btn close-map" id="closeMapBtn">Отмена</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mapModalHtml);

        const mapModal = document.getElementById('mapModal');
        const closeMapBtn = document.getElementById('closeMapBtn');

        addressLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (burgerOverlay) {
                burgerOverlay.classList.remove('open');
                burgerToggle.classList.remove('active');
            }
            mapModal.classList.add('open');
        });

        closeMapBtn.addEventListener('click', () => {
            mapModal.classList.remove('open');
        });

        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) {
                mapModal.classList.remove('open');
            }
        });
    }

    // ==================== 5. ВИДЕОГАЛЕРЕЯ (GLIGHTBOX) ====================
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            plyr: {
                config: {
                    ratio: '16:9',
                    hideControls: false,
                    youtube: {
                        noCookie: true,
                        rel: 0,
                        showinfo: 0
                    }
                }
            }
        });
    }

});
