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
            // url: "http://mylearnlobby.me/LogInForm",
            url: "http://localhost/LogInForm",
            method: "post",
            data: JSON.stringify(formData),
            contentType: 'application/json',
            complete: function(jqXHR, textStatus) {
                if (jqXHR.status === 200) {
                    alert(`meassage: ${jqXHR.responseJSON.message}, user_id: ${jqXHR.responseJSON.user_id}`);
                    // Redirect to the profile page
                    // window.location.href = `http://mylearnlobby.me/Profile/${jqXHR.responseJSON.user_id}`;
                    window.location.href = `http://localhost/Profile/${jqXHR.responseJSON.user_id}`;
                } else {
                    alert(jqXHR.responseJSON.error);
                }
            }
        });


        // function add_to_session (user_id) {
        //     $.get(`http://localhost:5000/manage_sessions/${user_id}`, function(jqXHR, textStatus) {
        //         alert(`result: ${jqXHR.responseJSON.result}`)
        //     });
            
        // }
    });
});