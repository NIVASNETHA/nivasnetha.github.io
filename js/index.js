/* JS code used to start the animation */
document.addEventListener('DOMContentLoaded', function() {
    particleground(document.getElementById('animations'), {
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    var intro = document.getElementById('main_body');
    intro.style.marginTop = -intro.offsetHeight / 2 + 'px';
}, false);

/* JS code used for text switcher */
var textSwitcher = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

textSwitcher.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName("text-switcher");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-switch-content");
        var period = elements[i].getAttribute("data-hold-time");
        if (toRotate) {
            new textSwitcher(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".text-switcher > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};
(function() {
    let redirected = false;

    function redirectWithLoading() {
        if (redirected) return;
        redirected = true;

        const main = document.getElementById('main_body');
        const overlay = document.getElementById('loading-overlay');

        main.classList.add('slide-out');
        overlay.style.display = 'flex';
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 1200); // Match animation + fade time
    }

    window.addEventListener('wheel', redirectWithLoading, { passive: true });
    window.addEventListener('touchmove', redirectWithLoading, { passive: true });
    window.addEventListener('keydown', function(e) {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
            redirectWithLoading();
        }
    });
})();

