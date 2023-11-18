function validateForm(event) {
    
    console.log('validateForm function called');
    
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    console.log('Password:', password.value);
    console.log('Confirm Password:', confirmPassword.value);

    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match.');

        password.style.border = '1px solid red';
        confirmPassword.style.border = '1px solid red';

        event.preventDefault();
    }

    // Check if the password meets the criteria
    if (!isValidPassword(password.value)) {
        alert('Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.');

        password.style.border = '1px solid red';

        event.preventDefault();
    }


    // Get the birthdate input element
    var birthdateInput = document.getElementById('birthdate');

    // Set the min and max values
    birthdateInput.min = '1900-01-01';
    birthdateInput.max = new Date().toISOString().split('T')[0];

    // Get the birthdate input value
    var birthdate = birthdateInput.value;

    // Convert the value to a Date object
    var birthdateDate = new Date(birthdate);

    // Convert the min and max values to Date objects
    var minDate = new Date(birthdateInput.min);
    var maxDate = new Date(birthdateInput.max);

    // If the birthdate is less than the min date or greater than the max date
    if (birthdateDate < minDate || birthdateDate > maxDate) {
        // Prevent the form from being submitted
        event.preventDefault();

        birthdate.style.border = '1px solid red';


        // Alert the user
        alert('Birthdate must be between ' + minDate.getFullYear() + ' and ' + maxDate.toISOString().split('T')[0] + '.');
    }


    // Get the address number and postal code input values
    var phone_number = document.getElementById('phone').value.toString().length;
    var postalCode = document.getElementById('postal_code').value.replace(/\s/g, '').length;
    console.log(postalCode);

    console.log('Phone number:', phone_number);
    console.log('Postal code:', postalCode);

    
    if (phone_number!=10) {
        
        event.preventDefault();

        phone.style.border = '1px solid red';

        // Alert the user
        alert('Phone number must be 10 digits.');
    }

    if (postalCode!=5) {
        
        event.preventDefault();

        postal_code.style.border = '1px solid red';

        // Alert the user
        alert('Postal code must be 5 digits.');
    }
    var address_number = document.getElementById('address_number').value;

    if (address_number<1) {

        event.preventDefault();

        address_number.style.border = '1px solid red';
        
        alert('Address number must be greater than 0.');
    }



    // Get the checkbox elements
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Check if at least one checkbox is checked
    var isAtLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // If not
    if (!isAtLeastOneChecked) {
        // Prevent the form from being submitted
        event.preventDefault();

        // Alert the user
        alert('Please select at least one contact method.');
    }

    
}

function isValidPassword(password) {
    // Check if the password has at least one uppercase letter, one lowercase letter, one number, and is 8 characters long
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById("registrationForm");
    form.addEventListener('submit', validateForm);
});
