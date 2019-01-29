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

        createCustomerFastFeedback();
    });

    $('#sel-create-country').on('change', function () {
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

        setCustomerCreateButton(false);
    });

    
    $('#sel-create-state').on('change', function () {
        setCustomerCreateButton(false);
    });

    $('#btn-create-customer').on('click', function () {
        // TODO-JUDYLL: Add the logic here to create a new customer

        // If successful get the new customer Id        
        var customerData = {
            LastName: $('#txt-create-last-name').val(),
            FirstName: $('#txt-create-first-name').val(),
            Email: $('#txt-create-email').val(),
            Company: $('#txt-create-company').val(),
            CountryId: $('#sel-create-country').val(),
            StateProvinceId: $('#sel-create-state').val(),
            City: $('#txt-create-city').val(),
            Address1: $('#txt-create-address1').val(),
            Address2: $('#txt-create-address2').val(),
            ZipPostalCode: $('#txt-create-zip').val(),
            Phone: $('#txt-create-phone').val()
        };

        toastr.success('Customer has been created.');

        initOrderTypeSelect(customerData);
    });

    $('#btn-cancel-customer').on('click', function () {
        initCustomerSearch();        
        resetCreateCustomerForm();
    });

    $('.select-customer').on('click', function () {
        var customerId = $(this).data('customer-id');

        selectCustomerAndInitOrderTypeSelect(customerId);        
    });

    $('#btn-proceed-order-type').on('click', function () {
        showOrderDetailsPanel();
    });

    $('#btn-cancel-order-type').on('click', function () {
        initCustomerSearch();
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

    $('#txt-entry-quantity').on('input blur', function (e) { 
        setQuantityFastFeedback(e);
    });

    $('.select-product').on('click', function () {
        var productId = $(this).data('product-id');

        selectProductAndShowProductOrderEntry(productId);        
    });

    $('#btn-add-order-entry').on('click', function () {
        initProductSearch();
        
        setOrderCreateButton(false);

        // TODO-JUDYLL: Add product Id here
        toastr.success('Product has been added to the order. Please check the Order Details panel.');
    });

    $('#btn-cancel-order-entry').on('click', function () {
        initProductSearch();
        resetAddProductToOrderForm();
    });

    // TODO: Update SL
    $('#sel-order-billing-address-select').on('change', function (e) {
        if ($(this).val() > 0) {
            var param = {
                addressId: $(this).val()
            };

            // Populate the billing fields
            // $.get('/strideline/process/getaddressdetailsbyid',
            //     addAntiForgeryToken(param), function (data) {
            //         if (data.Error === false) {
            //             $('#hdn-order-billing-address-id').val(data.Result.Id);

            //             if (isReplacementOrderType()) {
            //                 $('#txt-order-billing-company').val('Web Store');
            //             } else {
            //                 $('#txt-order-billing-company').val(data.Result.Company);
            //             }

            //             $('#sel-order-billing-country').val(data.Result.CountryId);
            //             $('#hdn-order-billing-state-id').val(data.Result.StateProvinceId);
            //             $('#txt-order-billing-city').val(data.Result.City);
            //             $('#txt-order-billing-address1').val(data.Result.Address1);
            //             $('#txt-order-billing-address2').val(data.Result.Address2);
            //             $('#txt-order-billing-zip').val(data.Result.ZipPostalCode);
            //             $('#txt-order-billing-phone').val(data.Result.PhoneNumber);
            //         }
            //     }).success(function () {
            //         var param = {
            //             countryId: $('#sel-order-billing-country').val(),
            //             addSelectStateItem: 'true'
            //         };

            //         // Populate the new customer create states field
            //         $.get('/strideline/process/getstatesbycountryid',
            //             addAntiForgeryToken(param), function (data) {
            //                 // Add the <option> element to the billing state dropdown list
            //                 var ddlStates = $('#sel-order-billing-state');
            //                 // Remove all html elements in the #sel-order-billing-country element
            //                 ddlStates.html('');
            //                 // Iterate through each data returned in the /getstatesbycountryid method
            //                 // and append it as an option in the dropdown list
            //                 $.each(data, function (index, states) {
            //                     ddlStates.append($('<option></option>').val(states.id).html(states.name));
            //                 });
            //             }).success(function () {
            //                 $('#sel-order-billing-state').val($('#hdn-order-billing-state-id').val());
            //             }).fail(function () {
            //                 toastr.error('Failed to load list of States/Provinces.');
            //             });
            //     }).fail(function () {
            //         toastr.error('Failed to load address details.');
            //     });
            goToByScroll('billing-tab');

            $('#txt-order-billing-company').focus();
        } else if ($(this).val() < 0) {
            initProductSearch();
            resetAddProductToOrderForm();

            var forOrder = $('.billing-address-for-order, .general-fields-for-order');
            $.each(forOrder, function () {
                $(this).hide();
            });

            var forCreate = $('.billing-address-for-create-new');
            $.each(forCreate, function () {
                $(this).show();
            });

            var txtInput = $('#billing-tab').find('input:text');
            $.each(txtInput, function () {
                $(this).val('');
            });            

            goToByScroll('billing-tab');

            $('#txt-order-billing-last-name').focus();
            $('#sel-order-billing-country, #sel-order-billing-state').val(0);
            $('#sel-order-billing-state, #txt-search-product, #btn-search-product').attr('disabled', true);
            $('#shipping-list').hide();
        }
    });

    $('#billing-tab').on('click', function () {
        
    });

    $('#sel-order-billing-country').on('change', function () {

        if ($(this).val() <= 0) {
            $('#sel-order-billing-state').attr('disabled', true);
            //How to make the first option of <select> selected with jQuery - https://stackoverflow.com/questions/1414276/how-to-make-the-first-option-of-select-selected-with-jquery
            $('#sel-order-billing-state').val($('#sel-order-billing-state option:first').val());
        } else {
            $('#sel-order-billing-state').attr('disabled', false);
        }

        var param = {
            countryId: $(this).val(),
            addSelectStateItem: 'true'
        };

        // Populate the new customer create states field
        // $.get('/strideline/process/getstatesbycountryid',
        //     addAntiForgeryToken(param), function (data) {

        //         // Add the <option> element to the new customer counter dropdown list
        //         var ddlStates = $('#sel-order-billing-state');
        //         // Remove all html elements in the #sel-order-billing-country element
        //         ddlStates.html('');
        //         // Iterate through each data returned in the /getstatesbycountryid method
        //         // and append it as an option in the dropdown list
        //         $.each(data, function (index, states) {
        //             ddlStates.append($('<option></option>').val(states.id).html(states.name));
        //         });
        //     }).fail(function () {
        //         alert('Failed to load list of States/Provinces.');
        //     });

        //setCustomerCreateButton(false);

        var ddlStates = $('#sel-order-billing-state');
        ddlStates.html('');
        ddlStates.append($('<option></option>').val(0).html('Select state'));
        ddlStates.append($('<option></option>').val(1).html('State 1'));
        ddlStates.append($('<option></option>').val(2).html('State 2'));
    });

    // TODO: Update SL
    $('#btn-cancel-order-billing-address').on('click', function () {
        var forOrder = $('.billing-address-for-order, .general-fields-for-order');
        $.each(forOrder, function () {
            $(this).show();
        });

        var forCreate = $('.billing-address-for-create-new');
        $.each(forCreate, function () {
            $(this).hide();
        });

        // Add ajax call to get the previous billing address

        goToByScroll('billing-tab');

        $('#txt-order-billing-last-name').focus();
        $('#txt-search-product, #btn-search-product').attr('disabled', false);
        $('#shipping-list').show();
    });

    $('#btn-create-order-details').on('click', function () {
        initProductSearch();
        initCustomerSearch(); 

        // TODO-ADD: Add the logic here that saves the order

        toastr.success('Order Entry has been created.');
    });    

    // SOURCE: https://cmatskas.com/upload-files-in-asp-net-mvc-with-javascript-and-c/
    $('#file-order-po-file').on('change', function (e) {
        var files = e.target.files;

        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();
                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                }

                console.log(data);
            } else {
                toastr.error("This browser doesn't support HTML5 file uploads!");
            }
        }
    });

    $('#btn-cancel-order-details').on('click', function () {
        initProductSearch();
        initCustomerSearch();
    });        
});

