$(document).ready(function() {
    $("#signUP_bt").click(function() {
        history.pushState({page: "landingPage"}, "landingpage", "/");
        $.get("http://localhost:5000/SignUpForm", function(responseHtml) {
            // Replace the entire page content with the received HTML
            document.open();
            document.write(responseHtml);
            document.close();          
        });
        // Add a new entry to the browser's history
        history.pushState({page: "SignUpForm"}, "Sign Up Form", "/SignUpForm");
    });

    $("#logIN_bt").click(function() {
        history.pushState({page: "landingPage"}, "landingpage", "/");
        $.get("http://localhost:5000/LogInForm", function(responseHtml) {
            document.open();
            document.write(responseHtml);
            document.close();
        });
        history.pushState({page: "LogInForm"}, "Log In Form", "/LogInForm");
    });

    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.page === "SignUpForm") {
        // Load the sign-up page content (e.g., via AJAX)
        // Update the page content without a full page reload
            $.get("http://localhost:5000/SignUpForm", function(responseHtml) {
                document.open();
                document.write(responseHtml);
                document.close();
            });
        } else if (event.state && event.state.page === "landingPage") {
            $.get("http://localhost:5000/", function(responseHtml) {
                document.open();
                document.write(responseHtml);
                document.close();
            });
        } else if (event.state && event.state.page === "LogInForm") {
            $.get("http://localhost:5000/LogInForm", function(responseHtml) {
                // document.open();
                // document.write(responseHtml);
                // document.close();
            });
        }
    });

});
