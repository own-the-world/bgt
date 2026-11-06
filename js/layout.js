/* =========================================================
   LAYOUT.JS — общие блоки для всех страниц
   Инжектит шапку, бургер-меню, FAB, форму, футер.
   ========================================================= */

(function () {
    'use strict';

    const PHONE = '+79024833907';
    const PHONE_DISPLAY = '8 902 483-39-07';
    const ADDRESS_SHORT = 'г. Владивосток, ул.<br>Волнистая 12';
    const ADDRESS_FULL = 'г. Владивосток, ул. Волнистая 12';
    const SCHEDULE = 'Работаем с 10:00 до 18:00';

    /* ---------- СПИСОК УСЛУГ ---------- */
    const SERVICES_LIST = [
        'Русификация автомобилей',
        'Установка видеорегистраторов',
        'Установка систем кругового обзора 360 Bird View',
        'Установка системы контроля слепых зон',
        'Расширенный CarPlay в любой авто',
        'Установка и подбор акустических систем',
        'Подключение дополнительных камер к штатным мониторам',
        'Установка Apple TV на штатный монитор',
        'Установка систем защиты от угона',
        'Автоматические доводчики дверей',
        'Выдвижные электро пороги',
        'Ambient Light — подсветка салона',
        'Установка комплексной шумоизоляции',
        'Установка дополнительных мониторов',
        'Установка системы «Звёздное небо»',
        'Мониторы для задних пассажиров',
        'Оригинальное дооснащение BMW',
        'Топливный и масляный корректор',
        'Другая услуга'
    ];

    /* ---------- ШАПКА ---------- */
    function headerHTML() {
        return `
        <div class="container header-container">
            <div class="header-logo">
                <a href="index.html">
                    <img src="images/BGT_logo.png" alt="BGT - Автоэлектрик" class="logo-img">
                </a>
            </div>
            <div class="header-address">
                <a href="#" class="js-address-link">${ADDRESS_SHORT}</a>
            </div>
            <div class="header-contacts">
                <a href="tel:${PHONE}" class="header-phone">${PHONE_DISPLAY}</a>
                <span class="header-schedule">${SCHEDULE}</span>
            </div>
        </div>`;
    }

    /* ---------- БУРГЕР ---------- */
    function burgerHTML() {
        return `
        <button class="floating-burger" id="burgerToggle" aria-label="Открыть меню">
            <span></span><span></span><span></span>
        </button>
        <div class="burger-menu-overlay" id="burgerOverlay">
            <div class="burger-menu-panel">
                <ul class="burger-nav-list">
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="#">Преимущества</a></li>
                    <li><a href="#">Наши работы</a></li>
                    <li><a href="#">Наши услуги</a></li>
                    <li><a href="#">Наши соцсети</a></li>
                    <li class="burger-address-item">
                        <a href="#" class="js-address-link">${ADDRESS_FULL}</a>
                    </li>
                    <li><a href="#">Отзывы знаменитостей</a></li>
                    <li><a href="#contact-form">Оставить заявку</a></li>
                    <li><a href="#">Блог</a></li>
                </ul>
            </div>
        </div>`;
    }

    /* ---------- FAB (мессенджеры) ---------- */
    function fabHTML() {
        return `
        <div class="fab-wrapper" id="fabMenu">
            <div class="fab-actions">
                
                <!-- WhatsApp (зеленая иконка) -->
                <a href="https://wa.me/79024833907" target="_blank" rel="noopener" class="fab-btn" title="WhatsApp">
                    <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp">
                </a>
                
                <!-- Telegram (голубая иконка) -->
                <a href="https://t.me/+79024833907" target="_blank" rel="noopener" class="fab-btn" title="Telegram">
                    <img src="https://cdn.simpleicons.org/telegram/26A5E4" alt="Telegram">
                </a>
                
                <!-- MAX (фиолетовая иконка, как на скриншоте) -->
                <a href="https://max.ru/+79024833907" target="_blank" rel="noopener" class="fab-btn" title="MAX">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Max_messenger_logo.svg" alt="MAX" style="background: #7B1FA2; padding: 6px; border-radius: 50%;">
                </a>

                <!-- Кнопка Позвонить -->
                <a href="tel:${PHONE}" class="fab-btn" title="Позвонить">
                    <div style="background: #ef4444; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                    </div>
                </a>
            </div>
            <button class="fab-toggle" id="fabToggle" aria-label="Связаться с нами">
                <svg class="icon-open" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <svg class="icon-close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>`;
    }

    /* ---------- ФОРМА ---------- */
    function formHTML(service) {
        const serviceField = service
            ? `<input type="hidden" name="service" value="${service}">
               <select name="service_display" disabled>
                   <option selected>${service}</option>
               </select>`
            : `<select name="service" required>
                   <option value="" disabled selected>Выберите услугу *</option>
                   ${SERVICES_LIST.map(s => `<option value="${s}">${s}</option>`).join('')}
               </select>`;

        return `
        <div class="container">
            <h2>Оставить заявку</h2>
            <p class="subtitle">Заявка придёт нам в Telegram — ответим быстро</p>
            <div class="form-box">
                <form id="leadForm" novalidate>
                    <input type="text" name="name" placeholder="Ваше имя *" required>
                    <input type="tel" name="phone" placeholder="Телефон *" required>
                    ${serviceField}
                    <textarea name="message" rows="3" placeholder="Комментарий (необязательно)"></textarea>
                    <button type="submit" class="btn">Отправить заявку</button>
                    <div class="form-message" id="formMessage"></div>
                </form>
            </div>
        </div>`;
    }

    /* ---------- ФУТЕР ---------- */
    function footerHTML() {
        return `
        <div class="container">
            <p>© ${new Date().getFullYear()} BGT — тюнинг и дооснащение автомобилей во Владивостоке</p>
            <p style="margin-top:6px;">${ADDRESS_FULL} · <a href="tel:${PHONE}">${PHONE_DISPLAY}</a></p>
            <div class="footer-messengers">
                <a href="https://wa.me/79024833907" target="_blank" rel="noopener">WhatsApp</a>
                <a href="https://t.me/+79024833907" target="_blank" rel="noopener">Telegram</a>
                <a href="https://max.ru/+79024833907" target="_blank" rel="noopener">MAX</a>
            </div>
        </div>`;
    }

    /* ---------- ИНИЦИАЛИЗАЦИЯ ---------- */
    function mount() {
        const header = document.getElementById('site-header');
        if (header) header.innerHTML = headerHTML();

        const footer = document.getElementById('site-footer');
        if (footer) footer.innerHTML = footerHTML();

        const fab = document.getElementById('fab-mount');
        if (fab) fab.innerHTML = fabHTML();

        const burger = document.getElementById('burger-mount');
        if (burger) burger.innerHTML = burgerHTML();

        const formMount = document.getElementById('contact-form-mount');
        if (formMount) {
            const service = formMount.dataset.service || '';
            formMount.innerHTML = formHTML(service);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();
