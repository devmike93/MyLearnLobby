$(document).ready(function() {
    user_id = $("body").attr('user_id');
    url_get_courses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`

    coursesList = []

    fetch(url_get_courses_api)
        .then(response => { response.json(); })
        .then(data => {
            coursesList = data.courses_list;
        }).then(() => {
            console.log("Courses List: ", coursesList);
        })
        .catch(error => {
            console.error("Error fetching courses: ", error);
        });
    

    // function getAllCourses(url) {
    //     coursesList = [];
    //     fetch(url)
    //     .then(response => { response.json(); })
    //     .then(data => {
    //         coursesList = data.courses_list;
    //     })
    //     .catch(error => {
    //         console.error("Error fetching courses: ", error);
    //     });
    //     return coursesList;
    // }
});