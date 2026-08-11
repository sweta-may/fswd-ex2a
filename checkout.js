function getCart() {

    return JSON.parse(
        localStorage.getItem("spicehubCart") || "[]"
    );

}


const cart = getCart();


if (!cart.length) {

    window.location.href = "cart.html";

}


const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );


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


cart.forEach(item => {

    const row =
        document.createElement("div");

    row.className =
        "checkout-item";


    row.innerHTML = `

        <span>
            ${item.name}
            × ${item.quantity}
        </span>

        <strong>
            ₹${item.price * item.quantity}
        </strong>

    `;


    checkoutItems.appendChild(row);

});


document.getElementById(
    "summaryItems"
).textContent = itemTotal;


document.getElementById(
    "summaryTax"
).textContent = tax;


document.getElementById(
    "summaryTotal"
).textContent = total;


document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const address =
                document.getElementById(
                    "address"
                ).value.trim();


            const pincode =
                document.getElementById(
                    "pincode"
                ).value.trim();


            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            if (
                !name ||
                !phone ||
                !address ||
                !pincode
            ) {

                alert(
                    "Please complete all delivery details."
                );

                return;

            }


            const order = {

                id:
                    "#SP" +
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    ),

                name: name,

                phone: phone,

                address: address,

                pincode: pincode,

                payment: payment,

                total: total,

                createdAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "lastOrder",
                JSON.stringify(order)
            );


            localStorage.removeItem(
                "spicehubCart"
            );


            window.location.href =
                "order-success.html";

        }
    );
