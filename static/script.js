let currentIndex = 0;

function moveCarousel(direction) {
    const carouselItems = document.querySelector('.carousel-items');
    const totalItems = carouselItems.children.length;
    const itemWidth = carouselItems.children[0].offsetWidth;

    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalItems;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    const offset = -currentIndex * itemWidth;
    carouselItems.style.transform = `translateX(${offset}px)`;
}

/*addingsssssssss*/

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}



function performSearch() {
    const query = document.getElementById('search-box').value;

    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsContainer.innerHTML = '<p>No results found</p>';
                return;
            }

            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                `;
                resultsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching search results:', error));
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        performSearch();
    }
}



/* feature for number of items in cart*/

// scripts.js
// scripts.js
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    document.getElementById('cartCount').innerText = cartCount;
}

function addToCart(productName, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = { name: productName, price: price, image: imageUrl };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' has been added to your cart');
    updateCartCount();  // Update cart count after adding a product
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();  // Update cart count after removing a product
}

window.onload = function() {
    updateCartCount();
    if (typeof displayCart === 'function') {
        displayCart();
    }
};






