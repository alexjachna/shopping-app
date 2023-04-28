// Global Variables
var checkoutButton = document.getElementById('sccb-checkout');
var noItemDisclaimer = document.getElementsByClassName('no-items-disclaimer');
var browseButtons = document.querySelector('#browse-button');

// Hamburger Menu
hamburger = document.querySelector("#hamburger-menu");
exitButton = document.querySelector("#exit-button");
exitDiv = document.querySelector("#exit-out-div");

hamburger.onclick = function() {
    navBar = document.querySelector("#nav-bar");
    navBar.classList.toggle("active");
    exitDiv.classList.toggle("active");
}

exitButton.onclick = function() {
    navBar = document.querySelector("#nav-bar");
    navBar.classList.toggle("active");
    exitDiv.classList.toggle("active");
}

exitDiv.onclick = function() {
    navBar = document.querySelector("#nav-bar");
    navBar.classList.toggle("active");
    exitDiv.classList.toggle("active");
}

function showCart() {
    document.getElementById('shopping-cart').style.display = "flex";
}

function hideCart() {
    document.getElementById('shopping-cart').style.display = "none";
}

function addToCart(item) {
    // Grab the entire product item div
    var shopItem = item.parentElement.parentElement;

    updateCheckoutButton();
    addItem(shopItem);  
}

function updateCounter(ifAdded) { 
    var counter = document.getElementsByClassName('items-counter')[0];
    var counterNum = counter.innerText;

    var cartCounter = document.getElementsByClassName('shopping-cart-quantity')[0];
    var cartCounterNum = cartCounter.innerText;

    if (ifAdded) {
        counter.innerText = Number(counterNum) + 1;
        cartCounter.innerText = Number(cartCounterNum) + 1;
        cartCounter.style.display = 'block';
    } else {
        counter.innerText = Number(counterNum) - 1;
        cartCounter.innerText = Number(cartCounterNum) - 1;
        cartCounter.style.display = 'block';
    }

    cartCounterNum = cartCounter.innerText;

    // Check if cart is empty
    if (Number(cartCounterNum) == 0) {
        cartCounter.style.display = 'none';
    }

    console.log(cartCounterNum);
}

function updateCheckoutButton() {
    if (noItemDisclaimer.length != 0) {
        noItemDisclaimer[0].remove();
        checkoutButton.style.opacity = 0.8;
        checkoutButton.style.cursor = "pointer";
    }
}

function changeTotal(price, ifAdded) {
    var totalPrice = document.getElementsByClassName('sccb-total')[0];
    var currentTotal = totalPrice.innerText.slice(8);
    var finalTotal;

    if (ifAdded) {
        finalTotal = Number(currentTotal) + Number(price);
        updateCounter(true);
    } else {
        finalTotal = Number(currentTotal) - Number(price);
        updateCounter(false);
    }

    parseFloat(finalTotal);
    totalPrice.innerText = "Total: $" + finalTotal;  
}

function addItem(shopItem) {
    var title = shopItem.getElementsByClassName('product-title')[0].innerText;
    var price = shopItem.getElementsByClassName('product-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('product-image')[0].src;

    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-item');
    var cartItems = document.getElementById('shopping-cart-container-items');
    var cartRowContent = `
            <img class="cart-item-image" src="${imageSrc}" width="80px">
            <span class="cart-item-title">${title}</span>
            <span class="cart-item-price">${price}</span>
            <button onclick="removeItem(this)">Remove</button>`

    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);  

    changeTotal(price.slice(1), true);
}

function removeItem(item) {
    var cartItems = document.getElementById('shopping-cart-container-items');
    var cartItem = item.parentElement;
    var cartItemPrice = cartItem.getElementsByClassName('cart-item-price')[0].innerText;
    var cartDisclaimerItem = document.createElement('p');
    cartDisclaimerItem.classList.add('no-items-disclaimer');
    cartDisclaimerItem.innerText = 'No Items to Display.';

    item.parentElement.remove();

    changeTotal(cartItemPrice.slice(1), false);

    var itemsLeft = cartItems.children.length;

    if (itemsLeft == 0) {
        cartItems.append(cartDisclaimerItem);
        checkoutButton.style.opacity = 0.5;
        checkoutButton.style.cursor = "not-allowed";
    }
    else {
        return;
    }
}

// Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
        else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
