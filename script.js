// script.js

let cart = [];
let shoppingHistory = JSON.parse(localStorage.getItem('shoppingHistory')) || [];

function login() {
    // Implement login logic here
    alert('Logged in successfully!');
}

function createAccount() {
    // Display the create account form
    document.getElementById('client-form').scrollIntoView();
}

function continueAsGuest() {
    // Allow user to continue as guest
    alert('Continuing as guest...');
    document.getElementById('catalog').scrollIntoView();
}

function addToCart(product, price) {
    const quantity = document.querySelector(`#quantity${product === 'Product 1' ? '1' : '2'}`).value;
    const item = {
        product: product,
        price: price,
        quantity: parseInt(quantity)
    };
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.product}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price * item.quantity}</p>
                <button onclick="removeFromCart('${item.product}')">Remove</button>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    updateCart();
}

function proceedToPayment() {
    alert('Proceeding to payment...');
    shoppingHistory.push(...cart);
    localStorage.setItem('shoppingHistory', JSON.stringify(shoppingHistory));
    cart = [];
    updateCart();
    updateShoppingHistory();
}

function submitClientInfo() {
    const clientInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value
    };
    console.log('Client Info:', clientInfo);
    alert('Client information submitted!');
}

function updateShoppingHistory() {
    const historyDiv = document.getElementById('shopping-history');
    historyDiv.innerHTML = '';
    shoppingHistory.forEach(item => {
        historyDiv.innerHTML += `
            <div class="history-item">
                <h3>${item.product}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price * item.quantity}</p>
            </div>
        `;
    });
}

// Initialize shopping history display
updateShoppingHistory();
