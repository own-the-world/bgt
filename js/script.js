// ==================== НАСТРОЙКИ TELEGRAM ====================
// ⚠️ Вставьте свой токен (получите у @BotFather)
const TG_BOT_TOKEN = 'нет';
const TG_CHAT_ID   = 'нет';

// ==================== ПОДСВЕТКА МЕНЮ ====================
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });
});

// ==================== СЛАЙДЕР (только на главной) ====================
const slides = document.querySelectorAll('.slide');
if (slides.length) {
    const dots = document.querySelectorAll('#sliderDots button');
    let current = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
    }
    function nextSlide() { goToSlide((current + 1) % slides.length); }
    function startSlider() { slideInterval = setInterval(nextSlide, 5000); }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(i);
            startSlider();
        });
    });
    startSlider();
}

// ==================== АККОРДЕОН УСЛУГ ====================
document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const body = item.querySelector('.service-body');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.service-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.service-body').style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });
});

// ==================== ПЛАВНЫЙ СКРОЛЛ ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== ОТПРАВКА ФОРМЫ В TELEGRAM ====================
const form = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = form.name.value.trim();
        const phone   = form.phone.value.trim();
        const service = form.service ? form.service.value : '';
        const message = form.message ? form.message.value.trim() : '';

        // Валидация
        if (name.length < 2) {
            showMessage('Введите имя.', 'error');
            return;
        }
        if (phone.replace(/\D/g, '').length < 10) {
            showMessage('Введите корректный телефон.', 'error');
            return;
        }

        // Блокируем кнопку
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Отправка...';

        // Получаем номер в формате 89240080838 (для текста)
        const phoneFormatted = formatPhone(phone);
        // И в формате +79240080838 (для sendContact)
        const phoneForContact = '+7' + phoneFormatted.slice(1);

        // 1. Формируем текстовое сообщение
        const text =
            `🔔 <b>Новая заявка с сайта</b>\n\n` +
            `👤 <b>Имя:</b> ${escapeHtml(name)}\n` +
            `📞 <b>Телефон:</b> ${phoneFormatted}\n` +
            (service ? `🛠 <b>Услуга:</b> ${escapeHtml(service)}\n` : '') +
            (message ? `💬 <b>Сообщение:</b> ${escapeHtml(message)}` : '');

        try {
            // Шаг 1: Отправляем текстовое сообщение (с красивым оформлением)
            const textResponse = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TG_CHAT_ID,
                    parse_mode: 'HTML',
                    text: text,
                    disable_web_page_preview: true
                })
            });
            const textData = await textResponse.json();

            if (!textData.ok) {
                throw new Error(textData.description);
            }

            // Шаг 2: Отправляем контакт (он будет кликабельным в любом клиенте)
            const contactResponse = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendContact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TG_CHAT_ID,
                    phone_number: phoneForContact,
                    first_name: name || 'Клиент'
                })
            });
            const contactData = await contactResponse.json();

            if (contactData.ok) {
                showMessage(`Спасибо, ${name}! Заявка отправлена. Мы свяжемся с вами.`, 'success');
                form.reset();
            } else {
                console.warn('Contact send error:', contactData);
                // Если текст ушел, а контакт нет — считаем что заявка принята
                showMessage(`Спасибо, ${name}! Заявка отправлена.`, 'success');
                form.reset();
            }

        } catch (err) {
            console.error(err);
            showMessage('Не удалось отправить. Позвоните нам: 8 902 483-39-07', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

// Приведение телефона к строгому виду 89240080838
function formatPhone(phoneStr) {
    let digits = phoneStr.replace(/\D/g, '');
    
    // Если 11 цифр и начинается с 7 -> меняем на 8 (для текста)
    if (digits.length === 11 && digits.startsWith('7')) {
        digits = '8' + digits.slice(1);
    } 
    // Если 10 цифр -> добавляем 8
    else if (digits.length === 10) {
        digits = '8' + digits;
    }
    
    return digits; // Вернёт 89240080838
}

function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    setTimeout(() => { formMessage.className = 'form-message'; }, 8000);
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ==================== WHATSAPP: ПРЕДЗАПОЛНЕННЫЙ ТЕКСТ ====================
document.querySelectorAll('.wa-preload').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = encodeURIComponent(
            'Здравствуйте! Хочу записаться на услугу автоэлектрика. ' +
            'Подскажите, пожалуйста, свободное время.'
        );
        window.open(`https://wa.me/79024833907?text=${text}`, '_blank');
    });
});

// ==================== ПЛАВАЮЩЕЕ МЕНЮ (FAB) ====================
const fabMenu = document.getElementById('fabMenu');
const fabToggle = document.getElementById('fabToggle');

if (fabToggle) {
    fabToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы клик не уходил на страницу
        fabMenu.classList.toggle('open');
    });

    // Закрывать меню при клике в любом другом месте экрана
    document.addEventListener('click', (e) => {
        if (fabMenu.classList.contains('open') && !fabMenu.contains(e.target)) {
            fabMenu.classList.remove('open');
        }
    });
}
