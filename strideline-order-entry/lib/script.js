$(document).ready(function () {
    
    $('#div-customer-result').hide();
    $('#div-create-customer-control').hide();
    $('#div-order-details').hide();

    $('#btn-search-customer').on('click', function () {
        
        // Add an ajax call to search for the customer here.

        $('#div-customer-result').show(500);
    });

    $('#btn-new-customer').on('click', function () {
        $('#div-customer-result').hide();
        $('#div-customer-search').hide();

        $('#h4-customer-panel-text').text('Create New Customer');
        $('#div-create-customer-control').show(500);
    });
});

