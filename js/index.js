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


let customizeSection = document.querySelector(".customize-item-container")
let mainSection = document.querySelector("#main")
let navbar = document.querySelector('.nav-bar');
let navLeftChild = document.querySelector('.nav-bar .left');

document.querySelectorAll(".item").forEach(items=>{
    items.addEventListener('click',()=>{
       
        mainSection.style.display = 'none'
        customizeSection.style.display = 'grid'

        if(!document.querySelector("#btn-back")){
            const backButton = document.createElement('button')
            backButton.id = 'btn-back'
            backButton.textContent = '←'
            backButton.style.fontWeight = 'bold'
            backButton.style.marginRight = '10px';
            backButton.onclick = goBack;
            navLeftChild.insertBefore(backButton, navLeftChild.firstChild);
        }

        function goBack() {
            customizeSection.style.display = 'none';
            mainSection.style.display = 'grid'; // or 'block'
          
            // Remove back button
            const backButton = document.getElementById('btn-back');
            if (backButton) {
              backButton.remove();
            }
          }
          
    })
})



