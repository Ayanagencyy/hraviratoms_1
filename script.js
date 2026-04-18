const canvases = document.querySelectorAll('.canvas');

canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const img = new Image();
    img.src = 'coin.png';

    img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };

    function erase(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    // 🖱 ПК
    canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
            erase(e.offsetX, e.offsetY);
        }
    });

    // 📱 Телефон
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        erase(x, y);
    }, { passive: false });

    canvas.addEventListener('touchstart', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        erase(touch.clientX - rect.left, touch.clientY - rect.top);
    });
});

let animitems = document.querySelectorAll('._anim-items')
const timerContainer = document.getElementById('timerContainer');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let isPlaying = false

if (animitems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animitems.length; i++) {
            const animitem = animitems[i]
            const animitemHeight = animitem.offsetHeight
            const animitemOffset = offset(animitem).top
            const animStart = 1;

            let animitemPoint = window.innerHeight - animitemHeight / animStart;

            if (animitemHeight > window.innerHeight) {
                animitemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animitemOffset - animitemPoint) && pageYOffset < (animitemOffset + animitemHeight)) {
                animitem.classList.add("active")
            } else {
                animitem.classList.remove("active")
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageXOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

}


window.addEventListener('DOMContentLoaded', function () {
    const audioElement = document.getElementById('audioElement');
    const audiobtn = document.getElementById('audiobtnRef');
    const audioImg = document.getElementById('audioImg');

    audiobtn.addEventListener('click', function () {
        if (audioElement.paused) {
            audioElement.play();
            audioImg.src = "Play.png";
        } else {
            audioElement.pause();
            audioImg.src = "Pause.png";
        }
    });

    audiobtn.style.cursor = 'pointer';
    audiobtn.style.zIndex = '1000';
});

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onload = () => {
    window.scrollTo(0, 0);
};

disableScroll();

const video = document.querySelector('video');

const anim1 = document.querySelector('.name1');
const anim2 = document.querySelector('.and');
const anim3 = document.querySelector('.name2');
const anim4 = document.querySelector('.lang-switch');
const anim5 = document.querySelector('.h-img');
const anim6 = document.querySelector('.date-text');
const anim7 = document.querySelector('.date2');
const anim8 = document.querySelector('.a_a');

video.addEventListener('ended', () => {

    anim1.classList.add('act');
    anim2.classList.add('act');
    anim3.classList.add('act');
    anim4.classList.add('act');
    anim5.classList.add('act');
    anim6.classList.add('act');
    anim7.classList.add('act');
    anim8.classList.add('act');
    enableScroll()

});

const targetDate = new Date('2026-07-01T00:00:00');

function calculateTimeLeft() {
    const difference = targetDate - new Date();
    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}


