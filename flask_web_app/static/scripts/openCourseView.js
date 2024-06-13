$(document).ready(function() {
    user_id = $("body").attr('user_id');
    course_id = $("body").attr('course_id');
    let url_get_tasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`
    let url_delete_tasks_api = `http://mylearnlobby.me/api/v1/tasks/${task_id}`
    let url_update_tasks_api = `http://mylearnlobby.me/api/v1/tasks/${task_id}`



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
        let ulGoals = document.getElementById("goals-list");

        // Iterate over the array of goals
        goals.forEach(function(goal) {
            // Create a new li element
            let li = document.createElement('li');

            // Set the text content of the li element
            li.textContent = goal;

            // Append the li element to the ul element
            ulGoals.appendChild(li);
        });

        let resources = courseObject.resources.split('\n');
        let ulResources = document.getElementById("resources-list");

        resources.forEach(function(resource) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = resource;
            a.textContent = resource;
            a.target = "_blank"; // Add this line
            li.appendChild(a);
            ulResources.appendChild(li);
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

            // Append tasks to the DOM here
            let tasksUl = document.getElementById("list-container");
            tasksList.forEach(function(task) {
                let li = document.createElement('li');
                li.className = "task";
                let input = document.createElement('input');
                input.type = "checkbox";
                input.id = "input-" + task.id;

                if (task.done === true) {
                    input.checked = true;
                    li.className = "task disabled";
                }

                li.appendChild(input);
                li.appendChild(document.createTextNode(task.title));

                let button = document.createElement('button');
                button.className = "delete-button";
                button.textContent = "x";
                li.appendChild(button);

                tasksUl.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }

    // Event listener for the Add Task button
    document.getElementById('addTaskButton').addEventListener('click', () => {
        const taskContent = prompt('Enter the new task:');
        if (taskContent) {
            // make a POST request to the API to add the new task
            let url_post_task_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`;

            fetch(url_post_task_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: taskContent })
            })
            .then(response => {
                if (!response.ok) { // Check if response went through
                    throw new Error('Network response was not ok: ' + response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data.message);
                addNewTask(taskContent, data.task_id);
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
        }
    });

    function addNewTask(taskContent, taskId) {

        // Append tasks to the DOM here
        let tasksUl = document.getElementById("tasks-list");
        const newTaskItem = document.createElement('li');
        newTaskItem.className = "task";
        let input = document.createElement('input');
        input.type = "checkbox";
        input.id = "input-" + taskId;

        newTaskItem.appendChild(input);
        // Create a text node for the task content and append it
        let taskTextNode = document.createTextNode(taskContent);
        newTaskItem.appendChild(taskTextNode);

        let button = document.createElement('button');
        button.className = "delete-button";
        button.textContent = "x";
        newTaskItem.appendChild(button);

        // Check if there are any tasks already in the list
        if (tasksUl.firstChild) {
            // Insert the new task before the first task
            tasksUl.insertBefore(newTaskItem, tasksUl.firstChild);
        } else {
            // If the list is empty, just append the new task
            tasksUl.appendChild(newTaskItem);
        }
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