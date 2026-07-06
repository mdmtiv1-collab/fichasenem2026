document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DYNAMIC DATE FOR ANNOUNCEMENT BAR
    // ==========================================
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateSpan.textContent = `${day}/${month}/${year}`;
    }

    // ==========================================
    // SUBJECT TABS INTERACTIVITY
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Deactivate all panes
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate current button
            button.classList.add('active');
            // Activate current pane
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ==========================================
    // FAQ ACCORDION INTERACTIVITY
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items first (optional, for single open style)
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // CHECKOUT & MODAL INTERACTIVITY
    // ==========================================
    const checkoutModal = document.getElementById('checkout-modal');
    const successModal = document.getElementById('success-modal');
    const openCheckoutBtn = document.getElementById('btn-checkout');
    const headerCtaBtn = document.querySelector('.header-cta a');
    const closeBtns = document.querySelectorAll('.modal-close, #btn-success-close');
    const checkoutForm = document.getElementById('checkout-form');
    const successEmail = document.getElementById('success-email');

    // Function to open modal
    const openModal = (modal) => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Disable scroll background
    };

    // Function to close modal
    const closeModal = (modal) => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scroll background
    };

    // Event listeners to open checkout (Desativado para ir direto para o link da Wiapy)
    /*
    if (openCheckoutBtn) {
        openCheckoutBtn.addEventListener('click', () => openModal(checkoutModal));
    }
    
    if (headerCtaBtn) {
        headerCtaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(checkoutModal);
        });
    }
    */

    // Close buttons logic
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(checkoutModal);
            closeModal(successModal);
        });
    });

    // Close when clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeModal(checkoutModal);
        }
        if (e.target === successModal) {
            closeModal(successModal);
        }
    });

    // Form submission simulation
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email').value;
            successEmail.textContent = emailInput;
            
            // Close checkout modal
            closeModal(checkoutModal);
            
            // Open success modal
            setTimeout(() => {
                openModal(successModal);
                
                // Add some basic confetti or success effect (simulated console notification)
                console.log('%c Fichas ENEM: Compra simulada com sucesso para ' + emailInput + '! 🎉', 'color: #059669; font-weight: bold; font-size: 14px;');
            }, 300);
        });
    }

    // ==========================================
    // SAMPLE CARD SLIDER SCROLL INDICATOR SYNC
    // ==========================================
    const slider = document.querySelector('.slider-wrapper');
    const thumb = document.getElementById('slider-thumb');
    
    if (slider && thumb) {
        slider.addEventListener('scroll', () => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (maxScroll <= 0) return;
            
            const scrollPercent = (slider.scrollLeft / maxScroll) * 100;
            
            // Map scrollPercent to thumb position
            const trackWidth = thumb.parentElement.clientWidth;
            const thumbWidth = thumb.clientWidth;
            const maxTravelPercent = ((trackWidth - thumbWidth) / trackWidth) * 100;
            
            const newLeft = (scrollPercent / 100) * maxTravelPercent;
            thumb.style.left = `${newLeft}%`;
        });
    }

    // ==========================================
    // ACCESSIBILITY & ESCAPE KEY CLOSE
    // ==========================================
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(checkoutModal);
            closeModal(successModal);
        }
    });
});
