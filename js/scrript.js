document.addEventListener("DOMContentLoaded", function () {
    /* ========== Smooth Scrolling ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#" || !targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ========== Navbar Active State on Scroll ========== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    });

    /* ========== Scroll Animation ========== */
    const scrollElements = document.querySelectorAll(".animate-on-scroll, .design-block");
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated", "visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => scrollObserver.observe(el));

    /* ========== Lazy Loading Images ========== */
    const lazyImages = document.querySelectorAll("img.lazy");
    if ("IntersectionObserver" in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    observer.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(img => lazyImageObserver.observe(img));
    }

    /* ========== Services Page Animations ========== */
    const serviceCards = document.querySelectorAll('.servicepage-card');
    if (serviceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    /* ========== Dynamic Hover Color for Tags ========== */
    const tags = document.querySelectorAll('.service-tag');
    const colors = ['#E33FA1', '#5f27cd', '#FB5343', '#6549D5', '#48dbfb'];
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.backgroundColor = randomColor;
            tag.style.color = 'white';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.backgroundColor = 'white';
            tag.style.color = '#222';
        });
    });

    /* ========== Navbar Scroll + Mobile Toggle ========== */
    const navbar = document.querySelector('.navbar');
    const toggler = document.getElementById('navbar-toggler');
    const menu = document.getElementById('navbar-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (toggler && menu) {
        toggler.addEventListener('click', () => {
            toggler.classList.toggle('active');
            menu.classList.toggle('open');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggler.classList.remove('active');
                menu.classList.remove('open');
            });
        });
    }

    /* ========== Testimonial Page Animations ========== */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    /* ========== Contact Page Interactive Options ========== */
    const contactOptions = document.querySelectorAll('.contactpagesection-option');
    const optionDetails = document.querySelectorAll('.contactpagesection-option-details');
    contactOptions.forEach(option => {
        option.addEventListener('click', () => {
            contactOptions.forEach(opt => opt.classList.remove('active'));
            optionDetails.forEach(detail => detail.classList.remove('active'));
            option.classList.add('active');
            const optionType = option.getAttribute('data-option');
            const detailsElement = document.getElementById(`${optionType}-details`);
            if (detailsElement) detailsElement.classList.add('active');
        });
    });

    /* ========== FAQ Accordion ========== */
    const faqItems = document.querySelectorAll('.contactpagesection-faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.contactpagesection-faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /* ========== Portfolio Section ========== */
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    function openLightbox(index) {
        const item = portfolioItems[index];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.portfolio-item-title').textContent;
        const desc = item.querySelector('.portfolio-item-desc').textContent;
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        openLightbox(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        openLightbox(currentIndex);
    }

    if (portfolioItems.length > 0) {
        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    if (prevBtn) prevBtn.addEventListener('click', prevItem);
    if (nextBtn) nextBtn.addEventListener('click', nextItem);

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') nextItem();
        else if (e.key === 'ArrowLeft') prevItem();
    });

    /* ========== Portfolio Filter Buttons ========== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
