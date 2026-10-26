/* Shared photo viewer: native dialog provides focus trapping and Escape. */
(() => {
  const triggers = [...document.querySelectorAll('.photo-open')];
  const dialog = document.querySelector('.photo-modal');
  if (!dialog || !triggers.length) return;
  const image = dialog.querySelector('.modal-image');
  const caption = dialog.querySelector('.modal-caption');
  let current = 0, opener, touch;
  let syncAutoplay = () => {};
  function show(index) {
    current = (index + triggers.length) % triggers.length;
    const source = triggers[current].querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = `${current + 1} / ${triggers.length} — ${source.alt}`;
  }
  triggers.forEach((button, index) => button.addEventListener('click', () => {
    opener = button;
    show(index);
    dialog.showModal();
    syncAutoplay();
    document.body.classList.add('modal-open');
    dialog.querySelector('.modal-close').focus();
  }));
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.modal-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.modal-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({preventScroll:true});
    syncAutoplay();
  });
  image.addEventListener('touchstart', e => { touch = {x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}; }, {passive:true});
  image.addEventListener('touchend', e => {
    if (!touch) return;
    const dx=e.changedTouches[0].clientX-touch.x, dy=e.changedTouches[0].clientY-touch.y;
    if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) show(current+(dx<0?1:-1));
    touch=null;
  }, {passive:true});
  const carousel = document.querySelector('.photo-carousel');
  if (carousel && window.Swiper) {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const toggle = carousel.querySelector('.carousel-autoplay');
    let userPaused = false, hovered = false, touching = false, visible = false;
    const swiper = new Swiper('.photo-swiper', {
      slidesPerView: 1.15,
      spaceBetween: 20,
      speed: motion.matches ? 0 : 650,
      rewind: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      navigation: { prevEl: '.carousel-prev', nextEl: '.carousel-next' },
      a11y: { enabled: true },
      breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
    syncAutoplay = () => {
      const focusInside = carousel.contains(document.activeElement) && document.activeElement !== toggle;
      const stopped = userPaused || motion.matches || hovered || touching || !visible || document.hidden || dialog.open || focusInside;
      if (stopped) swiper.autoplay.stop();
      else if (!swiper.autoplay.running) swiper.autoplay.start();
      toggle.textContent = motion.matches ? 'Autoplay off' : userPaused ? 'Play slideshow' : 'Pause slideshow';
      toggle.disabled = motion.matches;
      toggle.setAttribute('aria-pressed', String(userPaused || motion.matches));
    };
    toggle.addEventListener('click', () => { userPaused = !userPaused; syncAutoplay(); });
    carousel.addEventListener('mouseenter', () => { hovered = true; syncAutoplay(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; syncAutoplay(); });
    carousel.addEventListener('focusin', syncAutoplay);
    carousel.addEventListener('focusout', () => setTimeout(syncAutoplay, 0));
    swiper.on('touchStart', () => { touching = true; syncAutoplay(); });
    swiper.on('touchEnd', () => { touching = false; setTimeout(syncAutoplay, 0); });
    document.addEventListener('visibilitychange', syncAutoplay);
    motion.addEventListener('change', () => { swiper.params.speed = motion.matches ? 0 : 650; syncAutoplay(); });
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncAutoplay(); }, {threshold: 0.15}).observe(carousel);
    syncAutoplay();
  }
})();
