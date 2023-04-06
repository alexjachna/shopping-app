function showCart() {
    document.getElementById('shopping-cart').style.display = "flex";
}

function hideCart() {
    document.getElementById('shopping-cart').style.display = "none";
}

function addToCart(item) {
    var noItemDisclaimer = document.getElementsByClassName('no-items-disclaimer');

    if (noItemDisclaimer.length != 0) {
        noItemDisclaimer[0].remove();
    }
    
    var shopItem = item.parentElement.parentElement;

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

    console.log(imageSrc);
}

function removeItem(item) {
    var cartItems = document.getElementById('shopping-cart-container-items');
    var cartDisclaimerItem = document.createElement('p');
    cartDisclaimerItem.classList.add('no-items-disclaimer');

    item.parentElement.remove();
    var itemsLeft = cartItems.children.length;

    if (itemsLeft == 0) {
        cartItems.append(cartDisclaimerItem.innerText = "No Items to Display.");
    }
    else {
        return;
    }
}
