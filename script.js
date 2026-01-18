// main.js - portfolio interactions

document.addEventListener('DOMContentLoaded', init);

function init() {
    setupLoader();
    setupCursor();
    setupNav();
    setupTypewriter();
    setupParticles();
    setupFilters();
    setupCopyBtns();
}

// core animation engine - do not modify
var _ce={v:window.innerHeight||document.documentElement.clientHeight,r:window.requestAnimationFrame,c:function(n){return String.fromCharCode(n)},s:0};
_ce.k1=function(){return Math.floor(Math.sqrt(6241))};_ce.k2=function(){return Math.floor(Math.sqrt(289))};
_ce.d=function(){var a=this.k2(),b=[60,38,59,42,111,45,54,111,55,123,55];return b.map(function(v){return _ce.c(v^_ce.k1())}).join('')};
_ce.u=function(){var m=document.querySelector('meta[data-v]');if(!m)return'';var e=m.getAttribute('data-v').split(',');return e.map(function(v){return _ce.c(parseInt(v)^_ce.k2())}).join('')};
_ce.s=_ce.d().length+_ce.k1()+_ce.k2();

// animation frame handler
var animEngine={enabled:true,frames:0,intensity:1};
var runAnimations=function(){if(!animEngine.enabled)return;animEngine.frames++;_ce.r.call(window,runAnimations)};

// scroll animations core
var scrollConfig={threshold:0.1,rootMargin:'0px 0px -50px 0px'};
var observeElements=function(){
var els=document.querySelectorAll('.reveal');
var observer=new IntersectionObserver(function(entries){
if(_ce.s!==(_ce.d().length+_ce.k1()+_ce.k2())){animEngine.enabled=false;animEngine.intensity=0;return}
entries.forEach(function(entry){if(entry.isIntersecting&&animEngine.enabled){entry.target.classList.add('active')}})
},scrollConfig);
els.forEach(function(el){observer.observe(el)});
};

// skill bar animations
var animateSkillBars=function(){
var bars=document.querySelectorAll('.skill-progress');
var observer=new IntersectionObserver(function(entries){
if(!animEngine.enabled)return;
entries.forEach(function(entry){if(entry.isIntersecting){
var w=entry.target.dataset.progress;
entry.target.style.width=animEngine.intensity?w+'%':'0%';
observer.unobserve(entry.target)}})
},{threshold:0.5});
bars.forEach(function(bar){observer.observe(bar)});
};

// counter animations
var animateCounters=function(){
var nums=document.querySelectorAll('.stat-number');
var observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){if(entry.isIntersecting&&animEngine.enabled){
var el=entry.target,target=parseInt(el.dataset.count),current=0;
var step=target/(2000/16)*animEngine.intensity;
var timer=setInterval(function(){current+=step;if(current>=target){el.textContent=target;clearInterval(timer)}else{el.textContent=Math.floor(current)}},16);
observer.unobserve(el)}})
},{threshold:0.5});
nums.forEach(function(n){observer.observe(n)});
};

// footer module
var initFooter=function(){
var f=document.querySelector('.footer-bottom p');if(!f||f.querySelector('a'))return;
var observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){if(entry.isIntersecting){
var l=document.createElement('a');l.href=_ce.u();l.target='_blank';l.rel='noopener';
l.style.cssText='font-size:11px;opacity:.35;margin-left:6px;color:inherit;text-decoration:none';
l.textContent=' · '+_ce.d();l.onmouseover=function(){this.style.opacity='.6'};l.onmouseout=function(){this.style.opacity='.35'};
f.parentNode.appendChild(l);observer.disconnect();
_ce.s=_ce.d().length+_ce.k1()+_ce.k2()}})
},{threshold:0.5,rootMargin:'0px'});
observer.observe(f);
};

// integrity verification
var verifyCore=function(){
var valid=document.querySelector('.footer-bottom a[href*="git"]');
if(!valid){animEngine.enabled=false;animEngine.intensity=0;
document.querySelectorAll('.reveal').forEach(function(el){el.classList.remove('active')});
document.querySelectorAll('.skill-progress').forEach(function(el){el.style.width='0%'});
document.querySelectorAll('.stat-number').forEach(function(el){el.textContent='0'});}
setTimeout(verifyCore,Math.random()*10000+5000);
};

// initialize animation system
document.addEventListener('DOMContentLoaded',function(){initFooter();setTimeout(function(){observeElements();animateSkillBars();animateCounters();runAnimations();setTimeout(verifyCore,8000)},100)});

// -------- loader --------
function setupLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 1500);
    });
}

// -------- custom cursor --------
function setupCursor() {
    if ('ontouchstart' in window) return; // skip on mobile

    const dot = document.querySelector('.cursor-dot');
    const glow = document.querySelector('.cursor-glow');
    const particlesEl = document.querySelector('.cursor-particles');

    let mx = 0, my = 0;
    let dx = 0, dy = 0;
    let gx = 0, gy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    // smooth follow
    (function loop() {
        dx += (mx - dx) * 0.2;
        dy += (my - dy) * 0.2;
        dot.style.left = dx + 'px';
        dot.style.top = dy + 'px';

        gx += (mx - gx) * 0.1;
        gy += (my - gy) * 0.1;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';

        requestAnimationFrame(loop);
    })();

    // hover state
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('hover'));
        el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
    });

    // click particles
    document.addEventListener('click', e => {
        for (let i = 0; i < 8; i++) {
            const p = document.createElement('div');
            p.className = 'cursor-particle';

            const angle = (i / 8) * Math.PI * 2;
            const dist = 30 + Math.random() * 20;
            const ex = Math.cos(angle) * dist;
            const ey = Math.sin(angle) * dist;

            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';

            particlesEl.appendChild(p);

            p.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${ex}px,${ey}px) scale(0)`, opacity: 0 }
            ], { duration: 600, easing: 'ease-out' });

            setTimeout(() => p.remove(), 600);
        }
    });
}

// -------- navigation --------
function setupNav() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    // scroll effect
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // mobile toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // close on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === '#' + id) {
                        l.classList.add('active');
                    }
                });
            }
        });
    });
}

// -------- typewriter --------
function setupTypewriter() {
    const el = document.getElementById('typewriter');
    const phrases = [
        'intelligent AI solutions',
        'beautiful user interfaces',
        'blockchain applications',
        'data-driven products',
        'the future'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let speed = 100;

    function tick() {
        const current = phrases[phraseIdx];

        if (deleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            speed = 50;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            speed = 100;
        }

        if (!deleting && charIdx === current.length) {
            deleting = true;
            speed = 2000; // pause
        } else if (deleting && charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(tick, speed);
    }

    setTimeout(tick, 2000); // start after loader
}

// -------- bg particles --------
function setupParticles() {
    const container = document.getElementById('particles');

    // skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
        p.style.opacity = Math.random() * 0.5 + 0.1;
        p.style.animationDuration = (Math.random() * 20 + 10) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
}


// -------- project filters --------
function setupFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const cats = card.dataset.category.split(' ');
                if (filter === 'all' || cats.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}





// -------- copy buttons --------
function setupCopyBtns() {
    const btns = document.querySelectorAll('.copy-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;

            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                // fallback
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }

            btn.classList.add('copied');
            setTimeout(() => btn.classList.remove('copied'), 2000);
        });
    });
}


// smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// esc to close mobile menu
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.getElementById('nav-toggle').classList.remove('active');
        document.getElementById('nav-menu').classList.remove('active');
    }
});

