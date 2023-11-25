document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    // Attach the submit event listener after the DOM is fully loaded
    form.addEventListener('submit', function(event) {
        // form submission validation and handling logic
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
    const username = document.getElementById('username');

    const first_nameValue = first_name.value;
    const last_nameValue = last_name.value;
    const emailValue = email.value;
    const addressValue = address.value;
    const address_numberValue = address_number.value;
    const birthdateValue = birthdateInput.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    const usernameValue = username.value;

    let errors = 0;

    let nameRegex = /^[a-zA-Z\u0370-\u03FF\s]+$/; // This regex allows English and Greek characters and spaces
    
    if (!nameRegex.test(first_nameValue)) {
        setErrorFor(first_name, 'First name must contain only English and Greek characters.');
        errors++;
    } else {
        setSuccessFor(first_name);
    }

    if (!nameRegex.test(last_nameValue)) {
        setErrorFor(last_name, 'Last name must contain only English and Greek characters.');
        errors++;
    } else {
        setSuccessFor(last_name);
    }

    // Email validation: Check for '@' symbol and '.com'
    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.com') === -1) {
        setErrorFor(email, 'Enter a valid email address.');
        errors++;
    } else {
        setSuccessFor(email);
    }

    if (!nameRegex.test(addressValue)) {
        setErrorFor(address, 'Address must contain only English and Greek characters.');
        errors++;
    } else {
        setSuccessFor(address);
    }

    // Address number validation: Check for at least one digit and only numbers
    let addressNumberRegex = /^\d+$/;

    if (!addressNumberRegex.test(address_numberValue) || address_numberValue.length < 1 || address_numberValue == 0) {
        setErrorFor(address_number, 'Address number must be at least one digit and contain only numbers.');
        errors++;
    } else {
        setSuccessFor(address_number);
    }

    var postalCodeValue = postalCode.value.replace(/\s/g, ''); // Remove spaces from postal code

    // Postal code validation: Check for exactly 5 digits and only numbers
    let postalCodeRegex = /^\d{5}$/;

    if (!postalCodeRegex.test(postalCodeValue)) {
        setErrorFor(postalCode, 'Postal code must be exactly 5 digits and contain only numbers.');
        errors++;
    } else {
        setSuccessFor(postalCode);
    }


    // Convert phone number to string before checking length
    var phone_numberValue = phone_number.value.toString();

    if (phone_numberValue.length !== 10 || !/^\d+$/.test(phone_numberValue)) {
        setErrorFor(phone_number, 'Phone number must be 10 digits and contain only numbers.');
        errors++;
    } else {
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

    // Username validation: Check for at least 3 characters and not starting with a number
    if (usernameValue.length < 3 || /^\d/.test(usernameValue)) {
        setErrorFor(username, 'Username must be at least 3 characters long and not start with a number.');
        errors++;
    } else {
            setSuccessFor(username);
    }

    var mp = '';
    var mcp ='';
    pass_errors = 0;
    // Check if the password meets the criteria
    if (!isValidPassword(passwordValue)) {

        mp = 'Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.';
        pass_errors++;
        errors++;
        //alert('Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.');
    }

    if(!isValidPassword(confirmPasswordValue)){
        mcp = 'Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.';
        pass_errors++;
        errors++;
    }

    if (passwordValue !== confirmPasswordValue) {

        if (mp!=''){
            mp = mp + '\n';
        }
        if (mcp!=''){
            mcp = mcp + '\n';
        }
        mp = mp + 'Passwords do not match.';
        mcp = mcp + 'Passwords do not match.';
        pass_errors++;
        errors++;
        //alert('Passwords do not match.');
    }

    if (pass_errors>0) {
        setErrorFor(password, mp);
        setErrorFor(confirmPassword, mcp);   
    }else{
        setSuccessFor(password);
        setSuccessFor(confirmPassword);
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