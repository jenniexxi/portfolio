(function () {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.matchMedia({

    // 크기에 따라

    // 공통 모션
    "all": function () {

      // mouse
      const cursor = document.querySelector('.cursor');
      function moveCursor(e) {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
      };

      function setCursorStyle(bgColor, scale) {
        gsap.to(cursor, { backgroundColor: bgColor, duration: 0.3 });
        gsap.to(cursor, { scale: scale });
      };

      function showThumbBox() {
        gsap.to(cursor, { scale: 2 });
        gsap.to(cursor.querySelector('span'), { visibility: 'visible', opacity: 1 });
      };

      function hideThumbBox() {
        gsap.to(cursor, { scale: 1 });
        gsap.to(cursor.querySelector('span'), { visibility: 'hidden', opacity: 0 });
      };

      document.body.addEventListener('mousemove', moveCursor);

      const hoverElements = document.querySelectorAll('.footer .footer__area, .header .nav-item');
      hoverElements.forEach(function (element) {
        element.addEventListener('mouseover', function () {
          setCursorStyle('#FFFF00', 0.5);
        });
        element.addEventListener('mouseleave', function () {
          setCursorStyle('#fff', 1);
        });
      });

      const thumbBox = document.querySelectorAll('.sc-project .thumb-box');
      thumbBox.forEach(function (element) {
        element.addEventListener('mouseover', showThumbBox);
        element.addEventListener('mouseleave', hideThumbBox);
      });


      // load 애니메이션
      const loadAni = gsap.timeline({
        onComplete: function () {
          visualTextAni.gsapFnc();
        }
      });

      loadAni
        .addLabel('beginning')
        .from('.load__page .title-load span:first-child', { opacity: 0, xPercent: -150, duration: 1.5 }, 'beginning')
        .from('.load__page .title-load span:last-child', { opacity: 0, xPercent: 150, duration: 1.5 }, 'beginning')
        .from('.load__page .line', { height: 0, duration: 1, delay: 1, ease: Power4.easeInOut }, 'beginning')
        .to('.load__page .title-load', { opacity: 0, delay: 2.5, duration: 1 }, 'beginning')
        .to('.load__page .line', { opacity: 0, delay: 2.5, duration: 1 }, 'beginning')
        .to('.load__page', { height: 0, delay: 3, ease: Power4.easeIn }, 'beginning')
      loadAni;

      const visualTextAni = {
        gsapFnc: function () {
          gsap.set('.sc-visual .txt__area span', {
            rotateX: 90,
            skewY: 15,
            rotateY: 10,
            opacity: 0,
          });

          gsap.to('.sc-visual .txt__area span', {
            rotateX: 0,
            skewY: 0,
            rotateY: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
          });
        }
      };


      // about - text
      const aboutAddiMotion = gsap.timeline({
        scrollTrigger: {
          trigger: '.sc-about',
          start: '20% 70%',
          end: '100% 0%',
        }
      });

      aboutAddiMotion
        .to('.sc-about .addition', {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        });

      gsap.set('.sc-about .title .word', { yPercent: 100 });
      const aboutTextAni = gsap.timeline({
        scrollTrigger: {
          trigger: '.sc-about',
          start: '40% 70%',
          end: '100% 0%',
        }
      });

      aboutTextAni
        .to('.sc-about .title .word', {
          paused: false,
          yPercent: 0,
          ease: Power4.easeInOut
        });



      // project
      const projectMotion = gsap.timeline({
        scrollTrigger: {
          trigger: '.sc-project',
          start: '0% 20%',
          end: '100% 0%',
        },
        defaults: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          stagger: .8
        }
      })

      projectMotion
        .to('.sc-project .link-portfolio', {})



      // goal
      window.addEventListener('load', function () {
        document.querySelectorAll('.spread').forEach(function (spread) {
          spread.addEventListener('mouseover', function () {
            this.classList.add('on');
            Array.from(this.parentNode.children).forEach(function (sibling) {
              sibling.style.opacity = (sibling === spread) ? '1' : '0.1';
            });
          });
          spread.addEventListener('mouseout', function () {
            this.classList.remove('on');
            Array.from(this.parentNode.children).forEach(function (sibling) {
              sibling.style.opacity = '1';
            });
          });
        });
      });

      const goalTextAni = gsap.timeline({
        scrollTrigger: {
          trigger: '.sc-goal',
          start: 'top center',
          toggleActions: 'restart none restart none',
        }
      });

      goalTextAni
        .from('.sc-goal .txt__area', {
          yPercent: 100,
          duration: 1,
        });



      // menu click - move
      function scrollToSection(hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      document.addEventListener('click', (e) => {
        const target = e.target.closest('.nav__area .nav');
        if (target) {
          e.preventDefault();
          const hash = target.getAttribute('href');
          scrollToSection(hash);
        }
      });
        

    }

  });

})();


