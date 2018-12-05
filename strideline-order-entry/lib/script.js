$(document).ready(function () {
    
    // Reset the customer search panel
    initCustomerSearch();
    initProductSearch();

    $('#txt-search-customer').keyup(function (e) { 
        var ENTER_KEY = 13;
        var searchKey = $(this).val().trim();

        if (e.which === ENTER_KEY && searchKey.length !== 0) {
            showCustomerSearchResult(searchKey);           
        }
    });

    $('#btn-search-customer').on('click', function () {
        var searchKey = $('#txt-search-customer').val().trim();

        if (searchKey.length !== 0) {
            showCustomerSearchResult(searchKey);
        }        
    });

    $('#btn-new-customer').on('click', function () {
        $('#div-customer-result').hide();
        $('#div-customer-search').hide();

        $('#h4-customer-panel-text').text('Create New Customer');
        $('#div-create-customer-control').show(500);

        goToByScroll('div-create-customer-control');
    });

    $('#btn-create-customer').on('click', function () {
        // TODO-JUDYLL: Add the logic here to create a new customer

        // If successful get the new customer Id
        var customerId = 1;
        showOrderDetailsPanel(customerId);
    });

    $('#btn-cancel-customer').on('click', function () {
        initCustomerSearch();
    });

    $('.select-customer').on('click', function () {
        var customerId = $(this).data('customer-id');

        console.log(customerId);

        showOrderDetailsPanel(customerId);        
    });
    
    $('#txt-search-product').keyup(function (e) { 
        var ENTER_KEY = 13;
        var searchKey = $(this).val().trim();

        if (e.which === ENTER_KEY && searchKey.length !== 0) {
            showProductSearchResult(searchKey);
        }
    });

    $('#btn-search-product').on('click', function () {
        var searchKey = $('#txt-search-product').val().trim();

        if (searchKey.length !== 0) {
            showProductSearchResult(searchKey);
        }        
    });

    $('.select-product').on('click', function () {
        var productId = $(this).data('product-id');

        console.log(productId);

        showProductOrderEntry(productId);        
    });

    $('#btn-add-order-entry').on('click', function () {
        initProductSearch();
        $('#div-product-order-entry-message').show(500);

        // TODO-JUDYLL: Add product Id here
    });

    $('#btn-cancel-order-entry').on('click', function () {
        initProductSearch();
    });

    $('#btn-add-order-details').on('click', function () {
        initProductSearch();
        initCustomerSearch(); 

        // TODO-ADD: Add the logic here that saves the order

        $('#div-product-order-create-message').show(500);
    });

    $('#btn-cancel-order-details').on('click', function () {
        initProductSearch();
        initCustomerSearch();
    });
});

function showCustomerSearchResult(searchKey) {
    $('#div-product-order-create-message').hide();

    // TODO-JUDYLL: Add an ajax call to search for the customer here.

    $('#div-customer-result').show(500);

    goToByScroll('div-customer-result');
}

function showOrderDetailsPanel(customerId) {
    $('#div-search-customer-panel').hide();
    $('#div-order-details-panel').show(500);
    
    initProductSearch();

    // TODO-JUDYLL: Retrieve the customer information and address here
    
    // Assign the retrieved customer values in the control
    $('#txt-order-last-name').val('Doe');
    $('#txt-order-first-name').val('John');
    $('#txt-order-email').val('john.doe@gmail.com');
    $('#txt-order-company').val('Insite eCommerce');
    $('#txt-order-city').val('Test City');
    $('#txt-order-address1').val('Test Address 1');
    $('#txt-order-address2').val('Test Address 2');
    $('#txt-order-zip').val('Test Zip');
    $('#txt-order-phone').val('Test Phone');
}

function initCustomerSearch() {
    $('#div-customer-result').hide();
    $('#div-create-customer-control').hide();
    $('#div-order-details-panel').hide();
    $('#div-product-order-create-message').hide();

    $('#h4-customer-panel-text').text('Search Customer');
    $('#div-search-customer-panel').show();
    $('#div-customer-search').show(500);
    $('#txt-search-customer').val('');
    $('#txt-search-customer').focus();

    goToByScroll('div-customer-search');
}

function initProductSearch() {
    $('#div-product-result').hide();
    $('#div-product-order-entry').hide();
    $('#div-product-order-entry-message').hide();

    $('#h4-product-panel-text').text('Search Product to Order');
    $('#div-product-search').show(500);
    $('#txt-search-product').val('');    
    $('#txt-search-product').focus();

    goToByScroll('div-product-search');
}

function showProductSearchResult(searchKey) {
    $('#div-product-order-entry-message').hide();

    // TODO-JUDYLL: Add an ajax call to search for the product here.

    $('#div-product-result').show(500);

    goToByScroll('div-product-result');
}

function showProductOrderEntry(productId) {
    $('#div-product-result').hide();
    $('#div-product-search').hide();
    $('#div-product-order-entry-message').hide();
    $('#h4-product-panel-text').text('Product Order Entry');

    $('#div-product-order-entry').show(500);

    goToByScroll('div-product-order-entry');

    // Assign the retrieved product values in the control
    $('#txt-entry-product-name').val('Anytime Fitness');
    $('#txt-entry-product-sku').val('N00438424SM');
    $('#txt-entry-price-include-tax').val(18.50);
    $('#txt-entry-price-exclude-tax').val(18.50);
    $('#txt-entry-quantity').val(1);
    $('#txt-entry-discount-include-tax').val(0.00);
    $('#txt-entry-discount-exclude-tax').val(0.00);
    $('#txt-entry-total-include-tax').val(18.50);
    $('#txt-entry-total-exclude-tax').val(18.50);
}

function goToByScroll(id){
    //SOURCE: https://stackoverflow.com/questions/3432656/scroll-to-a-div-using-jquery
    $('html,body').animate({ scrollTop: $("#"+id).offset().top },
    'slow');
}

