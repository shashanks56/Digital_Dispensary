function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cartItems');
    let cartSummaryDiv = document.getElementById('cartSummary');
    cartItemsDiv.innerHTML = '';
    cartSummaryDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalItems = cart.length;
    let totalPrice = cart.reduce((total, product) => total + product.price, 0);

    cartSummaryDiv.innerHTML = `
        <p>Total Items: ${totalItems}</p>
        <p>Total Price: ₹${totalPrice}</p>
    `;

    cart.forEach((product, index) => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="removeFromCart(${index})" class="btn">Remove</button>
            </div>
        `;
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

window.onload = displayCart;



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


document.getElementById('categorySelect').addEventListener('change', function () {
    let category = this.value;
    let items = document.querySelectorAll('.Medicine-item');

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});