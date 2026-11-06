/* =========================================================
   SCRIPT.JS — поведение общих блоков
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. FAB ==================== */
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

        fabMenu.querySelectorAll('.fab-btn').forEach(btn => {
            btn.addEventListener('click', () => fabMenu.classList.remove('open'));
        });
    }

    /* ==================== 2. КНОПКА "НАВЕРХ" ==================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==================== 3. БУРГЕР ==================== */
    const burgerToggle = document.getElementById('burgerToggle');
    const burgerOverlay = document.getElementById('burgerOverlay');

    if (burgerToggle && burgerOverlay) {
        burgerToggle.addEventListener('click', () => {
            burgerOverlay.classList.toggle('open');
            burgerToggle.classList.toggle('active');
        });

        burgerOverlay.addEventListener('click', (e) => {
            if (e.target === burgerOverlay) {
                burgerOverlay.classList.remove('open');
                burgerToggle.classList.remove('active');
            }
        });

        burgerOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerOverlay.classList.remove('open');
                burgerToggle.classList.remove('active');
            });
        });
    }

    /* ==================== 4. МОДАЛКА КАРТ (делегирование) ==================== */
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
    document.body.insertAdjacentHTML('beforeend', mapModalHtml);

    const mapModal = document.getElementById('mapModal');
    const closeMapBtn = document.getElementById('closeMapBtn');

    /* Делегирование: работает для ВСЕХ ссылок с классом .js-address-link */
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.js-address-link');
        if (!link) return;
        e.preventDefault();
        if (burgerOverlay) {
            burgerOverlay.classList.remove('open');
            burgerToggle && burgerToggle.classList.remove('active');
        }
        mapModal.classList.add('open');
    });

    closeMapBtn.addEventListener('click', () => mapModal.classList.remove('open'));
    mapModal.addEventListener('click', (e) => {
        if (e.target === mapModal) mapModal.classList.remove('open');
    });

    /* ==================== 5. ОТПРАВКА ФОРМЫ ==================== */
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('formMessage');
            const name = form.name.value.trim();
            const phone = form.phone.value.trim();

            if (!name || !phone) {
                msg.textContent = 'Заполните имя и телефон';
                msg.className = 'form-message error';
                return;
            }

            // Проверка выбора услуги (только на главной, где select активен)
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

            /* Здесь — ваш способ отправки (Telegram Bot API, fetch и т.п.) */
            msg.textContent = 'Спасибо! Заявка отправлена.';
            msg.className = 'form-message success';
            form.reset();
        });
    }
});
