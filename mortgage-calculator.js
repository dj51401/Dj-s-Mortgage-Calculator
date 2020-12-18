google.charts.load("current", { "packages": ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

var downPayment = 0;
var loanAmount = 0;
var interestRate = 0;
var loanLength = 0;
var propertyTax = 0;
var homeInsurance = 0;

var mortgagePayment = 0;
var mortgageAfterInterest = 0;
var interestPaid = 0;
var totalLoan = 0;

$(window).resize(function(){
    drawChart();
});

function calculateDebt() {
    downPayment = -(document.getElementById("down-payment-input").value / 100) + 1;
    loanAmount = document.getElementById("amount-input").value * downPayment;
    interestRate = (document.getElementById("interest-input").value / 100) / 12;
    loanLength = document.getElementById("length-input").value * 12;
    propertyTax = document.getElementById("property-tax-input").value / 12;
    homeInsurance = document.getElementById("home-insurance-input").value / 12;

    mortgagePayment = ((interestRate * loanAmount) / (1 - Math.pow((1 + interestRate), -loanLength)));
    document.getElementById("mortgage-payment-text").innerHTML = "$" + mortgagePayment.toFixed();

    mortgageAfterInterest = mortgagePayment.toFixed() * loanLength;
    document.getElementById("total-loan-text").innerHTML = "$" + mortgageAfterInterest.toFixed();

    interestPaid = mortgageAfterInterest.toFixed() - loanAmount;
    document.getElementById("interest-paid-text").innerHTML = "$" + interestPaid.toFixed();

    totalLoan = (mortgagePayment + propertyTax + homeInsurance) * 1.1;
    document.getElementById("total-payment-text").innerHTML = "$" + totalLoan.toFixed();

    document.getElementById("payment-text").innerHTML = "$" + (mortgagePayment - (interestPaid / loanLength)).toFixed(2);
    document.getElementById("property-tax-text").innerHTML = "$" + propertyTax.toFixed(2);
    document.getElementById("home-insurance-text").innerHTML = "$" + homeInsurance.toFixed(2);
    document.getElementById("interest-text").innerHTML = "$" + (interestPaid / loanLength).toFixed(2);

    drawChart();
}

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ["Bill", "Price"],
        ["Mortgage Payment", mortgagePayment - (interestPaid / loanLength)],
        ['Property Tax', propertyTax],
        ['Home Insurance', homeInsurance],
        ['Interest Paid', interestPaid / loanLength]
    ]);

    var options = {
        backgroundColor: '#1b263b',
        title: 'Monthly Breakdown: ',
        titleTextStyle: {
            color: '#6F9BF7',
            fontName: 'Segoe UI',
            fontSize: '24',
        },
        legend: {
            position: 'top',
            maxLines: '2',
            textStyle: {color: 'white'},
        },
        tooltip: {trigger: 'none'},
        pieSliceText: 'label',
        pieSliceTextStyle: {
            color: 'black',
        },
        slices: {
            0: { color: '#6BEDDE' },
            1: { color: '#6FE2F7' },
            2: { color: '#71B2E0' },
            3: { color: '#6F9BF7' },
        },
    };

    var cw = $('#chart-wrap').width();
    $('#chart-wrap').css({'height' : cw + 'px'});

    var sw = $('#side').width();
    $('#side').css({'height' : sw + 'px'});


    var chart = new google.visualization.PieChart(document.getElementById("pie-chart"));

    chart.draw(data, options);

}
