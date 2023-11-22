document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    // Attach the submit event listener after the DOM is fully loaded
    form.addEventListener('submit', function(event) {
        // Your form submission validation and handling logic
        if (!validateForm()) {
            event.preventDefault();
            console.log('Form submission prevented due to errors.');
            alert('Please fix the errors in the form before submitting.');
        } else {
            console.log('Form submitted successfully.');
            alert('Form submitted successfully.');
            form.reset();
        }
    });


function validateForm() {
    
    console.log('function called');

    const first_name = document.getElementById('firstName');
    const last_name = document.getElementById('lastName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const address_number = document.getElementById('address_number');
    const postalCode = document.getElementById('postal_code');
    const phone_number = document.getElementById('phone');
    const birthdateInput = document.getElementById('birthdate');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const first_nameValue = first_name.value;
    const last_nameValue = last_name.value;
    const emailValue = email.value;
    const addressValue = address.value;
    const address_numberValue = address_number.value;
    const postalCodeValue = postalCode.value.replace(/\s/g, '').length;
    const phone_numberValue = phone_number.value.toString().length;
    const birthdateValue = birthdateInput.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    let errors = 0;
    

    if (address_numberValue<1) {

        setErrorFor(address_number, 'Address number must be greater than 0.');
        errors++;
        //alert('Address number must be greater than 0.');
    }else{
        setSuccessFor(address_number);
    }

    if (postalCodeValue!=5) {

        setErrorFor(postalCode, 'Postal code must be 5 digits.');
        errors++;
        // Alert the user
        //alert('Postal code must be 5 digits.');
    }else{
        setSuccessFor(postalCode);
    }

    if (phone_numberValue!=10) {

        setErrorFor(phone_number, 'Phone number must be 10 digits.');
        errors++;
        // Alert the user
        //alert('Phone number must be 10 digits.');
    }else{
        setSuccessFor(phone_number);
    }

    // Set the min and max values
    birthdateInput.min = '1900-01-01';
    birthdateInput.max = new Date().toISOString().split('T')[0];

    // Get the birthdate input value

    // Convert the value to a Date object
    var birthdateDate = new Date(birthdateValue);

    // Convert the min and max values to Date objects
    var minDate = new Date(birthdateInput.min);
    var maxDate = new Date(birthdateInput.max);

    // If the birthdate is less than the min date or greater than the max date
    if (birthdateDate < minDate || birthdateDate > maxDate) {

        setErrorFor(birthdateInput, 'Birthdate must be between ' + minDate.getFullYear() + ' and ' + maxDate.toISOString().split('T')[0] + '.');
        errors++;
        // Alert the user
        //alert('Birthdate must be between ' + minDate.getFullYear() + ' and ' + maxDate.toISOString().split('T')[0] + '.');
    }else{
        setSuccessFor(birthdateInput);
    }

    if (passwordValue !== confirmPasswordValue) {

        setErrorFor(confirmPassword, 'Passwords do not match.');
        setErrorFor(password, '');
        errors++;
        //alert('Passwords do not match.');
    }else{
        setSuccessFor(confirmPassword);
        setSuccessFor(password);
    }

    // Check if the password meets the criteria
    if (!isValidPassword(passwordValue)) {
        setErrorFor(password, '');
        setErrorFor(confirmPassword, 'Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.');
        errors++;
        //alert('Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.');
    }else{
        setSuccessFor(confirmPassword);
        setSuccessFor(password);
    }


    // Get the checkbox elements
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Check if at least one checkbox is checked
    var isAtLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // If not
    if (!isAtLeastOneChecked) {
        // Alert the user
        alert('Please select at least one contact method.');
        errors++;
    }

    console.log(errors);

    if (errors>0) {
        return false;
    }else{
        return true;
    }
    
}

function isValidPassword(password) {
    // Check if the password has at least one uppercase letter, one lowercase letter, one number, and is 8 characters long
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

function setErrorFor(input,message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
       
});
//TODO: fIX THE VALIDATION FORM ERRORS, REMOVE THE WARNINGS