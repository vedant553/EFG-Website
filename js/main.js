/* -------------------------------------------------------------
   EIGHT FOLD GROUP - PREMIUM INTERACTIVE LOGIC (JAVASCRIPT)
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAV & FLOATING QUICK ENQUIRY BUTTON
    const header = document.getElementById('main-header');
    const floatingCta = document.querySelector('.floating-cta');
    const heroSection = document.getElementById('home');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Header sticky state
        if (scrollPos > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Floating CTA state
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollPos > heroHeight - 100) {
                floatingCta.classList.add('show');
            } else {
                floatingCta.classList.remove('show');
            }
        }
    });


    // 2. MOBILE MENU DRAWER TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            if (mobileMenuBtn.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                const bars = mobileMenuBtn.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }


    // 3. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px', // adjustment for header height
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));


    // 4. TESTIMONIALS SLIDER
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Reset active states
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Handle overflow
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Set active
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        slideInterval = setInterval(nextSlide, 5000); // auto slide every 5 seconds
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event Listeners for Controls
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoplay(); // reset timer on user interaction
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startAutoplay();
        });
    });

    // Start sliding if slides exist
    if (slides.length > 0) {
        startAutoplay();
    }


    // 5. ENQUIRY FORM HANDLER WITH FLOATING LABELS
    const enquiryForm = document.getElementById('enquiry-form');
    const formResponse = document.getElementById('form-response');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email-id').value.trim();
            const phone = document.getElementById('phone-number').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                showResponse('Please fill in all the required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                
                // Show custom elegant success message
                showResponse(`Thank you, ${name}! Your enquiry has been sent successfully. Our contracting team will contact you shortly.`, 'success');
                
                // Reset form fields
                enquiryForm.reset();
            }, 1500);
        });
    }

    function showResponse(message, type) {
        if (formResponse) {
            formResponse.innerText = message;
            formResponse.className = 'form-response ' + type;
            
            // Auto hide after 8 seconds
            setTimeout(() => {
                formResponse.className = 'form-response';
                formResponse.innerText = '';
            }, 8000);
        }
    }
});