function resetCreateCustomerForm() {
    $('#txt-create-last-name').val('');
    $('#txt-create-first-name').val('');
    $('#txt-create-email').val('');
    $('#txt-create-company').val('');
    $('#sel-create-country').val(0);
    $('#sel-create-state').val(0);
    $('#txt-create-city').val('');
    $('#txt-create-address1').val('');
    $('#txt-create-address2').val('');
    $('#txt-create-zip').val('');
    $('#txt-create-phone').val('');

    $('#btn-create-customer').attr('disabled', true);
}

function createCustomerFastFeedback() {
    setCustomerCreateButton(true);

    $('#txt-create-last-name').off('blur').on('blur', function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-create-last-name'), 
            'Last Name field is required.', e);
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-last-name'),
                'Last Name must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);
    });

    $('#txt-create-first-name').off('blur').on('blur', function (e) {         
        var isValid = hasValueTextField($(this), $('#feedback-create-first-name'), 
            'First Name field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-first-name'),
                'First Name must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);
    });

    $('#txt-create-email').off('blur').on('blur', function (e) { 
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

    $('#txt-create-company').off('blur').on('blur', function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-create-company'), 
            'Company field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-create-company'),
                'Company must contain at least 3 characters.', e);
        }

        setCustomerCreateButton(false);        
    });

    $('#sel-create-country').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-create-country'),
                'Please select a country.', e);
        
        setCustomerCreateButton(false);             
    });

    $('#sel-create-state').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-create-state'),
                'Please select a state/province.', e);
        
        setCustomerCreateButton(false);          
    });

    $('#txt-create-city').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-create-city'), 
            'City field is required.', e)

        setCustomerCreateButton(false);  
        
    });

    $('#txt-create-address1').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-create-address1'), 
            'Address 1 field is required.', e)

        setCustomerCreateButton(false);          
    });

    $('#txt-create-zip').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-create-zip'), 
            'Zip/Postal Code field is required.', e)

        setCustomerCreateButton(false);         
    });
}

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

