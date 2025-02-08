document.getElementById("signinForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestData = {
        email,
        password
    };

    try {
        const response = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(requestData)
        });

        const result = await response.json();

        if (result.token){
            localStorage.setItem("token",`Bearer ${result.token}`)
            document.getElementById("message").innerText = "Signin Successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "project.html";
            }, 2000);
        } else {
            document.getElementById("message").innerText = result.message || "Signin failed!";
        }
    } catch (error) {
        document.getElementById("message").innerText = "An error occurred. Please try again.";
        console.error("Error:", error);
    }
});