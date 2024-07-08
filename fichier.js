const emailInput = document.getElementById('emailInput');

const bouton = document.getElementById('bouton');


bouton?.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const emailValue = emailInput.value;

    if (emailValue.trim() !== '') {
        // Récupérer les valeurs existantes depuis localStorage
        let existingEmails = JSON.parse(localStorage.getItem('userEmails')) || [];

        existingEmails.push(emailValue);

        localStorage.setItem('userEmails', JSON.stringify(existingEmails));

        emailInput.value = '';
    } else {
        alert('Veuillez entrer votre adresse e-mail.');
    }
});
const categories = document.getElementsByClassName('category');

if (categories.length > 0) {
    for (let category of categories) {
        category.addEventListener('click', (event) => {
            if (event.target.nodeName == "P" || event.target.nodeName == "IMG") {
                const pageName = event.target.parentElement.id
                if (pageName) {
                    window.location.href = `http://127.0.0.1:5501/${pageName}.html`;
                }
            } else {
                const pageName = event.target.id
                if (pageName) {
                   window.location.href = `http://127.0.0.1:5501/${pageName}.html`;
                }
            }
        })

    }
}

document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.list');
            const productId = productElement.getAttribute('product-id');
            const productName = productElement.getAttribute('product-name');
            const productPrice = productElement.getAttribute('product-price');
            const productImage = productElement.getAttribute('product-image');
            const productDescription = productElement.getAttribute('product-description')
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                description: productDescription
            };
            addToCart(product);
            cartCount()
            // window.location.href = 'http://127.0.0.1:5501/panier.html' ;
        });
    });

    function addToCart(product) {
        cart.push(product);
        // const cartCount = document.getElementById('cart-')
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function cartCount() {
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = cart.length;
    }

});

document.addEventListener('DOMContentLoaded', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemsContainer = document.getElementById('cart-items');
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<h2>Votre panier est vide.</h2>';
            } else {
                cart.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <p>${product.name}</p>
                        <p>Description: ${product.description}</p>
                        <p>Prix: ${product.price}</p>

                    `;
                    cartItemsContainer.appendChild(productElement);
                });
            }
        });