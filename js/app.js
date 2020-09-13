const loanForm = document.getElementById('loan-form');

loanForm.addEventListener('submit', function(e) {
    //show Loading
    document.getElementById('loading').style.display = 'block';
    //Hide result
    document.getElementById('loan-result').style.display = 'none';

    setTimeout(loanCalculator, 2000);

    e.preventDefault();
});

function loanCalculator() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // compute monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        //hide Loading
        document.getElementById('loading').style.display = 'none';

        //show result
        document.getElementById('loan-result').style.display = 'block';
    }else{
       showError('Please check your number');
    }

}

// Error Message
function showError(error) {
    //hide Loading
    document.getElementById('loading').style.display = 'none';
    //Hide result
    document.getElementById('loan-result').style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const cardHeader = document.querySelector('.card-header');

    card.insertBefore(errorDiv, cardHeader);

    setTimeout(clearError, 3000);

}

function clearError() {
    document.querySelector('.alert').remove();
}