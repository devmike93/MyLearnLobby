$(document).ready(function() {
    user_id = $("body").attr('user_id');
    url_get_courses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`

    coursesList = []
    courseTasksList = []

    fetch(url_get_courses_api)
        .then(response => { return response.json(); })
        .then(data => {
            coursesList = data;
        }).then(() => {
            console.log("Courses List: ", coursesList);
        })
        .catch(error => {
            console.error("Error fetching courses: ", error);
        });
    
    // Print the data of each course

    for (let course of coursesList) {
        let course_id = course.id;
        console.log("Course ID: ", course.id);
        (async () => {
            console.log("Course Title: ", course.title);
            console.log("Course Description: ", course.description);
            console.log("Course Start Date: ", course.start_date);
            console.log("Course End Date: ", course.excepted_end_date);
            console.log("Course Goals: ", course.goals);
            console.log("Course Resources: ", course.resources);

            try {
                let url_get_tasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`
                let response = await fetch(url_get_tasks_api);
                
                if (response.status === 200) {
                    let data = await response.json();
                    courseTasksList = data;
                    // alert(data.message);
                } else {
                    throw new Error(`Error creating a task: ${response.status}`);
                }
            } 
            catch (error) {
                console.error("Error", error);
            }
        })();
    }


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