/* =========================================================
   GALLERY.JS — конфиги галерей + рендер + инициализация GLightbox
   На странице: <div class="gallery-mount" data-gallery-name="...">
   
   Типы карточек:
   - type: 'video'  → YouTube (обычное видео, 16:9)
   - type: 'short'  → YouTube Shorts (вертикальное видео, 9:16)
   - type: 'photo'  → фотоальбом (cover + album[])
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

        blindspot: [
            {
                type: 'video',
                id: 'YM4Q5IP4I9E',
                title: 'Система контроля слепых зон на примере Hummer H2'
            },
            {
                type: 'video',
                id: 'ka0FIhpAcIw',
                title: 'Система контроля слепых зон для любого авто на примере Bentley'
            },
            {
                type: 'video',
                id: '3pXXlCAeGO4',
                title: 'СИСТЕМА КОНТРОЛЯ СЛЕПЫХ ЗОН | BGT WorkShop'
            },
            {
                type: 'video',
                id: 'K0vC-37mzIQ',
                title: 'слепые зоны ставим на Rolls Royce'
            },
            {
                type: 'video',
                id: 'EauivRkyQLU',
                title: 'СИСТЕМА КОНТРОЛЯ СЛЕПЫХ ЗОН на примере BMW X7'
            },
            {
                type: 'video',
                id: '2ZmxlErKvmc',
                title: 'СИСТЕМА КОНТРОЛЯ СЛЕПЫХ ЗОН - сравнение вариантов'
            },
            {
                type: 'video',
                id: 'c0-hMJIfRWc',
                title: 'Контроль слепых зон - дополнительно установленная система'
            },
            {
                type: 'video',
                id: '4OcQ_NlnAVE',
                title: 'Система Контроля слепых зон с индикаторами в передние стойки'
            }
        ],

        carplay: [
            {
                type: 'video',
                id: 'ezCXBkvNiis',
                title: 'BMW - Apple CarPlay'
            },
            {
                type: 'video',
                id: 'S0Iiypzwmzw',
                title: 'Bentley - Apple CarPlay'
            },
            {
                type: 'video',
                id: 'qwAJcuFJO84',
                title: 'Infiniti - Apple CarPlay'
            },
            {
                type: 'video',
                id: 'pVcfvc99K_I',
                title: 'Audi Q7 2-nd Gen - Carplay'
            },
            {
                type: 'video',
                id: '3D8ni1AC1nE',
                title: 'Lexus LX 450D/570 - Apple CarPlay в штатную мультимедиа систему'
            },
            {
                type: 'video',
                id: '28E57crdSto',
                title: 'Mercedes G-Class 2013-2016 - доп мультимедиа'
            },
            {
                type: 'video',
                id: 'sy27ZRuuH4A',
                title: 'GLS, GLE, W447 - Apple CarPlay c сенсорным управлением'
            },
            {
                type: 'video',
                id: 'cRIw1jIZuXQ',
                title: 'Mercedes S-Class W221 - Apple CarPlay'
            },
            {
                type: 'video',
                id: 'y5nNIeFGSME',
                title: 'Volvo - CarPlay'
            }
        ],

        'fuel-corrector': [
            {
                type: 'photo',
                cover: 'https://bgtworkshop.ru/upload/image/0d86b66e572c076d6d5965511666f6bf/picture.jpg',
                title: 'Топливный корректор БГТ',
                album: [
                    'https://bgtworkshop.ru/upload/image/0d86b66e572c076d6d5965511666f6bf/picture.jpg',
                    'https://bgtworkshop.ru/upload/image/d072283cd6eb3b163da8af6f3f44d6f4/picture.jpg',
                    'https://bgtworkshop.ru/upload/image/944250dd4d8a17230c7251fab9757883/picture.jpg',
                    'https://bgtworkshop.ru/upload/image/8468360830d03d2346656b961ff517df/picture.jpg'
                ]
            },
            {
                type: 'video',
                id: 'skjIN49gHZ4',
                title: 'Комплексная защита двигателей с помощью корректоров от БГТ'
            },
            {
                type: 'video',
                id: 'xQKjS32Uj34',
                title: 'Топливный корректор в бензин для Cadillac Escalade'
            },
            {
                type: 'video',
                id: 'a1scnqrdT5s',
                title: 'Топливный корректор на примере Дизельного Hyundai Starex'
            },
            {
                type: 'video',
                id: 'IKH3VmlhxMA',
                title: 'Топливный корректор Range Rover Sport 5,0 Бензин'
            },
            {
                type: 'video',
                id: 'yrPiNDBrj40',
                title: 'Масляный корретор в двигатели БМВ дизельный и бензиновый'
            }
        ],

        acoustic: [
            {
                type: 'video',
                id: 'S6mFrUAYAhc',
                title: 'Апгрейд Mercedes GLS (комплексное дооснащение)'
            }
        ],
        'dop-cameras': [],
        'apple-tv': [
            {
                type: 'photo',
                cover: 'https://a1.drive-data.ru/jQAAAgDJ2-A-960.jpg',
                title: 'Apple TV в оригинальные мультимедиа системы разных автомобилей',
                album: [
                    'https://a1.drive-data.ru/jQAAAgDJ2-A-960.jpg'
                ]
            },
            {
                type: 'video',
                id: 'sxm7GSJd69s',
                title: 'Apple TV и iPhone Mirrorlink на Lexus LS 2017+ (на оригинальные мониторы сзади)'
            }
        ],
        'anti-theft': [
            {
                type: 'video',
                id: 'WfuYAFM-Nt0',
                title: 'Nissan Patrol - противоугонка C-Asper'
            },
            {
                type: 'video',
                id: 'Fa7SFVI7ZJI',
                title: 'Lexus LX570 - противоугонка C-Asper'
            },
            {
                type: 'video',
                id: 'WyjMXq_UsRo',
                title: 'Противоугонная система C-Asper на Mercedes-Benz E-Class W212.'
            }
        ],
        'soft-close': [
            {
                type: 'video',
                id: 'i9jfb3SQa1A',
                title: 'Доводчики для закрытия дверей на примере Lexus LX570'
            },
            {
                type: 'video',
                id: 'WwDLaiJjgAc',
                title: 'Доводчики дверей на авто Genesis GV80'
            },
            {
                type: 'video',
                id: 'PkM9ThvjMcw',
                title: 'Mercedes GLS W167 - доводчики на двери / присоски дверей / дотяжки на двери'
            },
            {
                type: 'video',
                id: 'slqKCJ--m4s',
                title: 'Honda CRV 5 gen - доводчики / присоски на двери'
            },
            {
                type: 'video',
                id: 'cBjvaEiNC5Q',
                title: 'Honda Pilot(3G) - доводчики / присоски на двери'
            },
            {
                type: 'video',
                id: 'e8aQ4YR0j5A',
                title: 'ДОВОДЧИКИ ДВЕРЕЙ на авто Range Rover Evoque'
            }
        ],
        'power-steps': [
            {
                type: 'short',
                id: 'yySOUlKeJwI',
                title: 'ВЫДВИЖНЫЕ ЭЛЕКТРОПОРОГИ на Mercedes G-class'
            },
            {
                type: 'short',
                id: 'eh6BkDvQ-Hs',
                title: 'Land Rover Defender - выезжающие пороги'
            },
            {
                type: 'short',
                id: 'Rch0O7YSl1A',
                title: 'Audi q7 1 Gen - выезжающие электропороги \ автоматические электропороги'
            },
            {
                type: 'video',
                id: 'AssudCXVv50',
                title: 'ЭЛЕКТРОПОРОГИ - куда устанавливать лапы подъемника?'
            },
            {
                type: 'video',
                id: 'IwB2nP5M0ZU',
                title: 'Выезжающие пороги - безопасность - препятствие сверху'
            },
            {
                type: 'video',
                id: '6b8Xm19vqKA',
                title: 'Выезжающие пороги - безопасность - препятствие снизу'
            },
            {
                type: 'video',
                id: 'UhGH2fTvr7g',
                title: 'Выезжающие пороги X7 - проверка на прочность'
            }
        ],
        'ambient-light': [
            {
                type: 'video',
                id: '3m22s8Lr788',
                title: 'G-class - контурная атмосферная подсветка салона'
            },
            {
                type: 'video',
                id: 'fton-h6VmiQ',
                title: 'Контурная атмосферная подсветка салона а/м Нива'
            }
        ],
        soundproofing: [
            {
                type: 'video',
                id: 'IrWobc3MEsM',
                title: 'Mercedes GLS, GLE 167 - шумоизоляция'
            },
            {
                type: 'video',
                id: 'h5GW2YFLIfE',
                title: 'Lexus LX 450D / 570 - тотальная шумоизоляция'
            },
            {
                type: 'video',
                id: 'tr1bUMnpBKk',
                title: 'Escalade V - шумоизоляция авто'
            },
            {
                type: 'video',
                id: 'pkQ4Q4XYCG0',
                title: 'автомобильная шумоизоляция бмв'
            },
            {
                type: 'video',
                id: 'oFP4wNB_mZU',
                title: 'V Class, Vito W447 - шумоизоляция, комплексная защита от шума'
            },
            {
                type: 'short',
                id: 'AxlqLLyhgTs',
                title: 'Жидкая шумоизоляция Cadillac Escalade 5'
            },
            {
                type: 'video',
                id: 'QR0Wc0SxIIc',
                title: 'Шумоизоляция Toyota LC300'
            },
            {
                type: 'video',
                id: '5aVLqoyogyo',
                title: 'Zeekr 009 - шумоизоляция тотальная и бескомпромиссная'
            }
        ],
        'extra-monitors': [
            {
                type: 'photo',
                cover: 'https://a1.drive-data.ru/saAAAgDZTeA-960.jpg',
                title: 'Доп мультимедиа для ЛЮБОГО авто!',
                album: [
                    'https://a1.drive-data.ru/saAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/omAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/hWAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/Q2AAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/xWAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/E2AAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/JOAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/dWAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/TuAAAgDZTeA-960.jpg',
                    'https://a1.drive-data.ru/ReAAAgDZTeA-960.jpg'
                ]
            },
            {
                type: 'video',
                id: 'W0zyfxuCLgI',
                title: 'Mercedes W140 - современная мультимедиа в легендарный авто!'
            },
        ],
        'starry-sky': [
            {
                type: 'photo',
                cover: 'https://bgt-nebo.ru/upload/image/a030a4eed9f30f4ed60b674d758b40a3/big.jpg',
                title: 'Установим систему «Звёздное небо» в салон Вашего автомобиля',
                album: [
                    'https://bgt-nebo.ru/upload/image/a030a4eed9f30f4ed60b674d758b40a3/big.jpg',
                    'https://bgt-nebo.ru/upload/image/b338e68742facafb619efc117a322dd0/big.jpg',
                    'https://bgt-nebo.ru/upload/image/b89288a3f838c6bfa6a2a4a68e1ebe3e/big.jpg',
                    'https://bgt-nebo.ru/upload/image/f0d63ccdfe6b45a0cdccb5211e41bc20/big.jpg',
                    'https://bgt-nebo.ru/upload/image/c9551e6b21504aba57f542a6f0aa51cb/big.jpg'
                ]
            }
        ],
        'rear-monitors': [
            {
                type: 'video',
                id: 'Dm79bifySAQ',
                title: 'Мониторы снимаемые на примере Audi Q7'
            },
            {
                type: 'video',
                id: 'punU9iB-AH8',
                title: 'СЪЕМНЫЕ МОНИТОРЫ на Audi А8'
            },
            {
                type: 'video',
                id: 'BvFoYcuEV58',
                title: 'OEM Мониторы на спинку сидений на примере X5 (E70)'
            },
            {
                type: 'video',
                id: 'UlPROniLQuA',
                title: 'BMW G-Series - мониторы для задних пассажиров'
            },
            {
                type: 'video',
                id: 'lIkRRafnfyA',
                title: 'BMW 7er G11/G12 - Apple TV + iPhone Mirrorlink на задние мониторы'
            },
            {
                type: 'video',
                id: 'Lnjrj1K7XYI',
                title: 'BMW - консольный монитор'
            },
            {
                type: 'video',
                id: 'daXPFLQoeZk',
                title: 'Lexus LX570 2008-2015 - замена штатных мониторов для пассажиров'
            },
            {
                type: 'video',
                id: 'jT8FkZV6iGM',
                title: 'Мерседес - мониторы для задних пассажиров'
            },
            {
                type: 'video',
                id: 'xNJ-LD3882s',
                title: 'Мониторы для задних пассажиров на примере Mercedes / Maybach W222'
            },
            {
                type: 'video',
                id: 'RDKg_Sqt9pg',
                title: 'Mercedes V classe w447 потолочный монитор, Apple TV, доп мультимедиа'
            },
            {
                type: 'video',
                id: '4hMHpFGlH5w',
                title: 'Mercedes Vito, Viano - доп мультимедиа вперёд + задние мониторы'
            },
            {
                type: 'video',
                id: 'o9Z2-L2eQUo',
                title: 'МУЛЬТИМЕДИА И ВИДЕОРЕГИСТРАТОР на Infiniti'
            },
            {
                type: 'video',
                id: 'gz3ayu1AYJ0',
                title: 'Toyota Alphard - большой потолочный монитор'
            },
            {
                type: 'video',
                id: '00kbf-NbXBk',
                title: 'Toyota Fortuner - доп мультимедиа + 360 + 3 доп монитора пассажирам'
            },
            {
                type: 'video',
                id: 'X0g-MR3AHIc',
                title: 'Volvo XC-90 2015+, S90, V90 - Multimedia на штатный монитор + мониторы в подголовники'
            },
            {
                type: 'video',
                id: 'D9QrqswD1eQ',
                title: 'Мониторы снимаемые для задних пассажиров на примере VW Touareg'
            }
        ]
    };

    /* ---------- РЕНДЕР ОДНОЙ КАРТОЧКИ ---------- */
    
    // Обычное видео YouTube (16:9)
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

    // YouTube Shorts (вертикальное видео 9:16)
    function shortCard(item, galleryName) {
        const thumb = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
        // Меняем ссылку на классический watch?v=, чтобы плеер YouTube не ругался
        return `
            <a href="https://www.youtube.com/watch?v=${item.id}" 
               class="video-card glightbox"
               data-gallery="${galleryName}"
               data-type="video"
               data-width="400px"
               data-height="711px">
                <div class="video-thumb">
                    <img src="${thumb}" alt="${item.title}" loading="lazy">
                    <div class="play-icon">▶</div>
                </div>
                <p class="video-title">${item.title}</p>
            </a>`;
    }

    // Фотоальбом
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
        const galleryName = `gallery-${name}`;
        const cards = items.map(item => {
            if (item.type === 'video') return videoCard(item, galleryName);
            if (item.type === 'short') return shortCard(item, galleryName);
            return photoCard(item, galleryName);
        }).join('');

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

            // Скрываем пустые секции
            if (items.length === 0) {
                mount.style.display = 'none';
                return;
            }

            mount.innerHTML = renderGallery(name, items);
        });

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
