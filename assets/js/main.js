
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


// contact form
(function () {
    const wrap = document.getElementById('interestSelect');
    if (!wrap) return;

    const toggle = wrap.querySelector('.form-multiselect__toggle');
    const toggleText = wrap.querySelector('.form-multiselect__toggle-text');
    const panel = wrap.querySelector('.form-multiselect__panel');
    const checkboxes = wrap.querySelectorAll('input[type="checkbox"]');

    function updateLabel() {
        const checked = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
        if (checked.length === 0) {
            toggleText.textContent = 'Select your interests';
        } else if (checked.length <= 2) {
            toggleText.textContent = checked.join(', ');
        } else {
            toggleText.textContent = `${checked.length} selected`;
        }
    }

    toggle.addEventListener('click', function () {
        const isOpen = panel.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    checkboxes.forEach(cb => cb.addEventListener('change', updateLabel));

    document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) {
            panel.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();


// case studies details
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.csd-stat__number');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
});
        