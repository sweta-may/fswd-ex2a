document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MENU DATA
  ========================= */

  const menuItems = [

    {
      id: 1,
      name: "Chicken Biryani",
      category: "biryani",
      price: 220,
      type: "nonveg",
      description: "Fragrant basmati rice cooked with tender chicken, herbs and aromatic spices.",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 2,
      name: "Paneer Butter Masala",
      category: "main",
      price: 190,
      type: "veg",
      description: "Soft paneer cooked in a rich, creamy tomato and butter gravy.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 3,
      name: "Chicken Tikka",
      category: "starters",
      price: 210,
      type: "nonveg",
      description: "Juicy pieces of marinated chicken grilled with Indian spices.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 4,
      name: "Masala Dosa",
      category: "main",
      price: 90,
      type: "veg",
      description: "Crispy South Indian dosa served with potato masala, sambar and chutney.",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 5,
      name: "Garlic Naan",
      category: "bread",
      price: 65,
      type: "veg",
      description: "Soft naan topped with fresh garlic, butter and coriander.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 6,
      name: "Mutton Biryani",
      category: "biryani",
      price: 290,
      type: "nonveg",
      description: "Tender mutton layered with fragrant basmati rice and traditional spices.",
      image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d4e24?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 7,
      name: "Samosa",
      category: "starters",
      price: 60,
      type: "veg",
      description: "Crispy pastry filled with spiced potatoes and peas.",
      image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 8,
      name: "Gulab Jamun",
      category: "desserts",
      price: 80,
      type: "veg",
      description: "Soft milk dumplings soaked in warm cardamom sugar syrup.",
      image: "https://images.unsplash.com/photo-1601303516534-0b0d5a7a0f50?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 9,
      name: "Mango Lassi",
      category: "drinks",
      price: 90,
      type: "veg",
      description: "Creamy yogurt drink blended with sweet Alphonso mango.",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=500&q=80"
    },

    {
      id: 10,
      name: "Butter Chicken",
      category: "main",
      price: 240,
      type: "nonveg",
      description: "Tender chicken cooked in a creamy tomato, butter and spice sauce.",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80"
    }

  ];


  /* =========================
     STATE
  ========================= */

  let cart =
    JSON.parse(localStorage.getItem("spiceGardenCart")) || [];


  let currentCategory = "all";

  let searchQuery = "";


  /* =========================
     ELEMENTS
  ========================= */

  const menuGrid =
    document.getElementById("menu-grid");

  const searchInput =
    document.getElementById("search-input");

  const categories =
    document.querySelectorAll(".category");

  const cartDrawer =
    document.getElementById("cart-drawer");

  const overlay =
    document.getElementById("overlay");

  const openCart =
    document.getElementById("open-cart");

  const mobileCart =
    document.getElementById("mobile-cart");

  const closeCart =
    document.getElementById("close-cart");

  const cartContent =
    document.getElementById("cart-content");

  const cartCount =
    document.getElementById("cart-count");

  const mobileCartTotal =
    document.getElementById("mobile-cart-total");

  const cartItemsLabel =
    document.getElementById("cart-items-label");

  const subtotalElement =
    document.getElementById("subtotal");

  const deliveryFeeElement =
    document.getElementById("delivery-fee");

  const totalElement =
    document.getElementById("total");

  const checkoutButton =
    document.getElementById("checkout-btn");

  const checkoutModal =
    document.getElementById("checkout-modal");

  const closeCheckout =
    document.getElementById("close-checkout");

  const checkoutForm =
    document.getElementById("checkout-form");

  const checkoutItems =
    document.getElementById("checkout-items");

  const checkoutTotal =
    document.getElementById("checkout-total");

  const successModal =
    document.getElementById("success-modal");

  const orderNumber =
    document.getElementById("order-number");

  const continueButton =
    document.getElementById("continue-btn");


  /* =========================
     HELPERS
  ========================= */

  function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
  }


  function saveCart() {
    localStorage.setItem(
      "spiceGardenCart",
      JSON.stringify(cart)
    );
  }


  function getCartQuantity() {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }


  function getSubtotal() {
    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }


  function escapeHTML(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  /* =========================
     RENDER MENU
  ========================= */

  function renderMenu() {

    let filtered = menuItems.filter(item => {

      const matchesCategory =
        currentCategory === "all" ||
        item.category === currentCategory;

      const query =
        searchQuery.toLowerCase();

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(query) ||

        item.description
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;

    });


    menuGrid.innerHTML = "";


    if (filtered.length === 0) {

      menuGrid.innerHTML = `
        <div class="no-results">
          <h3>No dishes found</h3>
          <p>Try another search or category.</p>
        </div>
      `;

      return;
    }


    filtered.forEach(item => {

      const card =
        document.createElement("article");

      card.className = "food-card";

      card.innerHTML = `

        <div class="food-details">

          <div class="food-${item.type}"></div>

          <h3>
            ${escapeHTML(item.name)}
          </h3>

          <div class="food-price">
            ${formatPrice(item.price)}
          </div>

          <p class="food-description">
            ${escapeHTML(item.description)}
          </p>

        </div>


        <div class="food-image">

          <img
            src="${item.image}"
            alt="${escapeHTML(item.name)}"
            loading="lazy"
          >

          <button
            class="add-button"
            data-id="${item.id}"
          >
            Add
          </button>

        </div>

      `;

      menuGrid.appendChild(card);

    });

  }


  /* =========================
     ADD TO CART
  ========================= */

  menuGrid.addEventListener("click", event => {

    const button =
      event.target.closest(".add-button");

    if (!button) return;


    const id =
      Number(button.dataset.id);


    const item =
      menuItems.find(food => food.id === id);

    if (!item) return;


    const existing =
      cart.find(food => food.id === id);


    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        ...item,
        quantity: 1
      });

    }


    saveCart();

    updateCart();

    openCartDrawer();

  });


  /* =========================
     RENDER CART
  ========================= */

  function updateCart() {

    const quantity =
      getCartQuantity();

    const subtotal =
      getSubtotal();

    const delivery =
      quantity > 0 ? 40 : 0;

    const total =
      subtotal + delivery;


    cartCount.textContent =
      quantity;

    cartItemsLabel.textContent =
      `${quantity} ${
        quantity === 1 ? "item" : "items"
      }`;

    subtotalElement.textContent =
      formatPrice(subtotal);

    deliveryFeeElement.textContent =
      formatPrice(delivery);

    totalElement.textContent =
      formatPrice(total);

    mobileCartTotal.textContent =
      formatPrice(total);


    if (cart.length === 0) {

      cartContent.innerHTML = `
        <div class="empty-cart">

          <div class="empty-cart-icon">
            🛒
          </div>

          <h3>Your cart is empty</h3>

          <p>
            Add something delicious from the menu.
          </p>

        </div>
      `;

      checkoutButton.disabled = true;

      return;

    }


    checkoutButton.disabled = false;


    cartContent.innerHTML = "";


    cart.forEach(item => {

      const cartItem =
        document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `

        <img
          class="cart-item-image"
          src="${item.image}"
          alt="${escapeHTML(item.name)}"
        >


        <div class="cart-item-info">

          <h4>
            ${escapeHTML(item.name)}
          </h4>

          <div class="cart-item-price">
            ${formatPrice(item.price)}
          </div>


          <div class="quantity-controls">

            <button
              class="decrease"
              data-id="${item.id}"
            >
              −
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              class="increase"
              data-id="${item.id}"
            >
              +
            </button>

          </div>

        </div>


        <div class="cart-item-total">
          ${formatPrice(
            item.price * item.quantity
          )}
        </div>

      `;

      cartContent.appendChild(cartItem);

    });

  }


  /* =========================
     CART QUANTITY
  ========================= */

  cartContent.addEventListener("click", event => {

    const button =
      event.target.closest("button");

    if (!button) return;


    const id =
      Number(button.dataset.id);


    const item =
      cart.find(food => food.id === id);

    if (!item) return;


    if (button.classList.contains("increase")) {

      item.quantity++;

    }


    if (button.classList.contains("decrease")) {

      item.quantity--;

      if (item.quantity <= 0) {

        cart =
          cart.filter(food => food.id !== id);

      }

    }


    saveCart();

    updateCart();

  });


  /* =========================
     CART DRAWER
  ========================= */

  function openCartDrawer() {

    cartDrawer.classList.add("open");

    overlay.classList.add("show");

    document.body.style.overflow = "hidden";

  }


  function closeCartDrawer() {

    cartDrawer.classList.remove("open");

    overlay.classList.remove("show");

    document.body.style.overflow = "";

  }


  openCart.addEventListener(
    "click",
    openCartDrawer
  );

  mobileCart.addEventListener(
    "click",
    openCartDrawer
  );

  closeCart.addEventListener(
    "click",
    closeCartDrawer
  );

  overlay.addEventListener(
    "click",
    closeCartDrawer
  );


  /* =========================
     SEARCH
  ========================= */

  searchInput.addEventListener(
    "input",
    event => {

      searchQuery =
        event.target.value.trim();

      renderMenu();

    }
  );


  /* =========================
     CATEGORIES
  ========================= */

  categories.forEach(category => {

    category.addEventListener(
      "click",
      () => {

        categories.forEach(button => {
          button.classList.remove("active");
        });


        category.classList.add("active");


        currentCategory =
          category.dataset.category;


        renderMenu();

      }
    );

  });


  /* =========================
     CHECKOUT
  ========================= */

  checkoutButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) return;


      const subtotal =
        getSubtotal();

      const delivery = 40;

      checkoutItems.textContent =
        formatPrice(subtotal);

      checkoutTotal.textContent =
        formatPrice(subtotal + delivery);


      checkoutModal.classList.add("show");

      closeCartDrawer();

    }
  );


  closeCheckout.addEventListener(
    "click",
    () => {

      checkoutModal.classList.remove("show");

    }
  );


  /* =========================
     PLACE ORDER
  ========================= */

  checkoutForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (cart.length === 0) return;


      const orderId =
        Math.floor(
          100000 + Math.random() * 900000
        );


      orderNumber.textContent =
        orderId;


      const order = {

        id: orderId,

        restaurant: "Spice Garden",

        customer: {

          name:
            document
              .getElementById("customer-name")
              .value,

          phone:
            document
              .getElementById("customer-phone")
              .value,

          address:
            document
              .getElementById("customer-address")
              .value

        },

        payment:
          document.querySelector(
            'input[name="payment"]:checked'
          ).value,

        items: [...cart],

        subtotal:
          getSubtotal(),

        deliveryFee: 40,

        total:
          getSubtotal() + 40,

        createdAt:
          new Date().toISOString()

      };


      localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
      );


      cart = [];

      saveCart();

      updateCart();


      checkoutForm.reset();

      checkoutModal.classList.remove("show");

      successModal.classList.add("show");

    }
  );


  /* =========================
     SUCCESS
  ========================= */

  continueButton.addEventListener(
    "click",
    () => {

      successModal.classList.remove("show");

    }
  );


  /* =========================
     INITIALIZE
  ========================= */

  renderMenu();

  updateCart();

});
