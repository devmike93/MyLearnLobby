$(document).ready(function() {
    const user_id = $("body").attr('user_id');
    const url_get_courses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`

    getAllCourses(url_get_courses_api)
    .then(data => {
        coursesList = data;
        console.log("Courses List: ", coursesList);
    })
    .catch(error => {
        console.error("Error fetching courses: ", error);
    });

    async function getAllCourses(url) {
        let coursesList = [];
        try {
            const response = await fetch(url);
            const data = await response.json();
            coursesList = data.courses_list;
        } catch (error) {
            console.error("Error fetching courses: ", error);
        }
        return coursesList;
    }
});