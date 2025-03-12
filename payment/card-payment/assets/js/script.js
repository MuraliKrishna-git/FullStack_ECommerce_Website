

// function validateCard() {
//     // Your card validation logic here
//     console.log('Card validation initiated');
// }

// function order() {
//     // Your order processing logic here
//     console.log('Order submitted');
// }

function onClick(){
    window.open("../../payment/credit-card/index.html", "_blank");
}

function checkMessage(){
    const messageArea = document.getElementById("message");
    const message = localStorage.getItem("successMessage");

    if (message) {
        messageArea.innerText = message;
        localStorage.removeItem("successMessage"); // Clear the message after displaying
    }
};

window.addEventListener("focus", checkMessage);

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    // Check if the form is valid
    if (!this.checkValidity()) {
        event.preventDefault(); // Prevent form submission
        document.getElementById('message').textContent = "Please fill all required fields."; // Display message
    } else {
        order(); // Call your order function
    }
});

function order(){
    window.open("../../order/index.html", "_blank");
}