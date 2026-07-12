/* ============================================================
   Cuterain - Brand Site JavaScript
   Features: Scroll animations, Parallax, Header, Menu
   ============================================================ */

'use strict';

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initParallax();
  initMobileMenu();
  initSmoothScroll();
});

/* ============================================================
   HEADER - ガラス風スクロール変化
   ============================================================ */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期チェック
}

/* ============================================================
   SCROLL REVEAL - Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 一度表示したら監視終了
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ============================================================
   PARALLAX - Hero画像・背景
   ============================================================ */
function initParallax() {
  const heroImg = document.querySelector('.hero__img');
  const heroBg = document.querySelector('.hero__bg-blur');

  if (!heroImg && !heroBg) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Hero画像をゆっくり上へ
        if (heroImg) {
          heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
        }

        // 背景ぼかしをゆっくり動かす
        if (heroBg) {
          heroBg.style.transform = `translateY(${scrollY * 0.04}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('headerNav');
  if (!menuBtn || !nav) return;

  function openMenu() {
    nav.classList.add('is-open');
    menuBtn.classList.add('is-active');
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    menuBtn.classList.remove('is-active');
  }

  // ハンバーガーボタンのトグル
  menuBtn.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // ✅ ナビの全リンクをクリックしたら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ✅ メニュー外をタップしたら閉じる
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', initMobileMenu);
/* ============================================================
   SMOOTH SCROLL - アンカーリンク
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
}

/* ============================================================
   STORY SECTION - タイポグラフィパララックス
   ============================================================ */
window.addEventListener('scroll', () => {
  const storyWords = document.querySelectorAll('.story__word');
  if (!storyWords.length) return;

  const scrollY = window.scrollY;
  const windowH = window.innerHeight;

  storyWords.forEach((word, i) => {
    const rect = word.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const progress = (windowH / 2 - centerY) / windowH;

    // 各単語を少しずつ違う速度でずらす
    const speed = (i % 2 === 0) ? 0.04 : -0.04;
    word.style.transform = `translateX(${progress * speed * 300}px)`;
  });
}, { passive: true });
