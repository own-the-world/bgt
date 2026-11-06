/* =========================================================
   SCRIPT.JS — поведение общих блоков
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. FAB (Делегирование) ==================== */
    // Слушаем клики по всему документу
    document.body.addEventListener('click', (e) => {
        const fabToggle = e.target.closest('#fabToggle');
        const fabMenu = document.getElementById('fabMenu');
        const isInsideFab = e.target.closest('.fab-wrapper');

        // Если кликнули на главную кнопку FAB
        if (fabToggle) {
            e.preventDefault();
            e.stopPropagation();
            fabMenu.classList.toggle('open');
            return;
        }

        // Если кликнули на ссылку внутри FAB
        if (e.target.closest('.fab-btn')) {
            fabMenu.classList.remove('open');
        }

        // Если меню открыто и кликнули вне его
        if (fabMenu && fabMenu.classList.contains('open') && !isInsideFab) {
            fabMenu.classList.remove('open');
        }
    });

    /* ==================== 2. КНОПКА "НАВЕРХ" ==================== */
    // Обработчик скролла
    window.addEventListener('scroll', () => {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    // Клик по кнопке наверх
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#scrollTopBtn')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    /* ==================== 3. БУРГЕР ==================== */
    document.body.addEventListener('click', (e) => {
        const burgerToggle = e.target.closest('#burgerToggle');
        const burgerOverlay = document.getElementById('burgerOverlay');

        // Открытие/закрытие бургера
        if (burgerToggle) {
            e.preventDefault();
            burgerOverlay.classList.toggle('open');
            burgerToggle.classList.toggle('active');
            return;
        }

        // Закрытие при клике на оверлей (фон)
        if (burgerOverlay && e.target === burgerOverlay) {
            burgerOverlay.classList.remove('open');
            document.getElementById('burgerToggle').classList.remove('active');
        }

        // Закрытие при клике на любую ссылку внутри бургера
        if (e.target.closest('.burger-menu-panel a')) {
            burgerOverlay.classList.remove('open');
            document.getElementById('burgerToggle').classList.remove('active');
        }
    });

    /* ==================== 4. МОДАЛКА КАРТ ==================== */
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
        </div>`;
    
    if (!document.getElementById('mapModal')) {
        document.body.insertAdjacentHTML('beforeend', mapModalHtml);
    }

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.js-address-link');
        if (link) {
            e.preventDefault();
            const burgerOverlay = document.getElementById('burgerOverlay');
            if (burgerOverlay) {
                burgerOverlay.classList.remove('open');
                const burgerBtn = document.getElementById('burgerToggle');
                if (burgerBtn) burgerBtn.classList.remove('active');
            }
            const mapModal = document.getElementById('mapModal');
            if (mapModal) mapModal.classList.add('open');
            return;
        }

        if (e.target.closest('#closeMapBtn') || e.target.id === 'mapModal') {
            const mapModal = document.getElementById('mapModal');
            if (mapModal) mapModal.classList.remove('open');
        }
    });

    /* ==================== 5. ОТПРАВКА ФОРМЫ ==================== */
    document.body.addEventListener('submit', (e) => {
        if (e.target && e.target.id === 'leadForm') {
            e.preventDefault();
            const form = e.target;
            const msg = document.getElementById('formMessage');
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();

            if (!name || !phone) {
                msg.textContent = 'Заполните имя и телефон';
                msg.className = 'form-message error';
                return;
            }

            const serviceSelect = form.querySelector('select[name="service"]:not([disabled])');
            if (serviceSelect && !serviceSelect.value) {
                msg.textContent = 'Выберите услугу';
                msg.className = 'form-message error';
                return;
            }

            const serviceValue = serviceSelect
                ? serviceSelect.value
                : (form.querySelector('input[name="service"]')?.value || '');
            
            console.log('Отправка заявки:', { name, phone, service: serviceValue });

            msg.textContent = 'Спасибо! Заявка отправлена.';
            msg.className = 'form-message success';
            form.reset();
        }
    });
});
