// async function generateQRCode() {
//     try {
//         // Fetch cart data
//         const response = await fetch("/cart/cart.json");
//         if (!response.ok) {
//             throw new Error("Failed to fetch cart.json");
//         }

//         const cart = await response.json();
//         const totalCost = cart.reduce((acc, item) => acc + item.cost * item.count, 0);

//         // Generate QR code with total cost
//         const qrCodeContainer = document.getElementById("qrCode");
//         new QRCode(qrCodeContainer, {
//             text: `Total Cost: ${totalCost}`,
//             width: 128,
//             height: 128
//         });

//         // Add click event to handle payment confirmation
//         qrCodeContainer.addEventListener("click", () => {
//             alert("Payment Successful");
//             fetch("/finalize-order", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ paymentStatus: true })
//             })
//             .then(() => window.location.href = "../../order/index.html")
//             .catch(error => console.error("Error updating payment status:", error));
//         });

//     } catch (error) {
//         console.error("Error generating QR code:", error);
//     }
// }

// // Call the function to generate the QR code when the page loads
// generateQRCode();


async function generateQRCode() {
    try {
        // Fetch cart data
        const response = await fetch("/cart/cart.json");
        if (!response.ok) {
            throw new Error("Failed to fetch cart.json");
        }

        const cart = await response.json();
        const totalCost = cart.reduce((acc, item) => acc + item.cost * item.count, 0);

        // Generate QR code with total cost
        const qrCodeContainer = document.getElementById("qrCode");
        new QRCode(qrCodeContainer, {
            text: `Total Cost: ${totalCost}`,
            width: 128,
            height: 128
        });

        // Add click event to handle payment confirmation
        qrCodeContainer.addEventListener("click", () => {
            document.getElementById("okButton").style.display = "inline"; // Show OK button
        });

        // Add click event for OK button
        document.getElementById("okButton").addEventListener("click", () => {
            document.getElementById("submitButton").disabled = false; // Enable Submit button
            document.getElementById("okButton").style.display = "none"; // Hide OK button after clicking
        });

        // Add click event for Submit button
        document.getElementById("submitButton").addEventListener("click", () => {
            alert("Payment Successful")
            // fetch("/finalize-order", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ paymentStatus: true })
            // })
            try{window.open("../../order/index.html")}
            catch{error => console.error("Error updating payment status:", error)};
        });

    } catch (error) {
        console.error("Error generating QR code:", error);
    }
}

// Call the function to generate the QR code when the page loads
generateQRCode();
