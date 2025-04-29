const cart = document.querySelector('#cart-section');
cart.style.display = 'none';
document.querySelector('.btn-cart').addEventListener('click', function() {
    
    if (cart.style.display === 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}
);

let updateCount;
let foodItem = document.querySelectorAll(".item");

foodItem.forEach(item =>{
    let itemCount = item.querySelector(".item-total")
    let itemIncrement = item.querySelector(".plus")
    let itemDecrement = item.querySelector(".minus")

    itemIncrement.addEventListener("click" , ()=>{
        updateCount = Number(itemCount.textContent)
        itemCount.textContent = updateCount + 1;
    })
    itemDecrement.addEventListener("click" , ()=>{
        updateCount = Number(itemCount.textContent)
        if(updateCount > 0){
            itemCount.textContent = updateCount - 1
        }
        
    })

})

// console.log(itemCount)

