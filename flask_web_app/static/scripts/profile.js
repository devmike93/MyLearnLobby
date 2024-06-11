$(document).ready(function() {
    let user_id = $("body").attr('user_id');


    // let url_users_api = `http://localhost/api/v1/users/${user_id}`;
    let url_users_api = `http://mylearnlobby.me/api/v1/users/${user_id}`;

    // let url_courses_api = `http://localhost/api/v1/${user_id}/courses`;
    let url_courses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`;



    fetch(url_users_api)
        .then(response => response.json())
        .then(user => {
            // The user object is now a JavaScript object that you can use
            show_firstname(user.first_name);
            show_lastname(user.last_name);
            show_email(user.email);
            // Swal.fire({
            //     title: `Welcome ${user.first_name} :)`,
            //     showClass: {
            //         popup: `
            //             animate__animated
            //             animate__fadeInUp
            //             animate__faster
            //         `
            //     },
            //     hideClass: {
            //         popup: `
            //         animate__animated
            //         animate__fadeOutDown
            //         animate__faster
            //         `
            //     }
            // });
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

    function show_firstname (first_name) {
        $("#firstname").text(first_name);
    }
    function show_lastname (last_name) {
        $("#lastname").text(last_name);
    }
    function show_email (email) {
        $("#email").text(email);
    }
    function show_number_of_courses (number_of_courses) {
        $("#number_of_courses").text(number_of_courses);
    }

    // editing the user's profile (first name)
    $('.btn-edit-firstname').click(function() {
        // console.log('Button clicked');  // This line is for debugging
        let button = $(this);
        let field = button.closest('.row').find('#firstname');
        let currentValue = field.text();

        if (button.text().includes('Edit')) {
            // Transition from viewing to editing
            field.replaceWith(`<input type="text" class="firstname" value="${currentValue}" />`);
            button.text('Save');
        } else {
            // Transition from editing to viewing
            let input = button.closest('.row').find('input.firstname');
            let newValue = input.val();
            input.replaceWith(`<span id="firstname" class="field">${newValue}</span>`);
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

// editing the user's profile (last name)
    $('.btn-edit-lastname').click(function() {
        // console.log('Button clicked');  // This line is for debugging
        let button = $(this);
        let field = button.closest('.row').find('lastname');
        let currentValue = field.text();

        if (button.text().includes('Edit')) {
            // Transition from viewing to editing
            field.replaceWith(`<input type="text" class="lastname" value="${currentValue}" />`);
            button.text('Save');
        } else {
            // Transition from editing to viewing
            let input = button.closest('.row').find('input.lastname');
            let newValue = input.val();
            input.replaceWith(`<span id="lastname" class="field">${newValue}</span>`);
            button.text('Edit');

            // Update the user in the server
            fetch(url_users_api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    last_name: newValue
                })
            });
        }
    });

    // editing the user's profile (email)
    $('.btn-edit-email').click(function() {
        let button = $(this);
        let field = button.closest('.row').find('#email');
        let currentValue = field.text();

        if (button.text().includes('Edit')) {
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
    $(".btn-logout").click(function() {
        // window.location.href = `http://localhost/Logout/${user_id}`;
        window.location.href = `http://mylearnlobby.me/Logout/${user_id}`;
    });
});
