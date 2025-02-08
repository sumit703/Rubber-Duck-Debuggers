document.getElementById("signupForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestData = {
        username,
        email,
        password
    };

    try {
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.userId) {
            document.getElementById("message").innerText = "Signup Successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 2000);
        } else {
            document.getElementById("message").innerText = result.message || "Signup failed!";
        }
    } catch (error) {
        document.getElementById("message").innerText = "An error occurred. Please try again.";
        console.error("Error:", error);
    }
});