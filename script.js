// Прелоадер
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

// Плавная прокрутка
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const offsetTop = targetElement.offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

// Гамбургер-меню
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Слайдер отзывов
const reviewSlides = document.querySelectorAll('.review-slide');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
let currentSlide = 0;

function showSlide(index) {
  reviewSlides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (index < 0) ? reviewSlides.length - 1 : (index >= reviewSlides.length) ? 0 : index;
  reviewSlides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
setInterval(() => showSlide(currentSlide + 1), 5000);

// FAQ аккордеон
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(i => i !== item && i.classList.remove('active'));
    item.classList.toggle('active');
  });
});


// Анимации появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.about, .services, .reviews, .contacts, .faq').forEach(el => {
  observer.observe(el);
});

// Плавная анимация для таблиц
document.querySelectorAll('.price-table table').forEach((table, index) => {
  setTimeout(() => {
    observer.observe(table);
  }, index * 200);
});

function startParticles() {
  // Проверяем поддержку reduce motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Отключаем анимации для пользователей с ограниченными возможностями
    document.querySelectorAll('.particle').forEach(particle => {
      particle.style.animation = 'none';
    });
    return;
  }

  // Инициализация анимаций частиц
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    particle.style.animationDelay = `${index * 2.5}s`;
  });

  // Паузим анимации когда вкладка неактивна для экономии ресурсов
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      particles.forEach(particle => {
        particle.style.animationPlayState = 'paused';
      });
    } else {
      particles.forEach(particle => {
        particle.style.animationPlayState = 'running';
      });
    }
  });
}