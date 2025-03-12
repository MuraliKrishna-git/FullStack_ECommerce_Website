fetch("/finalize-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
})
.then(response => response.text())
.then(message => console.log(message))
.catch(error => console.error("Error finalizing order:", error));


async function fetchData(type = "final") {
    try {
        const response = await fetch("../../order/order.json");  // Ensure this path is correct
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}

function showSkills(cart) {
    let skillsContainer1 = document.getElementById("final");
    let skillHTML = "";

    if (cart.length > 0) {
        const or = cart[cart.length - 1]; // Access the last item in the array
        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="content">
                        <span>Order ID: ${or.orderId}</span>
                        <span>Date: ${or.orderDate}</span>
                        <span>Address: ${or.user_address}</span>
                        <span>State: ${or.user_state}</span>
                        <span>City: ${or.user_city}</span>
                        <span>Payment status: ${or.paymentStatus}</span>
                    </div>
                </div>
            </div>
        `;
        or.items.forEach(ct => {
            skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="content">
                        <span>${ct.name}</span>
                        <span>${ct.cost}</span>
                        <span style="color: red;">${ct.discount}</span>
                        <p class="cart-p">Count: ${ct.count}</p>
                    </div>
                    
                </div>
            </div>
        `;
        });
        skillHTML += `
            <div class="bar">
                <div class="info" style="max-height: 500px;">
                    <div class="content">
                        <span>Total Cost: ${or.total_cost.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }    

    skillsContainer1.innerHTML = skillHTML;
}


// Initial cart fetch and display
fetchData().then(data => {
    if (data) showSkills(data);
});


// if (cart.length > 0) {
//     const or = cart[cart.length - 1]; // Access the last item in the array
//     skillHTML += `
//         <div class="bar">
//             <div class="info" style="max-height: 500px;">
//                 <div class="content">
//                     <span>Order ID: ${or.orderId}</span>
//                     <span>Date: ${or.orderDate}</span>
//                     <span>Address: ${or.user_address}</span>
//                     <span>State: ${or.user_state}</span>
//                     <span>City: ${or.user_city}</span>
//                     <span>Payment status: ${or.paymentStatus}</span>
//                 </div>
//             </div>
//         </div>
//     `;
//     or.items.forEach(ct => {
//         skillHTML += `
//         <div class="bar">
//             <div class="info" style="max-height: 500px;">
//                 <div class="content">
//                     <span>${ct.name}</span>
//                     <span>${ct.cost}</span>
//                     <span style="color: red;">${ct.discount}</span>
//                     <p class="cart-p">Count: ${ct.count}</p>
//                 </div>
//                 <img src="${ct.icon}" class="card-img-top" alt="${ct.name}">
//             </div>
//         </div>
//     `;
//     });
//     skillHTML += `
//         <div class="bar">
//             <div class="info" style="max-height: 500px;">
//                 <div class="content">
//                     <span>Order ID: ${or.total_cost}</span>
//                 </div>
//             </div>
//         </div>
//     `;
// }
// skillsContainer1.innerHTML = skillHTML;
