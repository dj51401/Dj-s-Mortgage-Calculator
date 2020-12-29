google.charts.load("visualization", 1, { "packages": ["corechart"] });
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

    document.getElementById("payment-text").innerHTML = "$" + (mortgagePayment - (interestPaid / loanLength)).toFixed(2) + "(/month)";
    document.getElementById("property-tax-text").innerHTML = "$" + propertyTax.toFixed(2) + "(/month)";
    document.getElementById("home-insurance-text").innerHTML = "$" + homeInsurance.toFixed(2) + "(/month)";
    document.getElementById("interest-text").innerHTML = "$" + (interestPaid / loanLength).toFixed(2) + "(/month)";

    drawChart();
}

function drawChart() {

    var width = $('#pie-chart').width();
    var fontSize = (width / 100).toFixed(1);
    console.log(fontSize);

    var cw = $('#chart-wrap').width();
    $('#chart-wrap').css({'height' : cw + 'px'});

    var sw = $('#side').width();
    $('#side').css({'height' : sw + 'px'});


    var data = google.visualization.arrayToDataTable([
        ["Bill", "Price"],
        ["Mortgage Payment", mortgagePayment - (interestPaid / loanLength)],
        ['Property Tax', propertyTax],
        ['Home Insurance', homeInsurance],
        ['Interest Paid', interestPaid / loanLength]
    ]);

    var options = {
        backgroundColor: 'transparent',
        title: 'Monthly Breakdown: ',
        titleTextStyle: {
            color: '#3a3b64',
            fontName: 'Segoe UI',
            fontSize: fontSize  * 5,
        },
        tooltip: {trigger: 'none'},
        pieStartAngle: -55,
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'percentage',
        pieSliceTextStyle: {
            color: 'black',
            fontSize: fontSize  * 3,
        },
        slices: {
            0: { color: '#888CEB' },
            1: { color: '#EBAF94', offset: 0.1  },
            2: { color: '#EBD065', offset: 0.2 },
            3: { color: '#71EBDE'},
        },
        width: width,
        legend: {
            position: 'top',
            textStyle: {
                color: 'white',
                fontSize: fontSize * 3,
            },
            maxLines: 2
        },
    };


    var chart = new google.visualization.PieChart(document.getElementById("pie-chart"));

    chart.draw(data, options);

}
