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
                <a href="tel:${PHONE}" class="fab-btn" title="Позвонить">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <a href="https://wa.me/79024833907" target="_blank" rel="noopener" class="fab-btn" title="WhatsApp">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="https://t.me/+79024833907" target="_blank" rel="noopener" class="fab-btn" title="Telegram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
                <a href="https://max.ru/+79024833907" target="_blank" rel="noopener" class="fab-btn" title="MAX">
                    <span style="font-size: 14px; font-weight: 800;">MAX</span>
                </a>
            </div>
            <button class="fab-toggle" id="fabToggle" aria-label="Связаться с нами">
                <svg class="icon-open" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <svg class="icon-close" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>`;
    }

    /* ---------- ФОРМА ---------- */
    /* Если data-service задан (страница услуги) — фиксированное поле.
       Если нет (главная) — выпадающий список всех услуг. */
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
            // Если на странице задан data-service, берем его. Иначе пустая строка (главная).
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
