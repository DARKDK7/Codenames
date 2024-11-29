// تحميل المؤثرات الصوتية من الإنترنت
const correctSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // صوت عند الإجابة الصحيحة
const wrongSound = new Audio('https://www.soundjay.com/button/beep-10.wav');   // صوت عند الإجابة الخاطئة
const winSound = new Audio('https://www.soundjay.com/button/beep-01a.wav');     // صوت عند الفوز
const loseSound = new Audio('https://www.soundjay.com/button/beep-06.wav');    // صوت عند الخسارة

// مكتبة الكلمات مع التصنيفات
const wordCategories = {
    "الطبيعة": ["شجرة", "زهرة", "نهر", "محيط", "صحراء", "غابة", "بحيرة", "سماء", "جبال", "شلال"],
    "الأفلام": ["سارق", "بطل", "هوليوود", "مغامرة", "دراما", "خيال", "أكشن", "جريمة", "فيلم", "مسرحية"],
    "الرياضة": ["كرة القدم", "سلة", "مباراة", "تنس", "عدو", "سباحة", "ركض", "كاراتيه", "كريكيت", "هوكي"],
    "العلوم": ["ذرة", "كواكب", "مجرة", "شمس", "مجرة", "بيئة", "تكنولوجيا", "أبحاث", "فضاء", "روبوت"],
    "الأطعمة": ["بيتزا", "برغر", "فواكه", "خضار", "شوكولاتة", "آيس كريم", "دجاج", "سلطة", "معكرونة", "شوربة"]
};

// متغيرات الفريق والنقاط
let team1Score = 0;
let team2Score = 0;
let currentPlayer = 1; // بداية اللعبة مع الفريق 1

// متغيرات الوقت
let timer;
let timeLeft = 30;  // الوقت بالثواني

// بدء اللعبة
document.getElementById('startBtn').addEventListener('click', startGame);

// دالة بدء اللعبة
function startGame() {
    resetGame();
    generateCards();
    startTimer();
    document.getElementById('startBtn').disabled = true;
}

// دالة بدء المؤقت
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// دالة إنشاء البطاقات
function generateCards() {
    const categoryKeys = Object.keys(wordCategories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const words = wordCategories[randomCategory];

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';  // إعادة تعيين اللوحة

    const cards = words.map(word => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = word;
        card.addEventListener('click', () => flipCard(card));
        return card;
    });

    cards.forEach(card => gameBoard.appendChild(card));
}

// دالة لتقليب البطاقة مع الصوت والرسوم المتحركة
function flipCard(card) {
    const currentScoreElement = currentPlayer === 1 ? document.getElementById('score1') : document.getElementById('score2');
    const opponentScoreElement = currentPlayer === 1 ? document.getElementById('score2') : document.getElementById('score1');

    card.classList.add('flipped');
    setTimeout(() => card.classList.remove('flipped'), 500);

    // تسجيل النقاط للفريق الحالي
    if (Math.random() < 0.5) {  // عشوائي لتحديد هل الإجابة صحيحة أم خاطئة
        currentScoreElement.textContent = parseInt(currentScoreElement.textContent) + 1;
        correctSound.play();
    } else {
        opponentScoreElement.textContent = parseInt(opponentScore
