function getCart() {

    return JSON.parse(
        localStorage.getItem("spicehubCart") || "[]"
    );

}


function saveCart(cart) {

    localStorage.setItem(
        "spicehubCart",
        JSON.stringify(cart)
    );

}


const cartItems =
    document.getElementById("cartItems");


function renderCart() {

    const cart = getCart();

    cartItems.innerHTML = "";


    if (!cart.length) {

        cartItems.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some delicious food from Spice Garden.
                </p>

                <a
                    href="index.html#menu"
                    class="primary-button"
                    style="max-width:220px;margin:20px auto 0"
                >
                    Browse menu
                </a>

            </div>

        `;


        document.getElementById(
            "checkoutLink"
        ).style.pointerEvents = "none";


        document.getElementById(
            "checkoutLink"
        ).style.opacity = ".4";


        updateBill();

        return;

    }


    cart.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h3>
                    ${item.name}
                </h3>

                <div class="cart-item-price">
                    ₹${item.price} each
                </div>


                <div class="quantity-controls">

                    <button
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <strong class="cart-item-total">
                ₹${item.price * item.quantity}
            </strong>

        `;


        cartItems.appendChild(element);

    });


    document
        .querySelectorAll(
            ".quantity-controls button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.id),
                        button.dataset.action
                    );

                }
            );

        });


    document.getElementById(
        "checkoutLink"
    ).style.pointerEvents = "auto";


    document.getElementById(
        "checkoutLink"
    ).style.opacity = "1";


    updateBill();

}


function changeQuantity(id, action) {

    const cart = getCart();


    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    if (action === "plus") {

        item.quantity++;

    } else {

        item.quantity--;

    }


    const updated =
        cart.filter(
            item => item.quantity > 0
        );


    saveCart(updated);

    renderCart();

}


function updateBill() {

    const cart = getCart();


    const itemTotal =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const tax =
        Math.round(itemTotal * 0.05);


    const total =
        itemTotal + 40 + tax;


    document.getElementById(
        "itemTotal"
    ).textContent = itemTotal;


    document.getElementById(
        "tax"
    ).textContent = tax;


    document.getElementById(
        "grandTotal"
    ).textContent =
        cart.length ? total : 0;


    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    document.getElementById(
        "navCartCount"
    ).textContent = count;

}


renderCart();
