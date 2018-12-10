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
        $('#txt-create-last-name').focus();        

        goToByScroll('div-create-customer-control');

        // Remove all the existing html elements in the #sel-create-country
        // element and replace it with new <option> element.
        var ddlCountry = $('#sel-create-country');
        ddlCountry.html('');
        ddlCountry.append($('<option></option>').val(0).html('Select a country'));
        ddlCountry.append($('<option></option>').val(8).html('Country 8'));
        ddlCountry.append($('<option></option>').val(9).html('Country 9'));

        // TODO: Judyll -- Add this to SL
        createCustomerFastFeedback();
    });

    $('#sel-create-country').on('change', function () {
        
        // TODO: Judyll -- Must add to SL
        if ($(this).val() <= 0) {
            $('#sel-create-state').attr('disabled', true);
            //How to make the first option of <select> selected with jQuery - https://stackoverflow.com/questions/1414276/how-to-make-the-first-option-of-select-selected-with-jquery
            $('#sel-create-state').val($('#sel-create-state option:first').val());
        } else {
            $('#sel-create-state').attr('disabled', false);
        }        

        var selectedItem = $(this).val();

        console.log(selectedItem);

        var ddlStates = $('#sel-create-state');
        ddlStates.html('');
        ddlStates.append($('<option></option>').val(0).html('Select state'));
        ddlStates.append($('<option></option>').val(1).html('State 1'));
        ddlStates.append($('<option></option>').val(2).html('State 2'));

        // TODO: Judyll -- Must add to SL
        setCustomerCreateButton(false);
    });

    // TODO: Judyll -- Must add to SL
    $('#sel-create-state').on('change', function () {
        setCustomerCreateButton(false);
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

// TODO: Judyll - Add this to SL
function createCustomerFastFeedback() {

    setCustomerCreateButton(true);

    $('#txt-create-last-name').blur(function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-create-last-name'), 
            'Last Name field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-last-name'),
                'Last Name must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);
    });

    $('#txt-create-first-name').blur(function (e) {         
        var isValid = hasValueTextField($(this), $('#feedback-create-first-name'), 
            'First Name field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-first-name'),
                'First Name must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);
    });

    $('#txt-create-email').blur(function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-create-email'), 
            'Email field is required.', e)
        
        if (isValid) {
            isValid = isValidEmail($(this), $('#feedback-create-email'),
                'Please enter a valid email.', e);
        }

        if (isValid) {
            emailAreadyExists($(this), $('#feedback-create-email'),
                'Email already exist.', e);
        }

        setCustomerCreateButton(false);        
    });

    $('#txt-create-company').blur(function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-create-company'), 
            'Company field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-company'),
                'Company must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);        
    });

    $('#sel-create-country').blur(function (e) { 
        hasSelectedOption($(this), $('#feedback-create-country'),
                'Please select a country.', e);
        
        setCustomerCreateButton(false);             
    });

    $('#sel-create-state').blur(function (e) { 
        hasSelectedOption($(this), $('#feedback-create-state'),
                'Please select a state/province.', e);
        
        setCustomerCreateButton(false);          
    });

    $('#txt-create-city').blur(function (e) { 
        hasValueTextField($(this), $('#feedback-create-city'), 
            'City field is required.', e)

        setCustomerCreateButton(false);  
        
    });

    $('#txt-create-address1').blur(function (e) { 
        hasValueTextField($(this), $('#feedback-create-address1'), 
            'Address 1 field is required.', e)

        setCustomerCreateButton(false);          
    });

    $('#txt-create-zip').blur(function (e) { 
        hasValueTextField($(this), $('#feedback-create-zip'), 
            'Zip/Postal Code field is required.', e)

        setCustomerCreateButton(false);         
    });
}

// TODO: Judyll -- Add this to SL
function hasSelectedOption(inputElement, feedbackElement, message, event) {
    if (inputElement.children('option').length > 1 && inputElement.val() <= 0) {
        inputElement.addClass('is-invalid');
        feedbackElement.text(message);
        event.preventDefault();
        return false;
    } else {
        inputElement.removeClass('is-invalid');
        feedbackElement.text('');
        return true;
    }
}

// TODO: Judyll -- Add this to SL
function isValidEmail(inputElement, feedbackElement, message, event) {    
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if (!regex.test(inputElement.val())) {
        inputElement.addClass('is-invalid');
        feedbackElement.text(message);
        event.preventDefault();
        return false;
    } else {
        inputElement.removeClass('is-invalid');
        feedbackElement.text('');
        return true;
    }
}

// TODO: Judyll -- Add this to SL
function emailAreadyExists(inputElement, feedbackElement, message, event) {

    // TODO: Judyll -- Make an ajax call to check if the email already exist on the
    // the server
    if (1 === 0) {
        inputElement.addClass('is-invalid');
        feedbackElement.text(message);
        event.preventDefault();
        return false;
    } else {
        inputElement.removeClass('is-invalid');
        feedbackElement.text('');
        return true;
    }
}

// TODO: Judyll -- Add this to SL
function hasValueTextField(inputElement, feedbackElement, message, event) {
    if (inputElement.val().trim().length <= 0) {
        inputElement.addClass('is-invalid');
        feedbackElement.text(message);
        event.preventDefault();
        return false;
    } else {
        inputElement.removeClass('is-invalid');
        feedbackElement.text('');
        return true;
    }
}

// TODO: Judyll -- Add this to SL
function isValidThreeChar(inputElement, feedbackElement, message, event) {
    if (inputElement.val().trim().length < 3 ) {
        inputElement.addClass('is-invalid');
        feedbackElement.text(message);
        event.preventDefault();
        return false;
    } else {
        inputElement.removeClass('is-invalid');
        feedbackElement.text('');
        return true;
    }
}

// TODO: Judyll -- Add this to SL
function setCustomerCreateButton(isLoad) {    

    var createButton = $('#btn-create-customer');

    if (isLoad) {
        createButton.attr('disabled', true);
    } else {        
        var hasErrors = false;
        // Select all elements that has the class .invalid-feedback inside
        // the element which has the id #div-create-customer-control.  Make sure
        // you will add the 'space' between #div-create-customer-control and .invalid-feedback
        var feedBacks = $('#div-create-customer-control .invalid-feedback');
        $.each(feedBacks, function (index, fb) {
            if (fb.innerText.length > 0) {
                hasErrors = true;
                return;
            }
        });

        // jQuery - Get input value with specific class name - https://stackoverflow.com/questions/40957357/jquery-get-input-value-with-specific-class-name
        $('#div-create-customer-control .text-required').each(function () {
            if ($(this).val().trim().length === 0) {
                hasErrors = true;
                return;
            }
        });

        $('#div-create-customer-control .select-required').each(function () {
            if ($(this).children('option').length > 1 && $(this).val() <= 0) {
                hasErrors = true;
                return;
            }
        });

        createButton.attr('disabled', hasErrors);
    }    
}

function showCustomerSearchResult(searchKey) {
    $('#div-product-order-create-message').hide();

    // TODO: Judyll - Add an ajax call to search for the customer here.

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
    $('#sel-create-state').attr('disabled', true);

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

    goToByScroll('h4-product-panel-text');
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

    goToByScroll('h4-product-panel-text');

    // Assign the retrieved product values in the control
    $('#txt-entry-product-name').val('Anytime Fitness');
    $('#txt-entry-product-sku').val('N00438424SM');
    $('#txt-entry-price-include-tax').val(18.50);
    $('#txt-entry-price-include-tax').focus();
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

