$(document).ready(function() {
    user_id = $("body").attr('user_id');
    url_get_courses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`

    let coursesList = []
    let courseTasksList = []

    fetch(url_get_courses_api)
    .then(response => { return response.json(); })
    .then(data => {
        coursesList = data;
    }).then(() => {
        console.log("Courses List: ", coursesList);
        fetchCoursesAndTasksInfo(coursesList);
    })
    .catch(error => {
        console.error("Error fetching courses: ", error);
    });
    
    async function fetchCoursesAndTasksInfo(coursesList) {
        // Print the data of each course
        for (let course of coursesList) {
            let course_id = course.id;
            // console.log("Course ID: ", course.id);
            // console.log("Course Title: ", course.title);
            // console.log("Course Description: ", course.description);
            // console.log("Course Start Date: ", course.start_date);
            // console.log("Course End Date: ", course.excepted_end_date);
            // console.log("Course Goals: ", course.goals);
            // console.log("Course Resources: ", course.resources);

            try {
                let url_get_tasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`
                let response = await fetch(url_get_tasks_api);
                
                if (response.status === 200) {
                    let data = await response.json();
                    courseTasksList = data;
                    console.log("Course Tasks List: ", courseTasksList);
                    createCourseBlock(course, courseTasksList);
                } else {
                    throw new Error(`Error fetching tasks: ${response.status}`);
                }
            } 
            catch (error) {
                console.error("Error", error);
            }
        }
    }
    // Create a course block
    function createCourseBlock(course, courseTasksList) {
        let courseStartDateObj = new Date(course.start_date);
        let courseEndDateObj = new Date(course.excepted_end_date);
        start_date_month = courseStartDateObj.toLocaleString('default', { month: 'long' });
        start_date_day = courseStartDateObj.toLocaleDateString('default', { day: '2-digit' });
        start_date_year = courseStartDateObj.toLocaleDateString('default', { year: 'numeric' });

        end_date_month = courseEndDateObj.toLocaleString('default', { month: 'long' });
        end_date_day = courseEndDateObj.toLocaleDateString('default', { day: '2-digit' });
        end_date_year = courseEndDateObj.toLocaleDateString('default', { year: 'numeric' });

        let tasksCompleted = 0;
        for (let task of courseTasksList) {
            if (task.done === true) {
                tasksCompleted += 1;
            }
        }
        let progressPercentage = (course.counter / 100) * 100;
        let courseDetailsHTML = `
        <div class="course-details">
                <div class="col">
                <h3>
                    Course title:<span id="courseName" class="course-title"
                    >${course.title}</span
                    >
                </h3>
                <div class="row">
                    <div class="col">
                    <div class="row field">
                        <label>Total tasks:</label>
                        <p>${courseTasksList.length}</p>
                    </div>
                    <div class="row field">
                        <label>Tasks Completed:</label>
                        <p>${tasksCompleted}/${courseTasksList.length}</p>
                    </div>
                    <div class="row field">
                        <label>Starts at:</label>
                        <p>${start_date_month} - ${start_date_day} - ${start_date_year}</p>
                    </div>
                    <div class="row field">
                        <label>Ends at:</label>
                        <p>${end_date_month} - ${end_date_day} - ${end_date_year}</p>
                    </div>
                    </div>
                    <div class="col cours-progress">
                    <p>Progress:</p>
                    <div class="progress">
                        <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: ${progressPercentage}%"
                        aria-valuenow="${progressPercentage}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        >
                        ${progressPercentage}%
                        </div>
                    </div>
                    <div class="col">
                        <p>I have done <input type="number" id="progressInput" min="0" max="100" ></input>% of this course</p>
                    </div>
                    </div>
                </div>
                </div>
                <button id="openCourse" course_id=${course.id} class="btn-get-started">
                Open Course View
                </button>
            </div>
        `;
        // Find the div with the class 'col courses' and append the HTML content
        let coursesDiv = document.querySelector('.col.courses');
        coursesDiv.innerHTML += courseDetailsHTML; // Use '+=' to append
    }

});