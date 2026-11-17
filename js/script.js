/* =========================================================
   SCRIPT.JS — поведение общих блоков
   ========================================================= */

/* Хелпер: нормализация и валидация телефона (вынесен наружу) */
function normalizePhone(raw) {
    const digits = raw.replace(/\D/g, ''); // оставляем только цифры

    // 11 цифр: 7XXXXXXXXXX или 8XXXXXXXXXX
    if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
        return '+7' + digits.slice(1);
    }
    // 10 цифр: XXXXXXXXXX (без кода страны)
    if (digits.length === 10) {
        return '+7' + digits;
    }
    return null; // невалидно
}

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
    document.body.insertAdjacentHTML('beforeend', mapModalHtml);

    const mapModal = document.getElementById('mapModal');
    const closeMapBtn = document.getElementById('closeMapBtn');

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.js-address-link');
        if (!link) return;
        e.preventDefault();
        if (burgerOverlay) {
            burgerOverlay.classList.remove('open');
            burgerToggle && burgerToggle.classList.remove('active');
        }
        if (mapModal) mapModal.classList.add('open');
    });

    if (closeMapBtn && mapModal) {
        closeMapBtn.addEventListener('click', () => mapModal.classList.remove('open'));
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) mapModal.classList.remove('open');
        });
    }

    /* ==================== 5. ОТПРАВКА ФОРМЫ ==================== */
    const form = document.getElementById('leadForm');

    if (form) {
        // Надёжный доступ к полям (form.name — это свойство самой формы!)
        const nameInput    = form.elements.name;
        const phoneInput   = form.elements.phone;
        const messageInput = form.elements.message;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const msg = document.getElementById('formMessage');
            const submitBtn = form.querySelector('button[type="submit"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const phoneRaw = phoneInput ? phoneInput.value.trim() : '';

            // Ищем селект (главная) или скрытое поле (услуги)
            const serviceSelect = document.getElementById('serviceSelect');
            const serviceHidden = document.getElementById('serviceHidden');

            let serviceValue = serviceSelect
                ? serviceSelect.value
                : (serviceHidden ? serviceHidden.value : '');

            // ---- Валидация имени ----
            if (!name) {
                msg.textContent = 'Укажите имя';
                msg.className = 'form-message error';
                nameInput && nameInput.focus();
                return;
            }
            if (name.length < 2) {
                msg.textContent = 'Имя слишком короткое';
                msg.className = 'form-message error';
                nameInput && nameInput.focus();
                return;
            }

            // ---- Валидация услуги ----
            if (serviceSelect && !serviceValue) {
                msg.textContent = 'Пожалуйста, выберите услугу';
                msg.className = 'form-message error';
                return;
            }

            // ---- Валидация телефона ----
            if (!phoneRaw) {
                msg.textContent = 'Укажите номер телефона';
                msg.className = 'form-message error';
                phoneInput && phoneInput.focus();
                return;
            }

            // Разрешаем только цифры, +, пробел, (, ), -
            if (!/^[+\d\s()\-]+$/.test(phoneRaw)) {
                msg.textContent = 'Телефон может содержать только цифры, +, пробелы, скобки и дефис';
                msg.className = 'form-message error';
                phoneInput && phoneInput.focus();
                return;
            }

            const phone = normalizePhone(phoneRaw);
            if (!phone) {
                msg.textContent = 'Некорректный номер. Пример: +7 (999) 123-45-67';
                msg.className = 'form-message error';
                phoneInput && phoneInput.focus();
                return;
            }

            // ---- Отправка ----
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            msg.textContent = '';
            msg.className = 'form-message';

            try {
                const workerUrl = 'https://bgt-form-handler.magd6660545.workers.dev/';

                const response = await fetch(workerUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        phone: phone, // нормализованный номер
                        service: serviceValue,
                        message: messageInput ? messageInput.value.trim() : ''
                    })
                });

                const result = await response.json();

                if (result.success) {
                    msg.textContent = 'Спасибо! Заявка отправлена.';
                    msg.className = 'form-message success';
                    form.reset();
                    if (phoneInput) phoneInput.classList.remove('invalid');
                    if (nameInput) nameInput.classList.remove('invalid');
                } else {
                    throw new Error(result.error || 'Ошибка сервера');
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
                msg.textContent = 'Ошибка отправки. Попробуйте позже или позвоните нам.';
                msg.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
            }
        });

        // ---- Live-валидация телефона ----
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                const raw = phoneInput.value.trim();
                if (!raw) return;
                phoneInput.classList.toggle('invalid', !normalizePhone(raw));
            });

            phoneInput.addEventListener('input', () => {
                phoneInput.classList.remove('invalid');
            });
        }
    }
});
