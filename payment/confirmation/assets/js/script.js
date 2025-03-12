async function fetchBest(type = "total") {
    let response = await fetch("../../../cart/cart.json");
    const data = await response.json();
    
    let response2 = await fetch("../../inputData.json"); // Fixed the typo here (from .jsonn to .json)
    const data2 = await response2.json(); // Use response2 to fetch inputData.json
    
    return { products: data, input: data2 }; // Return an object with both datasets
}

async function fetchPay(type = "total") {
    let response = await fetch("../../inputData.json");
    const data = await response.json();
    return data;
}

let total = 0;  // Total original cost
let discountTotal = 0;  // Total discount amount

function showBestBuy(products, input) {
    let skillsContainer2 = document.getElementById("total");
    let skillHTML = "";

    products.forEach((b) => {
        const itemTotalCost = b.cost * b.count;  // Total cost for this item
        const itemDiscountAmount = itemTotalCost * (b.discount / 100);  // Total discount for this item
        const itemDiscountedPrice = itemTotalCost - itemDiscountAmount;  // Discounted total price for this item

        // Accumulate total cost and discount
        total += itemTotalCost;
        discountTotal += itemDiscountAmount;

        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="btn-top">
                        <span>Product: ${b.name}</span><br>
                        <span>Price per item: ${b.cost}</span><br>
                        <span>Quantity: ${b.count}</span><br>
                        <span>Discount: ${b.discount}%</span><br>
                        <span>Total Cost (Before Discount): ${itemTotalCost.toFixed(2)}</span><br>
                        <span>Discount Applied: ${itemDiscountAmount.toFixed(2)}</span><br>
                        <span>Cost After Discount: ${itemDiscountedPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    });

    // Display total costs after all items
    skillHTML += `
        <div class="bar">
            <div class="info" style="max-height: 500px;">
                <div class="btn-top">
                    <span>Total Cost (Before Discount): ${total.toFixed(2)}</span><br>
                    <span>Total Discount: ${discountTotal.toFixed(2)}</span><br>
                    <span>Final Cost (After Discount): ${(total - discountTotal).toFixed(2)}</span><br>
                    <span>Payment mode: ${input.pay_mode}</span>
                </div>
            </div>
        </div>
    `;

    skillHTML += `
        <div class="bar">
            <div class="info" style="max-height: 500px;">
                <div class="btn-top">
                    <button class="button" onClick="window.location.href='../../../../order/index.html'">Confirm</button>
                </div>
            </div>
        </div>
    `

    skillsContainer2.innerHTML = skillHTML;
}

// Correctly call fetchBest and handle the returned object
fetchBest().then(({ products, input }) => {
    showBestBuy(products, input);
}).catch(error => {
    console.error('Error fetching data:', error);
});
