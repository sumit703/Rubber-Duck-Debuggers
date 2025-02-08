document.getElementById("registerStartupForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const requirements = document.getElementById("requirements").value;

    const token = localStorage.getItem("token")

    const requirementsArray = requirements
    .split(",")
    .map(item => item.trim())
    .filter(item => item.length > 0);

    const requestData = {
        name,
        description,
        requirements:requirementsArray
    };

    try {
        const response = await fetch("http://localhost:3000/register-startup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body:JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.startupId) {
            document.getElementById("message").innerText = "StartUp Registration Successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "viewStartups.html";
            }, 2000);
        } else {
            document.getElementById("message").innerText = result.message || "Registration failed!";
        }
    } catch (error) {
        document.getElementById("message").innerText = "An error occurred. Please try again.";
        console.error("Error:", error);
    }
});