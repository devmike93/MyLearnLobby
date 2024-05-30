$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        let password = $('#password').val().trim();
        let email = $('#email').val().trim();

        // Send the AJAX request
        event.preventDefault();
        let formData = {
            "email": email,
            "password": password
        }
        $.ajax({
            url: "http://localhost:5001/api/v1/login",
            method: "post",
            data: JSON.stringify(formData),
            contentType: 'application/json',
            complete: function(jqXHR, textStatus) {
                if (jqXHR.status === 200) {
                    alert(`meassage: ${jqXHR.responseJSON.message}, user_id: ${jqXHR.responseJSON.user_id}`);
                    //
                } else {
                    alert(jqXHR.responseJSON.error);
                }
            }
        });
    });
});