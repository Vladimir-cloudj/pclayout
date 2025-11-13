// Элементы
const earnedNumber = document.querySelector(".course__progress-label .course__number");
const progressBar = document.querySelector(".course__progress-element progress");
const progressContainer = document.querySelector(".course__progress");

// Флаг: была ли уже запущена анимация
let animationPlayed = false;

// Генерация случайного числа от 350_000 до 600_000
function getRandomEarnings() {
  return Math.floor(Math.random() * (600000 - 350000 + 1)) + 350000;
}

// Форматирование числа с пробелами и символом ₽
function formatNumber(num) {
  return num.toLocaleString("ru-RU") + "₽";
}

// Анимация накрутки числа
function animateCounter(finalValue) {
  const duration = 2000; // 2 секунды
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    const timeElapsed = time - start;
    const progress = Math.min(timeElapsed / duration, 1);

    // easeOutCubic для плавного завершения
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * finalValue);

    earnedNumber.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// Анимация прогресс-бара
function animateProgressBar(finalValue) {
  const duration = 2000;
  const start = performance.now();
  const target = finalValue; // max=1_000_000

  requestAnimationFrame(function animate(time) {
    const timeElapsed = time - start;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // smooth easing
    const current = easeProgress * target;

    progressBar.value = current;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// Запуск анимации
function startAnimation() {
  if (animationPlayed) return;
  animationPlayed = true;

  const value = getRandomEarnings(); // рандомное значение

  // Сброс к 0 перед началом
  earnedNumber.textContent = "0₽";
  progressBar.value = 0;

  // Запускаем обе анимации
  animateCounter(value);
  animateProgressBar(value);
}

// Проверка видимости блока в "средней трети экрана"
function checkVisibility() {
  if (animationPlayed) return;

  const rect = progressContainer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Разделяем экран на три части
  const third = viewportHeight / 3;
  const topBound = third; // начало средней трети
  const bottomBound = third * 2; // конец средней трети

  // Блок попадает в среднюю треть?
  const isInMiddleThird =
    (rect.top >= topBound && rect.top <= bottomBound) || // верх блока в зоне
    (rect.bottom >= topBound && rect.bottom <= bottomBound) || // низ блока в зоне
    (rect.top < topBound && rect.bottom > bottomBound); // блок перекрывает всю зону

  if (isInMiddleThird) {
    startAnimation();
  }
}

// Слушаем прокрутку
window.addEventListener("scroll", checkVisibility);
// Проверяем при загрузке на случай, если блок уже в зоне
window.addEventListener("load", () => {
  setTimeout(checkVisibility, 100); // даем время на рендер
});
