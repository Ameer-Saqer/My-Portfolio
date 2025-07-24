var typed = new Typed('#text', {
    strings: ['Front End Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
});

// Show Skills:
let skillBtn = document.querySelector('.skill_btn');
let skillDet = document.querySelector('.about_bottom');

skillBtn.addEventListener('click', () => {
    skillDet.classList.toggle('show_skills');
});

// sticky nav:
let nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if(window.scrollY > 100){
        nav.classList.add('sticky_nav');
    } else {
        nav.classList.remove('sticky_nav');
    }
});

// Swiper Slider:
var swiper = new Swiper('.testSwiper', {
    slidesPerView:1,
    loop: true,
    autoplay: true,
});

var mixer = mixitup('.portfolio_image');

// Blog Swiper Slider:
var swiper = new Swiper('.blogSwiper', {
    slidesPerView:3,
    spaceBetween:30,
    loop: true,
    autoplay: true,
    breakpoints: {
        1200: {
            slidesPerView:2,
            spaceBetween:10,
        },
        900: {
            slidesPerView:1,
            spaceBetween:10,
        },
        500: {
            slidesPerView:1,
            spaceBetween:10,
        }
    },
});

let bar = document.querySelector('.bars');
let menu = document.querySelector('.menu');

bar.addEventListener ('click', () => {
    menu.classList.toggle('show_nav');
});
function revealElements() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 10);
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);