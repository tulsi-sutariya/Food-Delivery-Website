const search_input = document.querySelector(".search-input")
const search = document.querySelector("#sh")

search.addEventListener("click",()=>{
    search_input.classList.toggle("active")
})

// Select DOM Elements
const productList = document.querySelector('.products-contain');
const sortButtons = document.querySelectorAll('.btn1');
const products = Array.from(document.querySelectorAll('.latest'));

// Function to Sort Products
function sortProducts(criteria) {
  let sortedProducts = [...products]; // Clone original array

  switch (criteria) {
    case 'az': // Alphabetical A-Z
      sortedProducts.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
      break;

    case 'za': // Alphabetical Z-A
      sortedProducts.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
      break;

    case 'rating-high': // Rating High to Low
      sortedProducts.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
      break;

    case 'rating-low': // Rating Low to High
      sortedProducts.sort((a, b) => parseFloat(a.dataset.rating) - parseFloat(b.dataset.rating));
      break;

    default:
      sortedProducts = products; // Reset to original order
  }

  // Re-render sorted products in DOM
  productList.innerHTML = ''; // Clear current list
  sortedProducts.forEach(product => {
    productList.appendChild(product);
  });
}

// Add Click Event Listeners to Buttons
sortButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Get sort type from data-sort attribute
    const sortValue = e.target.dataset.sort;

    // Remove active class from all buttons
    sortButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    e.target.classList.add('active');

    // Sort products based on clicked button
    sortProducts(sortValue);
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
window.onload = () => {
  loadCartFromLocalStorage(); // ✅ Load previous cart
  // Other initializations
};

let cart = [];

const emptyCartMessage = document.getElementById('empty-cart');
const cartContainer = document.getElementById('cart-section');

function addToCart(id) {
    const product = document.querySelector(`.latest[data-id='${id}']`);
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
    const productSection = document.querySelector('.products-contain')
    const menu_btn = document.querySelector('.menu-btn')

    productSection.style.display= "none";
    menu_btn.style.display="none"
    cartContainer.style.display = "none"; // Hide cart container
    emptyCartMessage.style.display = "flex"; // Show empty messas
      //resetCartCount();
      return;
   }
   else{
    const cartSection = document.getElementById('cart-section');
    const productSection = document.querySelector('.products-contain')
    const menu_btn = document.querySelector('.menu-btn')
    const footer = document.querySelector('footer')

    footer.style.display='block';
    productSection.style.display= "none";
    menu_btn.style.display="none";
    cartSection.style.display="block";
    renderCart()
   }
    
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
    saveCartToLocalStorage();
    showCart() // ✅ Save after adding
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
