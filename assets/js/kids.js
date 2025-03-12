async function fetchShirt(type = "shirts") {
    let response = await fetch("products.json");
    const data = await response.json();
    // Sort items by count in descending order and take the top 4
    // const topItems = data.sort((a, b) => b.count - a.count).slice(0, 4);
    return data;
}


function showShirt(prod) {
    let skillsContainer3 = document.getElementById("kids");
    let skillHTML3 = "";
    // const index = [6, 17, 18, 40];

    prod.forEach((b) => {
        if(b.type == "kids"){skillHTML3 += `
            <div class="bar" data-name="${b.name}" data-icon="${b.icon}" data-cost="${b.cost}" data-discount="${b.discount}">
                <div class="info" style="max-height: 500px;">
                    <img src="${b.icon}" class="card-img-top" alt="${b.name}">
                    <div class="btn-top">
                        <span>${b.name}</span>
                        <p>Price: $${b.cost} <span style="color: red;">(Discount: ${b.discount}%)</span></p>
                        <a href="#" class="button add-to-cart" data-name="${b.name}" data-icon="${b.icon}" data-cost="${b.cost}" data-discount="${b.discount}">Add to Cart</a>
                        <a href="#" class="button">Buy Now</a>
                    </div>
                </div>
            </div>
        `;}
    });
    // ./assets/media/
    skillsContainer3.innerHTML = skillHTML3;

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


function showPant(prod) {
    let skillsContainer4 = document.getElementById("kids-w");
    let skillHTML4 = "";
    // const index = [6, 17, 18, 40];

    prod.forEach((b) => {
        if(b.type == "kids-w"){skillHTML4 += `
            <div class="bar" data-name="${b.name}" data-icon="${b.icon}" data-cost="${b.cost}" data-discount="${b.discount}">
                <div class="info" style="max-height: 500px;">
                    <img src="${b.icon}" class="card-img-top" alt="${b.name}">
                    <div class="btn-top">
                        <span>${b.name}</span>
                        <p>Price: $${b.cost} <span style="color: red;">(Discount: ${b.discount}%)</span></p>
                        <a href="#" class="button add-to-cart" data-name="${b.name}" data-icon="${b.icon}" data-cost="${b.cost}" data-discount="${b.discount}">Add to Cart</a>
                        <a href="#" class="button">Buy Now</a>
                    </div>
                </div>
            </div>
        `;}
    });
    // ./assets/media/
    skillsContainer4.innerHTML = skillHTML4;

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

fetchShirt().then(data => {
    showShirt(data);
    showPant(data); 
});

function goToCart() {
    window.open("../cart/index.html", "_blank");
}
