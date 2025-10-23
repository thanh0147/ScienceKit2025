/* MENU */
const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Hide menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* SHADOW HEADER */
const shadowHeader = () =>{
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)


/* Sign up */ 
document.addEventListener('DOMContentLoaded', function () {
    // Form submission
    document.getElementById('signUpForm').addEventListener('submit', function (event) {
        event.preventDefault();
        alert('¡Creaste tu usuario! ¡Puedes comer papitas donde quieras!');
    });

    // Google sign up button
    document.getElementById('googleSignUp').addEventListener('click', function () {
        window.location.href = 'https://accounts.google.com/signin/v2/identifier?service=mail';
    });
})


/* SWIPER SLIDER */ 
document.addEventListener('DOMContentLoaded', function () {
    const swiperFavorites = new Swiper('.favorites__swiper', {
        loop: true,
        grabCursor: true,
        slidesPerView: 'auto',
        centeredSlides: 'auto',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        
        // Stop on hover
        on: {
            init: function () {
                const swiperInstance = this;
                const swiperContainer = document.querySelector('.favorites__swiper');
                swiperContainer.addEventListener('mouseenter', () => {
                    swiperInstance.autoplay.stop();
                });
                swiperContainer.addEventListener('mouseleave', () => {
                    swiperInstance.autoplay.start();
                });
            },
        },
    });
})


/* SHOW SCROLL UP */ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    const footer = document.querySelector('footer')

	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);


/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
    const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			sectionTop = current.offsetTop - 58,
			sectionId = current.getAttribute('id'),
			sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


/* JQUERY */
/* Show login */
$(document).ready(function() {
    // Show overlay
    $('#btnLogin').click(function() {
        const button = $(this);
        const buttonOffset = button.offset();
        const overlaySize = 358;

        $('.overlay').css({
            bottom: buttonOffset.bottom,
            width: overlaySize + 27,
            height: overlaySize,
            display: 'flex'
        });
        $('#loginOverlay').fadeIn();
    });

    // Hide overlay
    $('#closeButton').click(function() {
        $('#loginOverlay').fadeOut();
    });

    // Mouse up to close overlay
    $(document).mouseup(function(e) {
        const container = $(".home__login");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('#loginOverlay').fadeOut();
        }
    });

    // Send login form
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        console.log("Usuario:", username, "Contraseña:", password);

        $('#loginOverlay').fadeOut();
    });
});

$(document).ready(function() {
    let cart = [];

    function updateCartDisplay() {
        $('#cartCount').text(cart.length);
        let total = 0;
        let cartItemsHTML = '';
        cart.forEach(item => {
            const productTotal = item.price * item.quantity;
            total += productTotal;
            cartItemsHTML += `
                <p>${item.name} - ${item.quantity} x $${item.price} = $${productTotal.toFixed(2)}</p>
            `;
        });
        $('#cartItems').html(cartItemsHTML);
        $('#cartTotal').text(total.toFixed(2));
    }

    function findProductIndex(name) {
        return cart.findIndex(item => item.name === name);
    }

    $('.increment').click(function() {
        const card = $(this).closest('.products__card');
        const title = card.find('.products__title').text();
        const price = parseFloat(card.find('.products__price').text().replace('$', '').replace('.', '').replace(',', '.'));

        const quantityInput = card.find('.product-quantity');
        let quantity = parseInt(quantityInput.val());
        quantity++;
        quantityInput.val(quantity);

        const productIndex = findProductIndex(title);
        if (productIndex > -1) {
            cart[productIndex].quantity = quantity;
        } else {
            cart.push({ name: title, price: price, quantity: quantity });
        }

        updateCartDisplay();
    });

    $('.decrement').click(function() {
        const card = $(this).closest('.products__card');
        const title = card.find('.products__title').text();
        const price = parseFloat(card.find('.products__price').text().replace('$', '').replace('.', '').replace(',', '.'));

        const quantityInput = card.find('.product-quantity');
        let quantity = parseInt(quantityInput.val());
        if (quantity > 0) {
            quantity--;
            quantityInput.val(quantity);

            const productIndex = findProductIndex(title);
            if (productIndex > -1) {
                if (quantity > 0) {
                    cart[productIndex].quantity = quantity;
                } else {
                    cart.splice(productIndex, 1);
                }
            }

            updateCartDisplay();
        }
    });

    $('#checkoutButton').click(function() {
        window.location.href = 'checkout.html';
    });
});

$(document).ready(function() {
    $('#dispatchForm').submit(function(event) {
        event.preventDefault();
        $('#confirmationModal').fadeIn().delay(5000).fadeOut(function() {
            window.location.href = 'products.html';
        });
    });
});

$(document).ready(function() {
    $('#salesTable').DataTable();
});