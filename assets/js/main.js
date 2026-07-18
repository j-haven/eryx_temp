
document.addEventListener('DOMContentLoaded', () => {

    /* Search */
    const searchBox = document.getElementById('searchBox');
    const openBtns = document.querySelectorAll('.searchBoxToggler');
    const closeBtn = document.getElementById('searchCloseBtn');

    if (searchBox && openBtns.length && closeBtn) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                searchBox.classList.add('active');
                searchBox.querySelector('input').focus();
            });
        });

        closeBtn.addEventListener('click', () => {
            searchBox.classList.remove('active');
        });


        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') searchBox.classList.remove('active');
        });


        searchBox.addEventListener('click', (e) => {
            if (e.target === searchBox) searchBox.classList.remove('active');
        });
    }


    /* Bottom nav */
    const bottomNav = document.querySelector('.bottom-nav');
    const footer = document.querySelector('footer');

    if (bottomNav && footer) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                bottomNav.classList.toggle('bottom-nav--hidden', entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(footer);
    }

    /* Reveal about on Scroll */
    (function () {
        var els = document.querySelectorAll('.reveal-rise');
        if (!('IntersectionObserver' in window) || !els.length) {
          els.forEach(function (el) { el.classList.add('in-view'); });
          return;
        }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        els.forEach(function (el) { io.observe(el); });
    })();


});