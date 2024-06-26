$(document).ready(function() {
    user_id = $("body").attr('user_id');
    course_id = $("body").attr('course_id');
    dashboard_url = `http://mylearnlobby.me/Dashboard/${user_id}`

    // let url_get_tasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`
    // let url_delete_tasks_api = `http://mylearnlobby.me/api/v1/tasks/${task_id}`
    // let url_update_tasks_api = `http://mylearnlobby.me/api/v1/tasks/${task_id}`



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

    	    // Create the icon element
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-check';

   	    // Append the icon to the li element
	    li.appendChild(icon);

	    // Create a text node for the goal and append it to the li element
     	    let textNode = document.createTextNode(goal);
    	    li.appendChild(textNode);
            
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
            // let tasksUl = document.getElementById("list-container");
            // tasksList.forEach(function(task) {
            //     let li = document.createElement('li');
            //     li.className = "task";
            //     let input = document.createElement('input');
            //     input.type = "checkbox";
            //     input.id = "input-" + task.id;

            //     if (task.done === true) {
            //         input.checked = true;
            //         li.className = "task disabled";
            //     }

            //     li.appendChild(input);
            //     li.appendChild(document.createTextNode(task.title));

            //     let button = document.createElement('button');
            //     button.className = "delete-button";
            //     button.textContent = "x";
            //     li.appendChild(button);

            //     tasksUl.appendChild(li);
            // });

            let tasksUl = $("#list-container");
            tasksList.forEach(function(task) {
                let li = $("<li></li>").text(task.title);
                li.attr("taskId", task.id);
                let span = $("<span></span>").text("x");
                span.attr("taskId", task.id);

                if (task.done === true) {
                    li.addClass("checked");
                }

                li.append(span);
                tasksUl.append(li);
                addEventListenersToTasks(span, li);
    
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }

    // Event listener for the Add Task button
    addButton = $("#add-task")
    inputBox = $("#input-box")

    addButton.click(function() {
        let taskContent = inputBox.val();
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
                inputBox.val("");
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
        }
    });

    function addNewTask(taskContent, taskId) {

        // Append tasks to the DOM here
        let tasksUl = $("#list-container");
        let li = $("<li></li>").text(taskContent);
        li.attr("taskId", taskId);
        let span = $("<span></span>").text("x");
        span.attr("taskId", taskId);

        li.append(span);
        tasksUl.prepend(li);
        addEventListenersToTasks(span, li);

    }

    // Fetch the user's name
    url_to_get_user = `http://mylearnlobby.me/api/v1/users/${user_id}`;
    fetch(url_to_get_user)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            return response.json();
        }
    })
    .then(user => {
        username = user.first_name + " " + user.last_name;
        $(".user-name").text(username);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // log out a user
    $(".btn-logout").click(function() {
        // window.location.href = `http://localhost/Logout/${user_id}`;
        window.location.href = `http://mylearnlobby.me/Logout/${user_id}`;
    });

    // Go to Dashboard
    $(".dashboard").click(function() {
        event.preventDefault(); // Prevent the default action
        window.location.href = dashboard_url;
    });

    // Go to profile page
    $(".btn-profile").click(function() {
        event.preventDefault(); // Prevent the default action
        window.location.href = `http://mylearnlobby.me/Profile/${user_id}`;
    });


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

function addEventListenersToTasks(span, li) {
    // Add click event listener to span element
    span.click(function(event) {
        event.stopPropagation(); // Prevent the li click event from firing

        let taskId = $(span).attr("taskId");

        fetch(`http://mylearnlobby.me/api/v1/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) { // Check if response went through
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        
        })
        .then(data => {
            console.log(data);
            $(this).parent().remove(); // Remove the li element from the DOM
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    // Add click event listener to li element
    li.click(function() {
        // Toggle "checked" class
        $(this).toggleClass("checked");
        let taskId = $(li).attr("taskId");

        url_update_tasks_api = `http://mylearnlobby.me/api/v1/tasks/${taskId}`;
        fetch(url_update_tasks_api, {
            method: 'PUT', // or 'POST'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                done: $(this).hasClass("checked")
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    });
}