function emailAreadyExists(inputElement, feedbackElement, message, event) {

    // NOTE: Implementation of this method is different with what was
    // implemented on SL

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

function resetFastFeedback(isLoad) {
    $('#div-create-customer-control .invalid-feedback').each(function() {
        $(this).text('');
    });

    $('#div-create-customer-control .is-invalid').each(function() {
        $(this).removeClass('is-invalid');
    });

    $('#div-product-order-entry .invalid-feedback').each(function() {
        $(this).text('');
    });

    $('#div-product-order-entry .is-invalid').each(function() {
        $(this).removeClass('is-invalid');
    });

    if (isLoad) {
        $('#div-create-order-details-control .invalid-feedback').each(function() {
            $(this).text('');
        });
    
        $('#div-create-order-details-control .is-invalid').each(function() {
            $(this).removeClass('is-invalid');
        });
    }
}

function createAddProductFastFeedback() {

    if (!isSalesOrderType()) {
        setAddOrderEntryButton(false);

        $('#txt-entry-price').removeClass('one-greater-required');        
        $('#txt-entry-price').off('blur');

        $('#txt-entry-price-exclude-tax').removeClass('one-greater-required');
        $('#txt-entry-price-exclude-tax').off('blur');

        $('#txt-entry-discount-include-tax').removeClass('zero-greater-required');
        $('#txt-entry-discount-include-tax').off('blur');

        $('#txt-entry-discount-exclude-tax').removeClass('zero-greater-required');
        $('#txt-entry-discount-exclude-tax').off('blur');

        $('#txt-entry-total-include-tax').removeClass('one-greater-required');
        $('#txt-entry-total-include-tax').off('blur');

        $('#txt-entry-total-exclude-tax').removeClass('one-greater-required');
        $('#txt-entry-total-exclude-tax').off('blur');
    } else {
        setAddOrderEntryButton(true);

        $('#txt-entry-price').removeClass('one-greater-required').addClass('one-greater-required');
        $('#txt-entry-price').off('blur').on('blur', function (e) {
            isValidGreaterEqualToOne($(this), $('#feedback-entry-price-include-tax'),
                'Price (incl tax) field should be greater than 0.', e);
    
            setAddOrderEntryButton(false);
        });        

        $('#txt-entry-price-exclude-tax').removeClass('one-greater-required').addClass('one-greater-required');
        $('#txt-entry-price-exclude-tax').off('blur').on('blur', function (e) { 
            isValidGreaterEqualToOne($(this), $('#feedback-entry-price-exclude-tax'),
                'Price (excl tax) field should be greater than 0.', e);
    
            setAddOrderEntryButton(false);        
        });        

        $('#txt-entry-discount-include-tax').removeClass('zero-greater-required').addClass('zero-greater-required');
        $('#txt-entry-discount-include-tax').off('blur').on('blur', function (e) { 
            isValidGreaterEqualToZero($(this), $('#feedback-entry-discount-include-tax'),
                'Discount (incl tax) field should be a positive number.', e);

            setAddOrderEntryButton(false);                
        });

        $('#txt-entry-discount-exclude-tax').removeClass('zero-greater-required').addClass('zero-greater-required');
        $('#txt-entry-discount-exclude-tax').off('blur').on('blur', function (e) {         
            isValidGreaterEqualToZero($(this), $('#feedback-entry-discount-exclude-tax'),
                'Discount (excl tax) field should be a positive number.', e);
    
            setAddOrderEntryButton(false);                
        });

        $('#txt-entry-total-include-tax').removeClass('one-greater-required').addClass('one-greater-required');
        $('#txt-entry-total-include-tax').off('blur').on('blur', function (e) { 
            isValidGreaterEqualToOne($(this), $('#feedback-entry-total-include-tax'),
                'Total (incl tax) field should be greater than 0.', e);
    
            setAddOrderEntryButton(false);                
        });

        $('#txt-entry-total-exclude-tax').removeClass('one-greater-required').addClass('one-greater-required');
        $('#txt-entry-total-exclude-tax').off('blur').on('blur', function (e) { 
            isValidGreaterEqualToOne($(this), $('#feedback-entry-total-exclude-tax'),
                'Total (excl tax) field should be greater than 0.', e);
    
            setAddOrderEntryButton(false);                        
        });
    }       
}

// TODO: Update to SL
function setQuantityFastFeedback(event) {
    var quantity = $('#txt-entry-quantity');
    var feedback = $('#feedback-entry-quantity');
    var min = quantity.data('min-quantity') || 0;
    var max = quantity.data('max-quantity') || 0;
    var hasErrors = false;

    if (min > 0 && max > 0) {
        if (quantity.val() < min || quantity.val() > max) {
            quantity.addClass('is-invalid');
            feedback.text('Quantity value should be between ' + min +
                ' and ' + max);
            event.preventDefault();
            hasErrors = true;

            $('#div-entry-price').hide();
        }
    }

    if (!hasErrors) {
        hasErrors = !isValidGreaterEqualToOne(quantity, feedback,
            'Quantity field should be greater than 0.', event);            

        if (!hasErrors) {
            $('#div-entry-price').show();

            console.log('No errors. Get the tier price');
        } else {
            $('#div-entry-price').hide();

            console.log('Has errors');
        }
    }    

    setAddOrderEntryButton(false);
}

function setAddOrderEntryButton(isLoad) {
    var addButton = $('#btn-add-order-entry');

    if (isLoad) {
        addButton.attr('disabled', true);
    } else {
        var hasErrors = false;
        // Check if there are invalid feedbacks in the product order entry
        var feedBacks = $('#div-product-order-entry .invalid-feedback');
        $.each(feedBacks, function (index, fb) {
            if (fb.innerText.length > 0) {
                hasErrors = true;
                return;
            }
        });

        // Check if fields with one-greater-required has value lesser than one
        $('#div-product-order-entry one-greater-required').each(function() {
            if (!isInputGreaterOrEqual($(this).val(), 1)) {
                hasErrors = true;
                return;
            }
        });

        // Check if fields with zero-greater-required has value lesser than zero
        $('#div-product-order-entry zero-greater-required').each(function() {
            if (!isInputGreaterOrEqual($(this).val(), 0)) {
                hasErrors = true;
                return;
            }
        });

        addButton.attr('disabled', hasErrors);       
    }
}

function createOrderDetailsFastFeedback() {
    setOrderCreateButton(true);

    $('#txt-order-billing-company').off('blur').on('blur', function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-order-billing-company'), 
            'Company field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-order-billing-company'),
                'Company must contain at least 3 characters.', e);
        }

        setOrderCreateButton(false);        
    });

    $('#sel-order-billing-country').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-order-billing-country'),
                'Please select a country.', e);
        
        setOrderCreateButton(false);             
    });

    $('#sel-order-billing-state').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-order-billing-state'),
                'Please select a state/province.', e);
        
        setOrderCreateButton(false);          
    });

    $('#txt-order-billing-city').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-billing-city'), 
            'City field is required.', e)

        setOrderCreateButton(false);        
    });

    $('#txt-order-billing-address1').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-billing-address1'), 
            'Address 1 field is required.', e)

        setOrderCreateButton(false);          
    });

    $('#txt-order-billing-zip').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-billing-zip'), 
            'Zip/Postal Code field is required.', e)

        setOrderCreateButton(false);         
    });

    $('#txt-order-shipping-rate').off('blur').on('blur', function (e) { 
        isValidGreaterEqualToOne($(this), $('#feedback-txt-order-shipping-rate'), 
            'Shipping Rate field should be greater than 0.', e)

        setOrderCreateButton(false);         
    });

    $('#txt-order-shipping-company').off('blur').on('blur', function (e) { 
        var isValid = hasValueTextField($(this), $('#feedback-order-shipping-company'), 
            'Company field is required.', e)
        
        if (isValid) {
            isValidThreeChar($(this), $('#feedback-order-shipping-company'),
                'Company must contain at least 3 characters.', e);
        }

        setOrderCreateButton(false);        
    });

    $('#sel-order-shipping-country').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-order-shipping-country'),
                'Please select a country.', e);
        
        setOrderCreateButton(false);             
    });

    $('#sel-order-shipping-state').off('blur').on('blur', function (e) { 
        hasSelectedOption($(this), $('#feedback-order-shipping-state'),
                'Please select a state/province.', e);
        
        setOrderCreateButton(false);          
    });

    $('#txt-order-shipping-city').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-shipping-city'), 
            'City field is required.', e)

        setOrderCreateButton(false);        
    });

    $('#txt-order-shipping-address1').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-shipping-address1'), 
            'Address 1 field is required.', e)

        setOrderCreateButton(false);          
    });

    $('#txt-order-shipping-zip').off('blur').on('blur', function (e) { 
        hasValueTextField($(this), $('#feedback-order-shipping-zip'), 
            'Zip/Postal Code field is required.', e)

        setOrderCreateButton(false);         
    });
}

