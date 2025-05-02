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
    const cartItemsContainer = document.querySelector('.cart-items')
    const cartItemTemplate = document.querySelector('.cart-item')
    const cartSection = document.querySelector('#cart-section')
    

    //Remove the cartItem template from the DOM, but keep it in memory to clone later
    cartItemTemplate.remove()


    btnCart.forEach(button =>{
        button.addEventListener('click', ()=> {

            //Find the closest parent element with the class "item" for the clicked button
            const item = button.closest('.item');

            //storing the current item values to display in cart section
            const imageItem = item.querySelector('.item-image')
            const imageUrl = imageItem.getAttribute('src')
            const itemName = item.querySelector('.item-name').textContent
            const itemDetail = item.querySelector('.item-detail').textContent
            const itemSize = item.querySelector('#sizes').value;
            const itemCount = item.querySelector('.item-total').textContent

        
            //must select item count in order to add to cart
            if(itemCount<=0){
                alert('select the quantity of the' + itemName)
                return
            }
            //check if item is already in cart
            let itemAlreadyExits = null;

            let cartItems = cartItemsContainer.querySelectorAll('.cart-item');
            cartItems.forEach(cartItem =>{
                let cartItemName = cartItem.querySelector('.name-cartItem').textContent
                let cartItemSize = cartItem.querySelector('.size-cartItem').textContent

                if(cartItemName === itemName && cartItemSize === itemSize){
                    itemAlreadyExits = cartItem;
                }
            })

            if(itemAlreadyExits){
                //update the quantity of the existing item
                let existingItemCount = Number(itemAlreadyExits.querySelector('.item-total').textContent)
                itemAlreadyExits.querySelector('.item-total').textContent = Number(itemCount) + existingItemCount;
                alert('item count updated')

            }
            else{
                // Clone the template cart item and make it visible
                let cloneItem = cartItemTemplate.cloneNode(true)
                cloneItem.style.display = 'grid'


                //CHANGED: Instead of querying the document, we query inside the cloned item
                let cartItem = cloneItem.querySelector('.cart-item')
                let cartItemImage = cloneItem.querySelector('.img-cartItem')
                let cartItemName = cloneItem.querySelector('.name-cartItem')
                let cartItemSize = cloneItem.querySelector('.size-cartItem')
                let cartItemCount = cloneItem.querySelector('.item-total')

                
                
                //Filling in the cloned cart item with actual values
                cartItemImage.setAttribute('src',imageUrl)
                cartItemName.textContent = itemName
                cartItemSize.textContent = itemSize
                cartItemCount.textContent = itemCount


                //Add the filled clone to the cart container
                cartItemsContainer.appendChild(cloneItem);
                alert('item added to cart')
            

            }
            //show the cart section
            cartSection.style.display = 'flex'

        })//end of event listener

    })//end of 

}//end of addToCart() function


