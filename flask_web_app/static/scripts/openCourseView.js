$(document).ready(function() {
    user_id = $("body").attr('user_id');
    course_id = $("body").attr('course_id');

    courseObject = {}
    tasksList = []

    // fetch the course object
    let url_get_course_api = `http://mylearnlobby.me/api/v1/courses/${course_id}`;
    fetch(url_get_course_api)
    .then(response => {
        if (!response.ok) { // Check if response went through
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
        }
    )
    .then(course => {
        console.log('Course fetched:', course);
        courseObject = course;
        get_course_tasks(courseObject.id);
        $("#course-title").text(courseObject.title);
        $("#progressBarId").css('width', courseObject.counter + '%');
        $("#progressBarId").attr('aria-valuenow', courseObject.counter);
        $("#progressBarId").text(courseObject.counter + '%');
        $("#progressInputId").val(courseObject.counter);
        // $("#progressInputId").attr("onclick", `updateProgress(this, '${courseObject.id}')`);
        $("#progressInputId").change(function() {
            updateProgress(this, courseObject.id);
        });
        $("#course-description-details").text(courseObject.description);
        let courseStartDateObj = new Date(course.start_date);
        let courseEndDateObj = new Date(course.excepted_end_date);
        start_date_month = courseStartDateObj.toLocaleString('default', { month: 'long' });
        start_date_day = courseStartDateObj.toLocaleDateString('default', { day: '2-digit' });
        start_date_year = courseStartDateObj.toLocaleDateString('default', { year: 'numeric' });

        end_date_month = courseEndDateObj.toLocaleString('default', { month: 'long' });
        end_date_day = courseEndDateObj.toLocaleDateString('default', { day: '2-digit' });
        end_date_year = courseEndDateObj.toLocaleDateString('default', { year: 'numeric' });
        $("#start-date").text(`${start_date_month} - ${start_date_day} - ${start_date_year}`); 
        $("#end-date").text(`${end_date_month} - ${end_date_day} - ${end_date_year}`);
        
        let goals = courseObject.goals.split('\n');
        let ul = document.getElementById("goals-list");

        // Iterate over the array of goals
        goals.forEach(function(goal) {
            // Create a new li element
            let li = document.createElement('li');

            // Set the text content of the li element
            li.textContent = goal;

            // Append the li element to the ul element
            ul.appendChild(li);
        });

        // Iterate over the array of tasks
        let tasksUl = document.getElementById("tasks-list");
        tasksList.forEach(function(task) {
            // Create a new li element
            let li = `
            <li class="task">
            <input type="checkbox"> ${task.title}
            <button class="delete-button">x</button>
            </li>
            `;
            if (task.done === true) {
                li = `
                <li class="task disabled">
                <input type="checkbox"> ${task.title}
                <button class="delete-button">x</button>
                </li>
                `;
            }
            // Append the li element to the ul element
            tasksUl.innerHTML += li; // Use '+=' to append

        });
    })
    .catch(error => {
        console.error('Error fetching course:', error);
    });

    // get the course tasks
    function get_course_tasks(course_id) {
        let url_get_tasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`
        fetch(url_get_tasks_api)
        .then(response => {
            if (!response.ok) { // Check if response went through
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(tasks => {
            console.log('Tasks fetched:', tasks);
            tasksList = tasks;
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }
});

function updateProgress(inputElement, courseId) {
    let newProgress = inputElement.value;
    let progressBar = document.getElementById("progressBarId");
    progressBar.style.width = newProgress + '%';
    progressBar.setAttribute('aria-valuenow', newProgress);
    progressBar.textContent = newProgress + '%';


    let url_update_course_api = `http://mylearnlobby.me/api/v1/courses/${courseId}`;
    fetch(url_update_course_api, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counter: newProgress })
    })
    .then(response => {
        if (!response.ok) { // Check if response went through
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Counter updated:', data);
    })
    .catch(error => {
        console.error('Error updating counter:', error);
    });
}