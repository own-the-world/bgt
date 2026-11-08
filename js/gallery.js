/* =========================================================
   GALLERY.JS — конфиги галерей + рендер + инициализация GLightbox
   На странице: <div class="gallery-mount" data-gallery-name="...">
   ========================================================= */

(function () {
    'use strict';

    /* ---------- КОНФИГИ ГАЛЕРЕЙ ---------- */
    const GALLERIES = {
        russification: [
            {
                type: 'video',
                id: '5YegGeQqz2w',
                title: 'Русификация ШГУ и приборной панели Hyundai Palisade'
            },
            {
                type: 'photo',
                cover: 'https://drivemods.org/static/media/palisade.c73f2f5d.jpg',
                title: 'Русификация Hyundai Palisade (Фотоальбом)',
                album: [
                    'https://drivemods.org/static/media/palisade.c73f2f5d.jpg',
                    'https://drivemods.org/static/media/1.57055a03.jpg',
                    'https://drivemods.org/static/media/5.8d51c83c.jpg',
                    'https://drivemods.org/static/media/6.93bafa56.jpg'
                ]
            }
        ],

        dvr: [],

        view360: [
            {
                type: 'video',
                id: 'sZdCcDXVOoU',
                title: 'в Porsche Cayenne 3G 2017+ поставили систему кругового обзора 360 в авто, где его изначально не было'
            },
            {
                type: 'photo',
                cover: 'https://bgt-360.ru/upload/images/CAY/EvpqVa1UWWFoCe3cDqdsMcUkLBc-1920.jpg',
                title: 'Круговой обзор Porsche Cayenne',
                album: [
                    'https://bgt-360.ru/upload/images/CAY/EvpqVa1UWWFoCe3cDqdsMcUkLBc-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/33.jpg',
                    'https://bgt-360.ru/upload/images/CAY/21.jpg',
                    'https://bgt-360.ru/upload/images/CAY/vUoiZSjBeVITsKAB40CQjhYK9Lc-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/Jiu7OE02PrNTKWhBTuzacCHY7GE-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/LtKFbIhAhEvXhFJnRCpH7_FDvS4-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/rL7bSApHvK_nP6-a_bx1I8I0RYA-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/XoRWyhbY-Ypzf8G07D8WU3RvcpE-1920.jpg',
                    'https://bgt-360.ru/upload/images/CAY/ZTgU6zGNWUInZe8tBYatpqK7rcw-1920.jpg'                   
                ]
            }
        ],

        /* --- ПУСТЫЕ ГАЛЕРЕИ ДЛЯ НОВЫХ УСЛУГ --- */
        blindspot: [],
        carplay: [],
        acoustic: [],
        'dop-cameras': [],
        'apple-tv': [],
        'anti-theft': [],
        'soft-close': [],
        'power-steps': [],
        'ambient-light': [],
        soundproofing: [],
        'extra-monitors': [],
        'starry-sky': [],
        'rear-monitors': []
    };

    /* ---------- РЕНДЕР ОДНОЙ КАРТОЧКИ ---------- */
    function videoCard(item, galleryName) {
        const thumb = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
        return `
            <a href="https://www.youtube.com/watch?v=${item.id}"
               class="video-card glightbox"
               data-gallery="${galleryName}">
                <div class="video-thumb">
                    <img src="${thumb}" alt="${item.title}" loading="lazy">
                    <div class="play-icon">▶</div>
                </div>
                <p class="video-title">${item.title}</p>
            </a>`;
    }

    function photoCard(item, galleryName) {
        const [cover, ...rest] = item.album;
        const hidden = rest.map(src =>
            `<a href="${src}" class="glightbox" data-gallery="${galleryName}"></a>`
        ).join('');

        return `
            <a href="${cover}"
               class="video-card glightbox photo-card"
               data-gallery="${galleryName}">
                <div class="video-thumb">
                    <img src="${cover}" alt="${item.title}" loading="lazy">
                </div>
                <p class="video-title">${item.title}</p>
            </a>
            <div class="hidden-gallery-items">${hidden}</div>`;
    }

    /* ---------- РЕНДЕР ВСЕЙ ГАЛЕРЕИ ---------- */
    function renderGallery(name, items) {
        const galleryName = `gallery-${name}`; /* изоляция между страницами */
        const cards = items.map(item =>
            item.type === 'video'
                ? videoCard(item, galleryName)
                : photoCard(item, galleryName)
        ).join('');

        return `
            <div class="container">
                <h2 style="text-align:center; margin-bottom:40px;">Галерея</h2>
                <div class="video-grid">${cards}</div>
            </div>`;
    }

    /* ---------- ИНИЦИАЛИЗАЦИЯ ---------- */
    function init() {
        const mounts = document.querySelectorAll('.gallery-mount');
        mounts.forEach(mount => {
            const name = mount.dataset.galleryName;
            const items = GALLERIES[name];
            
            if (!items) {
                console.warn(`[gallery] Нет конфигурации для "${name}"`);
                return;
            }

            // Если массив пустой, можно вообще скрыть секцию галереи, чтобы не было пустого черного блока
            if (items.length === 0) {
                mount.style.display = 'none';
                return;
            }

            mount.innerHTML = renderGallery(name, items);
        });

        /* GLightbox — после рендера карточек */
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true,
                plyr: {
                    config: {
                        ratio: '16:9',
                        hideControls: false,
                        youtube: { noCookie: true, rel: 0, showinfo: 0 }
                    }
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
