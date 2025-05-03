cartSectionToggle()
updateItemCount()
showCustomization()
addToCart()
// editCart()
// calculateCartTotal()


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
    let total = null;
    

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
            let itemPrice = item.querySelector('.item-price').textContent
            total = parseInt(itemPrice) * parseInt(itemCount)
            
        
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
                
                itemAlreadyExits.querySelector('.price-cartItem').textContent = (Number(itemCount) + Number(existingItemCount)) * Number(itemPrice);
                
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
                let cartItemPrice = cloneItem.querySelector('.price-cartItem')

                
                
                //Filling in the cloned cart item with actual values
                cartItemImage.setAttribute('src',imageUrl)
                cartItemName.textContent = itemName
                cartItemSize.textContent = itemSize
                cartItemCount.textContent = itemCount
                cartItemPrice.textContent = total


                //Add the filled clone to the cart container
                cartItemsContainer.appendChild(cloneItem);
                alert('item added to cart')
                
                

            }
            //show the cart section
            cartSection.style.display = 'flex'

            /////////////////////////////////
            editCart()
            calculateCartTotal()


        })//end of event listener

    })//end of 

}//end of addToCart() function

function editCart(){
    // let itemCount;
    // let cartItem = cloneCartItem.querySelectorAll('.cart-item');
    // cartItem.forEach(item => {
    //     let btnPlus = item.querySelector('.plus')
    //     let btnMinus = item.querySelector('.minus')
    //     let count = item.querySelector('.item-total')
    //     let btnCustomize = item.querySelector('.customize')
    //     let btnDelete = item.querySelector('.delete')



    // })

    // btnPlus.addEventListener('click', () => {
    //     alert('i got clicked')
    // })
    // document.querySelector('.cart-item').addEventListener('click', () => {
    //     console.log("cart div got clicked");
    // });
    //selecting all cart items
    const cartItems = document.querySelectorAll('.cart-item');

    //looping through each cart item
    cartItems.forEach(cartItem =>{
        let btnMinus = cartItem.querySelector('#minus')
        let btnPlus = cartItem.querySelector('#plus')
        let itemCount = cartItem.querySelector("#item-total")
        let itemRemove = cartItem.querySelector('#delete')
        itemRemove.addEventListener('click', ()=> {
            cartItem.remove();
            calculateCartTotal()
        })

        // btnMinus.addEventListener('click', ()=> {
        //     itemCount.textContent = Number(itemCount.textContent) - 1;
        //     calculateCartTotal()
        // })


        itemIncrement(btnPlus,itemCount)
        itemDecrement(btnMinus,itemCount)
        

        })

        // let itemCount = item.querySelector(".item-total")
        // let itemInc = item.querySelector(".plus")
        // let itemDec = item.querySelector(".minus")
        // itemIncrement(itemInc,itemCount)

        // itemDecrement(itemDec,itemCount)

}



function calculateCartTotal(){
    let totalPrice = 0
    let subTotal = null
    let salesTax = null
    let deliveryCharges = 0;
    let totalBill = null
    //bill container
    const totalSection =  document.querySelector('#cart-total')
    //bill items container
    let SubtotalContainer = totalSection.querySelector('.sub-total')
    let salesTaxContainer = totalSection.querySelector('.sales-tax')
    let deliveryChargesContainer = totalSection.querySelector('.deliver-charges')
    let totalBillContainer = totalSection.querySelector('.total-bill')

    //selecting all cart items
    const cartItems = document.querySelectorAll('.cart-item');

    //looping through each cart item
    cartItems.forEach(cartItem =>{
        let itemPrice = cartItem.querySelector('.price-cartItem').textContent
        totalPrice += Number(itemPrice)
        })
    //subTotal
    subTotal = totalPrice
    SubtotalContainer.textContent = subTotal
    //salesTax = 5%(subTotal)
    salesTax = 0.05 * subTotal
    salesTaxContainer.textContent = salesTax
    //deliveryCharges = 150
    deliveryChargesContainer.textContent = 150
    //totalBill = subTotal + salesTax + deliveryCharges;
    totalBill = subTotal + salesTax + deliveryCharges
    totalBillContainer.textContent = totalBill


}