function updateTimer() {
    const timeLeft = calculateTimeLeft();

    if (!timeLeft) {
        timerContainer.innerHTML = '<div class="left"">Time over</div>';
        return;
    }

    daysElement.textContent = String(timeLeft.days).padStart(2, '0');
    hoursElement.textContent = String(timeLeft.hours).padStart(2, '0');
    minutesElement.textContent = String(timeLeft.minutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeft.seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();


const translations = {
    ru: {
        title: "Откройте день, очистив его",
        h1: `Дорогие гости, <style>.lng-latetext1{
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        h2: `Хотим разделить с вами <br> один из самых важных дней нашей жизни. <br>
            С большой радостью приглашаем вас <br> на нашу церемонию помолвки.<br>`,
        way: `Программа <style>.mapheader{
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        p1: `<span class="sspan"> 
                Morena Restaurant
            </span><br>
            Адрес: Араратская область, Масис<br>
            ул. Мхитара Гераци, здание 7/8`,
        p2: `<span class="placespan" data-long="s2">
                Дом невесты 12:00
            </span><br>
            Адрес: ул. Париса Геруни, 40`,
        p3: `<span class="placespan" data-long="s3">
                Церемония венчания 15:00
            </span><br>
            Церковь Святой Гаяне, Эчмиадзин`,
        s3: "Церемония венчания 15:00",
        m: `Церемония состоится <style>.pltext{
                            font-size: 24px;
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        map: "Карта",
        t: `ВРЕМЯ:<span id="t">
                18:00 <br>
                01.07.2026
            </span>`,
        wait: `Осталось ... <style>.lng-timerhead{
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        day: "ДНЕЙ",
        hour: "ЧАСОВ",
        minute: "МИНУТ",
        sec: "СЕКУНД",
        tail: "До начала нашей сказки",
        tail2: "Отсканируйте, чтобы добавить фотографии дня",
        tg: "Ссылка Telegram",
        alert: "Пожалуйста, подтвердите ваше присутствие до 1 июня",
        alert1: `Подтвердите ваше присутствие <style>.h{
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        name: "Имя Фамилия:",
        name1: "Со стороны Вагага",
        name2: "Со стороны Соны",
        r: "Сможете ли вы присутствовать?",
        yes: "Да",
        no: "Нет",
        t1: "С чьей стороны вы приглашены?",
        guest: "Количество гостей",
        send: "Отправить",
        cr: `Сайт разработан <style>
                        .lng-ayant1 {
                            font-family: "Pacifico", cursive;
                        }
                    </style>`,
        click: "нажмите здесь",
        img: `        <style>
            .love {
                background-image: url(ru.png);

            }
        </style>`
    },
    am: {
        title: " Բացահայտեք օրը՝ մաքրելով այն",
        h1: "Սիրելի' հյուրեր,",
        h2: `Ցանկանում ենք Ձեզ հետ կիսել մեր<br> կյանքի կարևորագույն օրերից մեկը։ < br >
        Մեծ ուրախությամբ հրավիրում ենք Ձեզ<br> մեր նշանադրության արարողությանը։< br > `,
        way: "Օրակարգ",
        p1: `              < span class="sspan" >
    Morena Restaurant
                    </span > <br>
    Հասցե ՝  Արարատի մարզ, Մասիս<br>
        Մխիթար Հերացու փող., 7/8 շենք`,
        // s1: "Փեսայի տուն",
        p2: `                        <span class="placespan" data-long="s2">
            Հարսի տուն 12:00
        </span><br>
            Հասցե ՝ Պարիս Հերունու փողոց, 40`,
        p3: `                        <span class="placespan" data-long="s3">
                Պսակադրության արարողություն 15:00
            </span><br>
                Սուրբ Գայանե եկեղեցի, Էջմիածին`,
        s3: "Պսակադրության արարողություն 15:00",
        m: "Արարողությունը տեղի կունենա",
        map: "Քարտեզ",
        t: `ԺԱՄԸ՝<span id="t">
                    18:00 <br>
                        01.07․2026
                </span>`,
        wait: "Մնացել է ...",
        day: "ՕՐ",
        hour: "ԺԱՄ",
        minute: "ՐՈՊԵ",
        sec: "ՎՐԿ",
        tail: "Մինչ մեր հեքիաթը սկսվի",
        tail2: "Սքանավորեք՝ օրվա լուսանկարները ավելացնելու համար",
        tg: "Telegram հղում",
        alert: "Խնդրում ենք հաստատել Ձեր ներկայությունը մինչև Հունիսի 1-ը",
        alert1: "Հաստատեք ձեր ներկայությունը",
        name: "Անուն Ազգանուն՝",
        name1: "Վահագի",
        name2: "Սոնայի",
        r: "Կկարողանա՞ք ներկա գտնվել ",
        yes: "Այո",
        no: "Ոչ",
        t1: "Ու՞մ կողմից եք հրավիրված",
        guest: "Հյուրերի քանակը",
        send: "Ուղարկել",
        cr: "Կայքը պատրաստել է",
        click: "սեղմիր այստեղ",
        img: ""
    }
};

const buttons = document.querySelectorAll(".lang-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;

        // меняем текст
        document.querySelectorAll("[data-long]").forEach(el => {
            const key = el.getAttribute("data-long");
            el.innerHTML = translations[lang][key];
        });

        // меняем активную кнопку
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // сохраняем язык
        localStorage.setItem("lang", lang);
    });
});

// загрузка сохранённого языка
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "am";

    document.querySelector(`[data - lang= "${savedLang}"]`)?.click();
});