function setOrderCreateButton(isLoad) {
    var createButton = $('#btn-create-order-details');

    if (isLoad) {
        createButton.attr('disabled', true);
    } else {
        var hasErrors = false;
        // Select all elements that has the class .invalid-feedback inside
        // the element which has the id #div-create-customer-control.  Make sure
        // you will add the 'space' between #div-create-customer-control and .invalid-feedback
        var feedBacks = $('#div-create-order-details-control .invalid-feedback');
        $.each(feedBacks, function (index, fb) {
            if (fb.innerText.length > 0) {
                hasErrors = true;
                return;
            }
        });

        // jQuery - Get input value with specific class name - https://stackoverflow.com/questions/40957357/jquery-get-input-value-with-specific-class-name
        $('#div-create-order-details-control .text-required').each(function () {
            if ($(this).val().trim().length === 0) {
                hasErrors = true;
                return;
            }
        });

        $('#div-create-order-details-control .select-required').each(function () {
            if ($(this).children('option').length > 1 && $(this).val() <= 0) {
                hasErrors = true;
                return;
            }
        });

        // Check if fields with zero-greater-required has value lesser than zero
        $('#div-create-order-details-control zero-greater-required').each(function() {
            if (!isInputGreaterOrEqual($(this).val(), 0)) {
                hasErrors = true;
                return;
            }
        });

        // var grid = $("#Grid").data("kendoGrid");
        // var dataSource = grid.dataSource;
        
        // //records on current view / page   
        // var recordsOnCurrentView = dataSource.view().length;
        // //total records
        // var totalRecords = dataSource.total();  
        var grid = $('#div-product-order-grid').data('kendoGrid');
        
        if (!grid || grid.dataSource.total() < 1) {
            hasErrors = true;
        }

        createButton.attr('disabled', hasErrors);
    }
}

