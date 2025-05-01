cartSectionToggle()
updateItemCount()
showCustomization()
addToCart()


function cartSectionToggle(){
    const cart = document.querySelector('#cart-section');
    cart.style.display = 'none';
    document.querySelector('.btn-cart').addEventListener('click', function() {
        
        if (cart.style.display === 'none' || cart.style.display === '') {
            cart.style.display = 'flex';
        } else {
            cart.style.display = 'none';
        }
    });
}

function updateItemCount(){
    let updateCount;
    let foodItem = document.querySelectorAll(".item");

    foodItem.forEach(item =>{
        let itemCount = item.querySelector(".item-total")
        let itemInc = item.querySelector(".plus")
        let itemDec = item.querySelector(".minus")

        itemIncrement(itemInc,itemCount)

        itemDecrement(itemDec,itemCount)
        
    })
}

function itemIncrement(itemInc,count){
    let updateCount;
    itemInc.addEventListener("click" , ()=>{
        updateCount = Number(count.textContent)
        if(updateCount >= 0){
            count.textContent = updateCount + 1;
        }
        
    })
}

function itemDecrement(itemDec,count){
    itemDec.addEventListener("click" , ()=>{
        updateCount = Number(count.textContent)
        if(updateCount > 0){
            count.textContent = updateCount - 1
        }
        
    })
}

function showCustomization(){
    let customizeSection = document.querySelector(".customize-item-container")
    let mainSection = document.querySelector("#main")
    let customizeBtn = document.querySelector('.customize')
    let navbar = document.querySelector('.nav-bar');
    let navLeftChild = document.querySelector('.nav-bar .left');

    document.querySelectorAll(".item").forEach(items=>{
        customizeBtn.addEventListener('click',()=>{
        
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
}

function addToCart(){
    const currentItem = document.querySelectorAll('.item')
    const btnCart = document.querySelectorAll('.btn-addToCart')


    btnCart.forEach(button =>{
        button.addEventListener('click',()=>{

            const item = button.closest('.item');

            //storing the current item values to display in cart section
            const imageItem = item.querySelector('.item-image')
            const imageUrl = imageItem.getAttribute('src')
            const itemName = item.querySelector('.item-name').textContent
            const itemDetail = item.querySelector('.item-detail').textContent
            const itemSize = item.querySelector('#sizes').value;
            const itemCount = item.querySelector('.item-total').textContent

            //displaying the stored item values in cart section
            let cartItem = document.querySelector('.cart-item')
            let cartItemImage = document.querySelector('.img-cartItem')
            let cartItemName = document.querySelector('.name-cartItem')
            let cartItemSize = document.querySelector('.size-cartItem')
            let cartItemCount = document.querySelector('.item-total')

            cartItemImage.setAttribute('src',imageUrl)
            cartItemName.textContent = itemName
            cartItemSize.textContent = itemSize
            cartItemCount.textContent = itemCount
            

            alert('item added to cart')
            const cart = document.querySelector('#cart-section');
            cart.style.display = 'flex';
            
        })//end of event listener

    })//end of 

    
    
}//end of addToCart() function


