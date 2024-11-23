document.addEventListener('DOMContentLoaded', () => {
    const finalizePaymentButton = document.getElementById('finalize-payment');
    const paymentConfirmationSection = document.getElementById('payment-confirmation');
    const paymentForm = document.getElementById('payment-form');

    finalizePaymentButton.addEventListener('click', () => {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const cardholderName = document.getElementById('cardholder-name').value;

        if (cardNumber && expiryDate && cvv && cardholderName) {
            paymentForm.style.display = 'none';
            paymentConfirmationSection.style.display = 'block';
        } else {
            alert('Please fill in all the payment details.');
        }
    });
});