$(document).ready(function() {
    let user_id = $("body").attr('user_id');

    //let url_users_api = `http://localhost/api/v1/users/${user_id}`;
    let url_users_api = `http://mylearnlobby.me/api/v1/users/${user_id}`

    //let url_courses_api = `http://localhost/api/v1/${user_id}/courses`;
    let url_courses_api = 'http://mylearnlobby.me/api/v1/${user_id}/courses'



    fetch(url_users_api)
        .then(response => response.json())
        .then(user => {
            // The user object is now a JavaScript object that you can use
            show_username(user.first_name);
            show_email(user.email);
            Swal.fire({
                title: `Welcome ${user.first_name} :)`,
                showClass: {
                    popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                    `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                    `
                }
            });
        })

        .catch(error => {
            console.error('Error:', error);
        });

    fetch(url_courses_api)
    .then(response => response.json())
    .then(courses => { 
        let number_of_courses = courses.length;
        show_number_of_courses(number_of_courses);
    })

    function show_username (user_name) {
        $("#name").text(user_name);
    }
    function show_email (email) {
        $("#email").text(email);
    }
    function show_number_of_courses (number_of_courses) {
        $("#number_of_courses").text(number_of_courses);
    }

    // editing the user's profile (name)
    $('.btn-edit-name').click(function() {
        let button = $(this);
        let field = button.closest('.row').find('#name');
        let currentValue = field.text();

        if (button.text() === 'Edit') {
            // Transition from viewing to editing
            field.replaceWith(`<input type="text" class="name" value="${currentValue}" />`);
            button.text('Save');
        } else {
            // Transition from editing to viewing
            let input = button.closest('.row').find('input.name');
            let newValue = input.val();
            input.replaceWith(`<span id="name" class="field">${newValue}</span>`);
            button.text('Edit');

            // Update the user in the server
            fetch(url_users_api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: newValue
                })
            });
        }
    });

    // editing the user's profile (email)
    $('.btn-edit-email').click(function() {
        let button = $(this);
        let field = button.closest('.row').find('#email');
        let currentValue = field.text();

        if (button.text() === 'Edit') {
            // Transition from viewing to editing
            field.replaceWith(`<input type="text" class="email" value="${currentValue}" />`);
            button.text('Save');
        } else {
            // Transition from editing to viewing
            let input = button.closest('.row').find('input.email');
            let newValue = input.val();
            input.replaceWith(`<span id="email" class="field">${newValue}</span>`);
            button.text('Edit');

            // Update the user in the server
            fetch(url_users_api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: newValue
                })
            });
        }
    });

    // log out a user
    // $(".btn-logout").click(function() {
    //     // fetch(`http://localhost/Logout/${user_id}`)
    //     fetch(`http://localhost/Logout/${user_id}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.message === 'Log out') {
               
    //             window.location.replace('http://localhost/');
    //             window.location.reload(true);
    //         }
    //     });
    // });
    $(".btn-logout").click(function() {
    window.location.href = `http://mylearnlobby.me/Logout/${user_id}`;
    });
});
