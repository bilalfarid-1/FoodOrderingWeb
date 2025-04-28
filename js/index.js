document.querySelector('.btn-cart').addEventListener('click', function() {
    const cart = document.querySelector('#cart-section');
    if (cart.style.display === 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}
);