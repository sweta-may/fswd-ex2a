const foods = [

    {
        id: 1,
        name: "Paneer Tikka",
        price: 249,
        category: "starters",
        description: "Char-grilled paneer marinated in yogurt and aromatic Indian spices.",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Chicken Tikka",
        price: 299,
        category: "starters",
        description: "Tender chicken pieces marinated with spices and grilled over high heat.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Butter Chicken",
        price: 329,
        category: "main",
        description: "Tender chicken simmered in a creamy tomato and butter gravy.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Paneer Butter Masala",
        price: 289,
        category: "main",
        description: "Soft paneer cooked in a rich tomato, butter and cream gravy.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Chicken Biryani",
        price: 349,
        category: "biryani",
        description: "Fragrant basmati rice layered with spiced chicken and saffron.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Veg Biryani",
        price: 279,
        category: "biryani",
        description: "Aromatic basmati rice cooked with fresh vegetables and herbs.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Chicken Pizza",
        price: 349,
        category: "pizza",
        description: "Cheesy pizza topped with chicken, peppers and Italian herbs.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Margherita Pizza",
        price: 249,
        category: "pizza",
        description: "Classic tomato pizza with mozzarella and fresh basil.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 9,
        name: "Gulab Jamun",
        price: 129,
        category: "desserts",
        description: "Soft milk dumplings soaked in warm cardamom sugar syrup.",
        image: "https://images.unsplash.com/photo-1666190094762-8e3e7e6f8c42?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 10,
        name: "Chocolate Brownie",
        price: 159,
        category: "desserts",
        description: "Rich chocolate brownie with a soft centre and crisp edges.",
        image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 11,
        name: "Mango Lassi",
        price: 119,
        category: "drinks",
        description: "Creamy chilled mango lassi made with fresh yogurt.",
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 12,
        name: "Fresh Lime Soda",
        price: 89,
        category: "drinks",
        description: "Refreshing lime juice mixed with chilled sparkling soda.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80"
    }

];


const foodGrid =
    document.getElementById("foodGrid");

const searchInput =
    document.getElementById("searchInput");

let selectedCategory = "all";


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


function renderFoods() {

    const search =
        searchInput.value.toLowerCase().trim();


    const filtered =
        foods.filter(food => {

            const categoryMatch =
                selectedCategory === "all" ||
                food.category === selectedCategory;

            const searchMatch =
                food.name.toLowerCase()
                    .includes(search);

            return categoryMatch && searchMatch;

        });


    foodGrid.innerHTML = "";


    filtered.forEach(food => {

        const card =
            document.createElement("article");

        card.className = "food-card";


        card.innerHTML = `

            <div class="food-content">

                <span class="veg-dot"></span>

                <h3>
                    ${food.name}
                </h3>

                <div class="food-price">
                    ₹${food.price}
                </div>

                <p>
                    ${food.description}
                </p>

            </div>


            <div class="food-image">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                >

                <button
                    class="add-food"
                    data-id="${food.id}"
                >
                    ADD
                </button>

            </div>

        `;


        foodGrid.appendChild(card);

    });


    document
        .querySelectorAll(".add-food")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addToCart(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}


function addToCart(id) {

    const food =
        foods.find(item => item.id === id);

    const cart = getCart();


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }


    saveCart(cart);

    updateCartIndicator();

}


function updateCartIndicator() {

    const cart = getCart();


    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById(
        "navCartCount"
    ).textContent = count;


    document.getElementById(
        "floatingCount"
    ).textContent =
        `${count} item${count !== 1 ? "s" : ""}`;


    document.getElementById(
        "floatingTotal"
    ).textContent = total;


    document.getElementById(
        "floatingCart"
    ).style.display =
        count > 0 ? "flex" : "none";

}


document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                button.classList.add("active");

                selectedCategory =
                    button.dataset.category;

                renderFoods();

            }
        );

    });


searchInput.addEventListener(
    "input",
    renderFoods
);


document
    .getElementById("floatingCart")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "cart.html";

        }
    );


renderFoods();

updateCartIndicator();
