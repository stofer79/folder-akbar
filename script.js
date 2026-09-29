const words = ["coder ⌨️", "problem solver 🧩", "web developer 🌐", "tech enthusiast 🚀", "lifelong learner 📚"];
const rotating = document.getElementById("rotating");
let wordIndex = 0;
setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  rotating.animate(
    [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-10px)", opacity: 0 }],
    { duration: 200, easing: "ease-in" }
  ).onfinish = () => {
    rotating.textContent = words[wordIndex];
    rotating.animate(
      [{ transform: "translateY(10px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 250, easing: "ease-out" }
    );
  };
}, 2200);
rotating.textContent = words[0];

const cursorDot = document.getElementById("cursorDot");
window.addEventListener("mousemove", (e) => {
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});
document.querySelectorAll("a, button, .skill").forEach((el) => {
  el.addEventListener("mouseenter", () => cursorDot.classList.add("grow"));
  el.addEventListener("mouseleave", () => cursorDot.classList.remove("grow"));
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

function animateCount(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1400;
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 70}ms`;
  observer.observe(el);
});

const localTime = document.getElementById("localTime");
function updateTime() {
  const time = new Date().toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  });
  localTime.textContent = `${time} WIB`;
}
updateTime();
setInterval(updateTime, 30000);

document.getElementById("year").textContent = new Date().getFullYear();
