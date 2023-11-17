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
    // Get the current date
    var currentDate = new Date();

    // Get the year, month, and day
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    var currentDay = currentDate.getDate();
    // Format the current date in the yyyy-mm-dd format
    var formattedCurrentDate = currentYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth + '-' + (currentDay < 10 ? '0' : '') + currentDay;
    // Set the max attribute of the birthdate input to the current date
    document.getElementById('birthdate').max = formattedCurrentDate;
    document.getElementById('birthdate').min = '1903-01-01';
    
}

function isValidPassword(password) {
    // Check if the password has at least one uppercase letter, one lowercase letter, one number, and is 8 characters long
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Attach the validateForm function to the form's submit event
var form = document.getElementById('yourFormId'); // Replace 'yourFormId' with the actual ID of your form
form.addEventListener('submit', validateForm);
