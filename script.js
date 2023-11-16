function validateForm(event) {
    
    console.log('validateForm function called');
    
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    console.log('Password:', password.value);
    console.log('Confirm Password:', confirmPassword.value);

    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match.');
        event.preventDefault();
    }

    // Check if the password meets the criteria
    if (!isValidPassword(password.value)) {
        alert('Password must have at least one uppercase letter, one lowercase letter, one number, and be 8 characters long.');
        event.preventDefault();
    }
}

function isValidPassword(password) {
    // Check if the password has at least one uppercase letter, one lowercase letter, one number, and is 8 characters long
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Attach the validateForm function to the form's submit event
var form = document.getElementById('yourFormId'); // Replace 'yourFormId' with the actual ID of your form
form.addEventListener('submit', validateForm);
