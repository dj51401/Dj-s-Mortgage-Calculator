function calculateDebt(){
    var downPayment = -(document.getElementById("down-payment-input").value / 100) + 1;
    var loanAmount = document.getElementById("amount-input").value * downPayment;
    var interestRate = (document.getElementById("interest-input").value / 100) / 12;
    var loanLength = document.getElementById("length-input").value * 12;
    var propertyTax = document.getElementById("property-tax-input").value / 12;
    var homeInsurance = document.getElementById("home-insurance-input").value / 12;

    var mortgagePayment = ((interestRate * loanAmount) / (1 - Math.pow((1 + interestRate), -loanLength)));
    document.getElementById("mortgage-payment-text").innerHTML = "$" + mortgagePayment.toFixed();
    
    var mortgageAfterInterest = mortgagePayment.toFixed() * loanLength;
    document.getElementById("total-loan-text").innerHTML = "$" + mortgageAfterInterest.toFixed();

    var interestPaid = mortgageAfterInterest.toFixed() - loanAmount;
    document.getElementById("interest-paid-text").innerHTML = "$" + interestPaid.toFixed();

    var totalLoan = (mortgagePayment + propertyTax + homeInsurance) * 1.1;
    document.getElementById("total-payment-text").innerHTML = "$" + totalLoan.toFixed();
}