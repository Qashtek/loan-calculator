// Listen for submit on the loan form
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide result
    document.getElementById('results').style.display = "none";

    // Show Loader
    document.getElementById('loading').style.display = "block";

    // Display results after 2 seconds
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate results
function calculateResults(){

    // UI vars for loan form
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years  = document.getElementById('years');
    // vars for result
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1); 

    // checking if its a finite number
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value =  ((monthly * calculatedPayments) - principal).toFixed(2);

        // Display results
        document.getElementById('results').style.display = "block";

        // Hide Loader
        document.getElementById('loading').style.display = "none";
    }
    else{
        
        // display error
        showError('Please check your numbers and try again');
        }

}


// show error function
function showError(error){

     // Hide results
     document.getElementById('results').style.display = "none";

     // Hide Loader
     document.getElementById('loading').style.display = "none";


    // creating div element for error display
    const errorDiv = document.createElement('div');

    // adding bootstrap alert classes and danger class
    errorDiv.className = 'alert alert-danger';

    // creating text node
    errorDiv.appendChild(document.createTextNode(error));

    // get elements from UI
    const card = document.querySelector('.card');
    const loanFormHeading = document.querySelector('.heading');

    // Inserting error div into the card, above the heading h1
    card.insertBefore(errorDiv, loanFormHeading);

    // clear error after 3 seconds / 3000 miliseconds
    setTimeout(clearError, 3000);

}


// clear error function
function clearError(){
    document.querySelector('.alert').remove();
}