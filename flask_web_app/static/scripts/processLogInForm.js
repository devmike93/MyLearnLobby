$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        let password = $('#login_password').val().trim();
        let email = $('#login_email').val().trim();

        // Send the AJAX request
        event.preventDefault();
        let formData = {
            "email": email,
            "password": password
        }
        $.ajax({
            url: "http://mylearnlobby.me/LogInForm",
            // url: "http://localhost/LogInForm",
            method: "post",
            data: JSON.stringify(formData),
            contentType: 'application/json',
            complete: function(jqXHR, textStatus) {
                if (jqXHR.status === 200) {
                    // alert(`meassage: ${jqXHR.responseJSON.message}, user_id: ${jqXHR.responseJSON.user_id}`);
                    // Redirect to the profile page
                    window.location.href = `http://mylearnlobby.me/Profile/${jqXHR.responseJSON.user_id}`;
                    // window.location.href = `http://localhost/Profile/${jqXHR.responseJSON.user_id}`;
                } else {
                    // alert(jqXHR.responseJSON.error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: jqXHR.responseJSON.error,
                        footer: '<a href="#"></a>'
                    });
                }
            }
        });

    });
});