function isValidGreaterEqualToOne(inputElement, feedbackElement, message, event) {
    if (!isInputGreaterOrEqual(inputElement.val(), 1)) {
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

function isValidGreaterEqualToZero(inputElement, feedbackElement, message, event) {
    if (!isInputGreaterOrEqual(inputElement.val(), 0)) {
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

function isInputGreaterOrEqual(input, compareValue) {
    return input >= compareValue;
}

// Uses the values in ..nopCommerce\Libraries\Nop.Services\PlatformOverrides\Orders\OrderService.cs
// method GetOrderTypesKeyValue()
function isSalesOrderType() {
    return $('#sel-order-type-select').val() === 'sales-order';
}

// Uses the values in ..nopCommerce\Libraries\Nop.Services\PlatformOverrides\Orders\OrderService.cs
// method GetOrderTypesKeyValue()
function isReplacementOrderType() {
    return $('#sel-order-type-select').val() === 'replacement-pairs';
}

// Uses the values in ..nopCommerce\Libraries\Nop.Services\PlatformOverrides\Orders\OrderService.cs
// method GetOrderTypesKeyValue()
function isSampleOrderType() {
    return $('#sel-order-type-select').val() === 'samples';
}

function showCustomerSearchResult(searchKey) {
    // TODO: Judyll - Add an ajax call to search for the customer here.

    $('#div-customer-result').show(500);

    goToByScroll('div-customer-result');
}

function selectCustomerAndInitOrderTypeSelect(customerId) {

    // TODO: Judyll - Must create an ajax call that gets the customer details
    // based on the given customer id
    var customerData = {
        LastName: 'LastOrderEntry',
        FirstName: 'FirstOrderEntry',
        Email: '20181212-220PM@OrderEntry.com',
        Company: 'CompanyOrderEntry',
        CountryId: 8,
        StateProvinceId: 1,
        City: 'CompanyOrderEntry',
        Address1: 'Address1OrderEntry',
        Address2: 'Address2OrderEntry',
        ZipPostalCode: 'ZipOrderEntry',
        Phone: 'PhoneOrderEntry'
    };

    initOrderTypeSelect(customerData);
}

function showOrderDetailsPanel() {
    $('#div-order-type-select-panel').hide();
    $('#div-order-details-panel').show(500);
    
    // Make the billing/shipping tab active
    initAddressTab();
    // $('#shipping-billing-tab').removeClass('nav nav-tabs').addClass('nav nav-tabs');
    // $('#shipping-billing-tab li:first').removeClass('active').addClass('active');
    // $('#shipping-billing-tab li').removeData('toggle').data('toggle', 'tab');

    // TODO: Must change to an ajax call
    var ddlOrderType = $('#sel-order-type-add');
    ddlOrderType.html('');
    ddlOrderType.append($('<option></option>').val('sales-order').html('Sales Order'));
    ddlOrderType.append($('<option></option>').val('samples').html('Samples'));
    ddlOrderType.append($('<option></option>').val('stock').html('Stock'));
    ddlOrderType.append($('<option></option>').val('amazon').html('Amazon'));
    ddlOrderType.append($('<option></option>').val('replen').html('Replen'));
    ddlOrderType.append($('<option></option>').val('bbby-replen').html('BBBY Replen'));
    ddlOrderType.append($('<option></option>').val('replacement-pairs').html('Replacement Pairs 3'));

    ddlOrderType.val($('#sel-order-type-select').val());
    ddlOrderType.attr('disabled', true);

    initProductSearch();
    createAddProductFastFeedback();

    resetShippingOptions();
}


function initAddressTab() {
    $('shipping-billing-tab').removeClass('nav nav-tabs').addClass('nav nav-tabs');
    $('#shipping-billing-tab li').removeClass('active');
    $('#shipping-billing-tab li:first').addClass('active');
    $('#shipping-billing-tab li').removeData('toggle').data('toggle', 'tab');
    $('#billing-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in active');
    $('#shipping-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in');
}

function activeBillingTab() {
    $('#billing-list').removeClass('active').addClass('active');
    $('#shipping-list').removeClass('active');
    $('#billing-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in active');
    $('#shipping-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in');
}

function activateShippingTab() {
    $('#billing-list').removeClass('active');
    $('#shipping-list').removeClass('active').addClass('active');
    $('#billing-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in');
    $('#shipping-tab').removeClass('tab-pane fade in active').addClass('tab-pane fade in active');
}

function initCustomerSearch() {
    $('#div-customer-result').hide();
    $('#div-create-customer-control').hide();
    $('#div-order-type-select-panel').hide();
    $('#div-order-details-panel').hide();
    $('#sel-create-state').attr('disabled', true);

    $('#h4-customer-panel-text').text('Search Customer');
    $('#div-search-customer-panel').show();
    $('#div-customer-search').show(500);
    $('#txt-search-customer').val('');
    $('#txt-search-customer').focus();

    goToByScroll('div-customer-search');

    resetFastFeedback(true);
}

function initOrderTypeSelect(customerData) {
    $('#div-search-customer-panel').hide();
    $('#div-order-type-select-panel').show(500);
    $('#btn-proceed-order-type').attr('disabled', true);
    $('#txt-search-product, #btn-search-product').attr('disabled', false);

    // TODO: Must change to an ajax call
    var ddlOrderType = $('#sel-order-type-select');
    ddlOrderType.html('');
    ddlOrderType.append($('<option></option>').val('sales-order').html('Sales Order'));
    ddlOrderType.append($('<option></option>').val('samples').html('Samples'));
    ddlOrderType.append($('<option></option>').val('stock').html('Stock'));
    ddlOrderType.append($('<option></option>').val('amazon').html('Amazon'));
    ddlOrderType.append($('<option></option>').val('replen').html('Replen'));
    ddlOrderType.append($('<option></option>').val('bbby-replen').html('BBBY Replen'));
    ddlOrderType.append($('<option></option>').val('replacement-pairs').html('Replacement Pairs 3'));

    goToByScroll('sel-order-type-select');

    // TODO: Update SL but use an ajax call
    var ddlSalesRep = $('#sel-sales-rep-select');
    ddlSalesRep.html('');
    ddlSalesRep.append($('<option></option>').val('1').html('Rep 1'));
    ddlSalesRep.append($('<option></option>').val('2').html('Rep 2'));

    $('#btn-proceed-order-type').attr('disabled', false);

    // Assign the retrieved customer values in the control
    $('#hdn-order-customer-id').val(customerData.Id)
    $('#txt-order-last-name').val(customerData.LastName);
    $('#txt-order-first-name').val(customerData.FirstName);
    $('#txt-order-email').val(customerData.Email);
    $('#txt-order-billing-company').val(customerData.Company);

    // TODO: Judyll - Add the logic here that retrieves and 
    // assigns the country and state id

    // Remove all the existing html elements in the #sel-create-country
    // element and replace it with new <option> element.
    var ddlCountry = $('#sel-order-billing-country');
        ddlCountry.html('');
        ddlCountry.append($('<option></option>').val(0).html('Select a country'));
        ddlCountry.append($('<option></option>').val(8).html('Country 8'));
        ddlCountry.append($('<option></option>').val(9).html('Country 9'));

    $('#sel-order-billing-country').val(customerData.CountryId);

    var ddlStates = $('#sel-order-billing-state');
        ddlStates.html('');
        ddlStates.append($('<option></option>').val(0).html('Select state'));
        ddlStates.append($('<option></option>').val(1).html('State 1'));
        ddlStates.append($('<option></option>').val(2).html('State 2'));

    $('#sel-order-billing-state').val(customerData.StateProvinceId);

    // TODO: Update SL
    $('#txt-order-billing-last-name').val(customerData.LastName);
    $('#txt-order-billing-first-name').val(customerData.FirstName);
    $('#txt-order-billing-email').val(customerData.Email);

    $('#txt-order-billing-city').val(customerData.City);
    $('#txt-order-billing-address1').val(customerData.Address1);
    $('#txt-order-billing-address2').val(customerData.Address2);
    $('#txt-order-billing-zip').val(customerData.ZipPostalCode);
    $('#txt-order-billing-phone').val(customerData.Phone);    

    // TODO: Update SL
    var forOrder = $('.billing-address-for-order, .general-fields-for-order');
    $.each(forOrder, function () {
        $(this).show();
    });

    var forCreate = $('.billing-address-for-create-new');
    $.each(forCreate, function () {
        $(this).hide();
    });

    createOrderDetailsFastFeedback();
}

function initProductSearch() {
    $('#div-product-result').hide();
    $('#div-product-order-entry').hide();

    // TODO: Update SL
    $('#txt-search-product, #btn-search-product').attr('disabled', false);
    $('#h4-product-panel-text').text('Search Product to Order');
    $('#div-product-search').show(500);
    $('#txt-search-product').val('');    
    $('#txt-search-product').focus();

    goToByScroll('h4-product-panel-text');

    resetFastFeedback(false);
}

function showProductSearchResult(searchKey) {
    // TODO-JUDYLL: Add an ajax call to search for the product here.

    $('#div-product-result').show(500);

    goToByScroll('div-product-result');
}

function selectProductAndShowProductOrderEntry(productId) {

    // TODO: Judyll - Must create an ajax call that gets the customer details
    // based on the given customer id
    var productData = {
        Id: productId,
        Name: 'CrossFit',
        Sku: 'N02832344',
        OrderMinimumQuantity: 30,
        OrderMaximumQuantity: 100
    };

    showProductOrderEntry(productData);
}

function showProductOrderEntry(productData) {
    $('#div-product-result').hide();
    $('#div-product-search').hide();
    $('#div-entry-price').hide();
    $('#h4-product-panel-text').text('Product Order Entry');

    $('#div-product-order-entry').show(500);

    goToByScroll('h4-product-panel-text');

    // Assign the retrieved product values in the control
    $('#hdn-entry-product-id').val(productData.Id);
    $('#txt-entry-product-name').val(productData.Name);
    $('#txt-entry-product-sku').val(productData.Sku);
    $('#txt-entry-price').val(18.50);
    $('#txt-entry-price').focus();
    $('#txt-entry-price-exclude-tax').val(18.50);
    $('#txt-entry-quantity').val(0);
    $('#txt-entry-discount-include-tax').val(0.00);
    $('#txt-entry-discount-exclude-tax').val(0.00);
    $('#txt-entry-total-include-tax').val(18.50);
    $('#txt-entry-total-exclude-tax').val(18.50);
    $('#txt-entry-quantity').data('min-quantity', productData.OrderMinimumQuantity);
    $('#txt-entry-quantity').data('max-quantity', productData.OrderMaximumQuantity);

    if (!isSalesOrderType()) {
        $('#txt-entry-price').val(0.00);
        $('#txt-entry-price').attr('disabled', true);

        $('#txt-entry-price-exclude-tax').val(0.00);
        $('#txt-entry-price-exclude-tax').attr('disabled', true);

        $('#txt-entry-quantity').focus();

        $('#txt-entry-discount-include-tax').val(0.00);
        $('#txt-entry-discount-include-tax').attr('disabled', true);

        $('#txt-entry-discount-exclude-tax').val(0.00);
        $('#txt-entry-discount-exclude-tax').attr('disabled', true);

        $('#txt-entry-total-include-tax').val(0.00);
        $('#txt-entry-total-include-tax').attr('disabled', true);

        $('#txt-entry-total-exclude-tax').val(0.00);
        $('#txt-entry-total-exclude-tax').attr('disabled', true);
    } else {
        $('#txt-entry-price').attr('disabled', false);
        $('#txt-entry-price-exclude-tax').attr('disabled', false);
        $('#txt-entry-discount-include-tax').attr('disabled', false);
        $('#txt-entry-discount-exclude-tax').attr('disabled', false);
        $('#txt-entry-total-include-tax').attr('disabled', false);
        $('#txt-entry-total-exclude-tax').attr('disabled', false);
    }
}

function resetAddProductToOrderForm() {
    $('#hdn-entry-product-id').val(0);
    $('#txt-entry-product-name').val('');
    $('#txt-entry-product-sku').val('');
    $('#txt-entry-price').val(0);
    $('#txt-entry-price').focus();
    $('#txt-entry-price-exclude-tax').val(0);
    $('#txt-entry-quantity').val(0);
    $('#txt-entry-discount-include-tax').val(0.00);
    $('#txt-entry-discount-exclude-tax').val(0.00);
    $('#txt-entry-total-include-tax').val(0);
    $('#txt-entry-total-exclude-tax').val(0);

    $('#btn-add-order-entry').attr('disabled', true);
}

function removeProductFromOrder(productId) {
    setOrderCreateButton(false);
    // Add an ajax call that removes the product from the order list
}

function resetShippingOptions() {
    var shippingOptions = $('#fset-shipping-options');

    shippingOptions.html('');
    shippingOptions.append($('<div class="row">')
        .append($('<div class="col-sm-1">')
        .append($('<input type="radio" class="shipping-options" name="fset-shipping-options" />')
        .val('shipping1')            
        .attr('checked', true)
        .data('rate', '5.0')))
        .append($('<div class="col-sm-7">').html('Shipping One')));

    $('#txt-order-shipping-rate').val('5.0');

    shippingOptions.append($('<div class="row">')
        .append($('<div class="col-sm-1">')
        .append($('<input type="radio" class="shipping-options" name="fset-shipping-options" />')
        .val('shipping2')            
        .attr('checked', false)
        .data('rate', '15.0')))
        .append($('<div class="col-sm-7">').html('Shipping Two')));

    $('.shipping-options').off('click').on('click', function () {        
        $('#txt-order-shipping-rate').val($(this).data('rate'));

        var shippingMethodName = $('input[type=radio]:checked', '#fset-shipping-options').val();
        alert(shippingMethodName);
    });
}

function goToByScroll(id) {
    //SOURCE: https://stackoverflow.com/questions/3432656/scroll-to-a-div-using-jquery
    $('html,body').animate({ scrollTop: $("#"+id).offset().top },
    'slow');
}

