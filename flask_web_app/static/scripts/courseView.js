document.addEventListener("DOMContentLoaded", function() {
    const courseDropdown = document.getElementById("course-dropdown");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const selectedCourseElement = document.getElementById("selected-course");
    const tasksList = document.getElementById("tasks-list");
    const goalsList = document.getElementById("goals-list");

    // Function to fetch course list from server
    function fetchCourseList() {
        return new Promise((resolve) => {
            const data = ["Course 1", "Course 2", "Course 3"];
            setTimeout(() => resolve(data), 500);
        });
    }

    // Function to fetch course data from server (dummy implementation)
    function fetchCourseData(courseName) {
        return new Promise((resolve) => {
            const data = {
                "Course 1": {
                    title: "Course 1",
                    totalTasks: 10,
                    tasksAchieved: 2,
                    startsAt: "2023-01-01",
                    endsAt: "2023-12-31",
                    progress: 20,
                    tasks: ["Task 1.1", "Task 1.2", "Task 1.3"],
                    goals: ["Goal 1.1", "Goal 1.2"]
                },
                "Course 2": {
                    title: "Course 2",
                    totalTasks: 8,
                    tasksAchieved: 4,
                    startsAt: "2023-02-01",
                    endsAt: "2023-11-30",
                    progress: 50,
                    tasks: ["Task 2.1", "Task 2.2"],
                    goals: ["Goal 2.1", "Goal 2.2"]
                },
                "Course 3": {
                    title: "Course 3",
                    totalTasks: 5,
                    tasksAchieved: 5,
                    startsAt: "2023-03-01",
                    endsAt: "2023-09-30",
                    progress: 100,
                    tasks: [],
                    goals: ["Goal 3.1"]
                }
            };
            setTimeout(() => resolve(data[courseName]), 500);
        });
    }

    // Function to update the dropdown menu
    function updateDropdownMenu(courses) {
        let dropdownHTML = '';
        courses.forEach(course => {
            dropdownHTML += `<a class="dropdown-item" href="#" data-value="${course}">${course}</a>`;
        });
        dropdownMenu.innerHTML = dropdownHTML;
    }

    // Event delegation for dropdown items
    dropdownMenu.addEventListener("click", function(event) {
        if (event.target.classList.contains("dropdown-item")) {
            event.preventDefault();

            const selectedValue = event.target.getAttribute("data-value");
            courseDropdown.innerText = selectedValue;

            localStorage.setItem("selectedCourse", selectedValue);
            selectedCourseElement.innerText = "Selected Course: " + selectedValue;

            fetchCourseData(selectedValue)
                .then(courseData => {
                    updateCourseCard(courseData);
                    updateTasksList(courseData.tasks);
                    updateGoalsList(courseData.goals);
                })
                .catch(error => {
                    console.error("Error fetching course data:", error);
                });
        }
    });

    // Function to update the course card
    function updateCourseCard(courseData) {
        document.getElementById("courseName").innerText = courseData.title;
        document.getElementById("totalTasks").innerText = courseData.totalTasks;
        document.getElementById("tasksAchieved").innerText = `${courseData.tasksAchieved}/${courseData.totalTasks}`;
        document.getElementById("startsAt").innerText = courseData.startsAt;
        document.getElementById("endsAt").innerText = courseData.endsAt;

        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = `${courseData.progress}%`;
        progressBar.setAttribute("aria-valuenow", courseData.progress);
        progressBar.innerText = `${courseData.progress}%`;
    }

    // Function to update the tasks list
    function updateTasksList(tasks) {
        tasksList.innerHTML = ''; // Clear existing tasks
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `<input type="checkbox"> ${task}`;
            tasksList.appendChild(taskItem);
        });
    }

    // Function to update the goals list
    function updateGoalsList(goals) {
        goalsList.innerHTML = ''; // Clear existing goals
        goals.forEach(goal => {
            const goalItem = document.createElement("li");
            goalItem.innerHTML = `<input type="checkbox"> ${goal}`;
            goalsList.appendChild(goalItem);
        });
    }

    // Load the course list from server on page load
    fetchCourseList()
        .then(courses => {
            updateDropdownMenu(courses);

            const selectedCourse = localStorage.getItem("selectedCourse");
            if (selectedCourse && courses.includes(selectedCourse)) {
                courseDropdown.innerText = selectedCourse;
                selectedCourseElement.innerText = "Selected Course: " + selectedCourse;
                fetchCourseData(selectedCourse)
                    .then(courseData => {
                        updateCourseCard(courseData);
                        updateTasksList(courseData.tasks);
                        updateGoalsList(courseData.goals);
                    })
                    .catch(error => {
                        console.error("Error fetching course data:", error);
                    });
            } else {
                selectedCourseElement.innerText = "No course selected";
            }
        })
        .catch(error => {
            console.error("Error fetching course list:", error);
        });
});
