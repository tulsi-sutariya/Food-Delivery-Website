const filterItem =document.querySelector(".menu-btn")
const filterImg=document.querySelectorAll(".box .box-container")

console.log(filterItem)
window.onload = ()=>{ //after window loaded
  loadCartFromLocalStorage(); //

    filterItem.onclick = (selectedItem)=>{ //if user click on filterItem div
      if(selectedItem.target.classList.contains("btn")){ //if user selected item has .item class
        filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
        selectedItem.target.classList.add("active"); //add that active class on user selected item
        let filterName = selectedItem.target.getAttribute("data-name");
        console.log("hello") //getting data-name value of user selected item and store in a filtername variable
        filterImg.forEach((image) => {
          let filterImges = image.getAttribute("data-name");
         //getting image data-name value
          //if user selected item data-name value is equal to images data-name value
          //or user selected item data-name value is equal to "all"
          if((filterImges == filterName) || (filterName == "all")){
            image.classList.remove("hide"); //first remove the hide class from the image
            image.classList.add("show"); //add show class in image
          }else{
            image.classList.add("hide"); //add hide class in image
            image.classList.remove("show"); //remove show class from the image
          }
        });
      }
    }
      
      
    }
  
document.querySelectorAll('.menu .menu-btn .btn').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.menu .menu-btn .btn.active').classList.remove('active');
        this.classList.add('active');
        
    });
});

document.querySelector('.log-btn').addEventListener('click', () => {
  sessionStorage.setItem('lastPage', window.location.href);
});


// ---------- cart -----------------
//Save Cart to localStorage After Any Change
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
//Load Cart from localStorage When User Returns
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
      cart = JSON.parse(storedCart);
      updateCartCount();
      renderCart();
  }
}


let cart = [];
const emptyCartMessage = document.getElementById('empty-cart');
const cartContainer = document.getElementById('cart-section');

function addToCart(id) {
    const product = document.querySelector(`.box-container[data-id='${id}']`);
    const name = product.dataset.realname;
    const price = parseFloat(product.dataset.price);
    const image = product.dataset.image;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id,name, price, image, quantity: 1 });
    }
    updateCartCount();
    saveCartToLocalStorage(); // ✅ Save after adding
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
   
}


function showCart() {
  if (cart.length === 0) {
    const productSection = document.querySelector('.box')
    const menu_btn = document.querySelector('.menu-btn')


        productSection.style.display= "none";
    menu_btn.style.display="none"
    cartContainer.style.display = "none"; // Hide cart container
    emptyCartMessage.style.display = "flex"; // Show empty messas
    
       return;
   }
    const cartSection = document.getElementById('cart-section');
    const productSection = document.querySelector('.box')
    const menu_btn = document.querySelector('.menu-btn')
    const footer = document.querySelector('footer')

    footer.style.display='block';
    productSection.style.display= "none";
    menu_btn.style.display="none"
    //cartSection.classList.toggle('hidden');
    cartSection.style.display="block";
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
    saveCartToLocalStorage();
    showCart(); // ✅ Save after adding
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartItems.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="50" height="50"></td>
                <td>${item.name}</td>
                <td>
                    <button onclick="changeQuantity(${item.id}, -1)" id="remove">
                    <i class="fa fa-minus" aria-hidden="true"></i></button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                    <button onclick="changeQuantity(${item.id}, 1)" id="add"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.id})" id="delete"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
            </tr>
        `;
    });

    updateCartTotals();
}

// Calculate and update cart totals dynamically
function updateCartTotals() {
  let subtotal = 0;
  let totalQuantity = 0;

  // Calculate subtotal and total quantity
  cart.forEach(item => {
      subtotal += item.price * item.quantity;
      totalQuantity += item.quantity;
  });

  // Calculate dynamic shipping cost based on quantity
  let shipping = 60; // Default base shipping

  if (totalQuantity >= 5 && totalQuantity < 10) {
      shipping += 40; // Add $40 for 5-9 items
  } else if (totalQuantity >= 10) {
      shipping += 50 * Math.floor(totalQuantity / 10); // Add $50 per 10 items
  }

  // Update totals in the UI
  document.getElementById('subtotal').innerText = subtotal.toFixed(2);
  document.getElementById('shipping').innerText = shipping.toFixed(2);
  document.getElementById('total').innerText = (subtotal + shipping).toFixed(2);
}

// Decrease/Increase quantity by clicking buttons
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1; // Minimum quantity is 1
        renderCart();
        updateCartCount();
        saveCartToLocalStorage(); // ✅ Save after adding
    }
}

// Manually update quantity when value changes
function updateQuantity(id, value) {
    const item = cart.find(item => item.id === id);
    if (item) {
        const newQuantity = parseInt(value);
        item.quantity = newQuantity > 0 ? newQuantity : 1; // Avoid negative/zero values
        renderCart();
        updateCartCount();
        saveCartToLocalStorage(); // ✅ Save after adding
    }
}

// Reset cart count to 0 if cart is empty
function resetCartCount() {
  document.getElementById('cart-count').innerText = '0';
}