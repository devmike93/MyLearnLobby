$(document).ready(function() {
    $('#signup-form').on('submit', function(event) {
        let password = $('#password').val().trim();
        let password_v = $('#password_v').val().trim();

        if (password !== password_v) {
            alert('Passwords do not match..........!');
            event.preventDefault();
        }
        // Send the AJAX request
        else {
            // Prevent the form from submitting normally
            // and use ajax to send the form data as json object
            event.preventDefault();
            let formData = {
                "first_name": $('#first_name').val().trim(),
                "last_name": $('#last_name').val().trim(),
                "email": $('#email').val().trim(),
                "password": password,
                "password_v": password_v
            }
            $.ajax({
                // url: "http://mylearnlobby.me/SignUpForm",
                url: "http://localhost/SignUpForm",
                method: "post",
                data: JSON.stringify(formData),
                contentType: 'application/json',
                complete: function(jqXHR, textStatus) {
                    if (jqXHR.status === 201) {
                        alert(`meassage: ${jqXHR.responseJSON.message}`);
                        // Redirect to the profile page
                        // window.location.href = `http://mylearnlobby.me/Profile/${jqXHR.responseJSON.user_id}`;
                        window.location.href = `http://localhost/Profile/${jqXHR.responseJSON.user_id}`;
                    } else {
                        alert(jqXHR.responseJSON.error);
                    }
                }
            });
        }
    });
});
