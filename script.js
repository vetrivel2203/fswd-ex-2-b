const products = [
  { name: "Canvas Backpack", description: "A handy everyday bag.", price: 899, emoji: "🎒" },
  { name: "Water Bottle", description: "Reusable stainless steel bottle.", price: 399, emoji: "🧴" },
  { name: "Desk Lamp", description: "A bright lamp for your workspace.", price: 749, emoji: "💡" },
  { name: "Notebook Set", description: "Three notebooks for your ideas.", price: 249, emoji: "📒" }
];

const cart = [];

function showProducts() {
  const productList = document.getElementById("product-list");

  productList.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <div class="emoji">${product.emoji}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">₹${product.price}</p>
      <button type="button" onclick="addToCart(${index})">Add to cart</button>
    </article>
  `).join("");
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");

  cartItems.innerHTML = cart.map(item =>
    `<li>${item.name} — ₹${item.price}</li>`
  ).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = total;
  document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("checkout").addEventListener("click", () => {
  const message = document.getElementById("message");

  if (cart.length === 0) {
    message.textContent = "Your cart is empty. Add a product first.";
    return;
  }

  message.textContent = "Demo order placed. Thank you for shopping!";
  cart.length = 0;
  updateCart();
});

showProducts();
