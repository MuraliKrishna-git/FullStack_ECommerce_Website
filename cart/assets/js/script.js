// shop_website/cart/assets/js/script.js

async function fetchData(type = "cart") {
    try {
        const response = await fetch("/cart/cart.json");  // Ensure this path is correct
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}

function showSkills(cart) {
    let skillsContainer1 = document.getElementById("cart");
    let skillHTML = "";

    cart.forEach(ct => {
        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="content">
                        <span>${ct.name}</span>
                        <p class="cart-p">Count: ${ct.count}</p>
                        <div class="btn-top">
                            <a href="#" class="button remove-from-cart" data-name="${ct.name}">Remove from Cart</a>
                        </div>
                    </div>
                    <img src="${ct.icon}" class="card-img-top" alt="${ct.name}">
                </div>
            </div>
        `;
    });

    skillsContainer1.innerHTML = skillHTML;

    // Attach event listeners to "Remove from Cart" buttons
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productName = button.getAttribute("data-name");

            // Send request to remove item from the cart
            fetch("/remove-from-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: productName })
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to remove item from cart");
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                // Refresh the cart view to update the item count
                return fetchData();
            })
            .then(updatedCart => {
                showSkills(updatedCart);
            })
            .catch(error => console.error("Error:", error));
        });
    });
}

// shop_website/cart/assets/js/script.js

document.getElementById("buyAll").addEventListener("click", (event) => {
    event.preventDefault();

    // Send request to buy all items in the cart
    fetch("/buy-all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Redirect to payment page after successful purchase
        // window.location.href = "../../.payment/main-page/index.html";
    })
    .catch(error => console.error("Error:", error));
});


// Initial cart fetch and display
fetchData().then(data => {
    if (data) showSkills(data);
});

function goToCart(){
  window.open("../cart/index.html", "_blank");
}

function payment(){
    window.open("../payment/main-page/index.html");
}