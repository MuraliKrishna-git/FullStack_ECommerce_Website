async function fetchData(type = "topProducts") {
    let response = await fetch("products.json");
    const data = await response.json();
    return data;
}

async function fetchBest(type = "best") {
    let response = await fetch("items.json");
    const data = await response.json();
    // Sort items by count in descending order and take the top 4
    const topItems = data.sort((a, b) => b.count - a.count).slice(0, 4);
    return topItems;
}

function showSkills(prod) {
    let skillsContainer1 = document.getElementById("topProducts");
    let skillHTML = "";
    const index = [6, 17, 18, 40];

    index.forEach((b) => {
        skillHTML += `
            <div class="bar" data-name="${prod[b].name}" data-icon="${prod[b].icon}" data-cost="${prod[b].cost}" data-discount="${Math.round(prod[b].discount)}">
                <div class="info" style="max-height: 500px;">
                    <div class="imge"><img src="${prod[b].icon}" class="card-img-top" alt="${prod[b].name}"></div>
                    <div class="btn-top">
                        <span>${prod[b].name}</span>
                        <p>Price: $${prod[b].cost} <span style="color: red;">(Discount: ${Math.round(prod[b].discount)}%)</span></p>
                        <a href="#" class="button add-to-cart" data-name="${prod[b].name}" data-icon="${prod[b].icon}" data-cost="${prod[b].cost}" data-discount="${prod[b].discount}">Add to Cart</a>
                        <a href="#" class="button">Buy Now</a>
                    </div>
                </div>
            </div>
        `;
    });
    // ./assets/media/
    skillsContainer1.innerHTML = skillHTML;

    // Attach event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const product = {
                name: button.getAttribute("data-name"),
                icon: button.getAttribute("data-icon"),
                cost: parseFloat(button.getAttribute("data-cost")),
                discount: parseInt(button.getAttribute("data-discount")),
                count: 1  // Initialize with a count of 1
            };

            // Add the product to the cart
            fetch("/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.error("Error:", error));
        });
    });
}



fetchData().then(data => {
    showSkills(data);
});

function showBestBuy(products) {
    let skillsContainer2 = document.getElementById("best");
    let skillHTML = "";

    products.forEach((b) => {
        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="imge"><img src="${b.icon}" class="card-img-top" alt="${b.name}"></div>
                    <div class="btn-top">
                        <span>${b.name}</span>
                        <p>Price: $${b.cost} <span style="color: red;">(Discount: ${Math.round(b.discount)}%)</span></p>
                        <a href="#" class="button add-to-cart" data-name="${b.name}" data-icon="${b.icon}" data-cost="${b.cost}" data-discount="${Math.round(b.discount)}">Add to Cart</a>
                        <a href="#" class="button">Buy Now</a>
                    </div>
                </div>
            </div>
        `;
    });
    // ./assets/media/
    skillsContainer2.innerHTML = skillHTML;

    // Attach event listeners for Add to Cart in best buys
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const product = {
                name: button.getAttribute("data-name"),
                icon: button.getAttribute("data-icon"),
                cost: parseFloat(button.getAttribute("data-cost")),
                discount: parseInt(button.getAttribute("data-discount")),
                count: 1
            };

            // Add product to cart
            fetch("/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.error("Error:", error));
        });
    });
}

fetchBest().then(data => {
    showBestBuy(data);
});

// Initialize tilt effect on elements with class "tilt"
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// Function to open cart page
function goToCart() {
    window.open("../cart/index.html", "_blank");
}

// jQuery for menu toggle functionality
$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
        $('.navbar').removeClass('cart');
    });
});

