async function fetchStartups() {
    try {
        const response = await fetch('http://localhost:3000/list-startup');
        const startups = await response.json();
        renderStartups(startups);
    } catch (error) {
        console.error("Error fetching startups:", error);
    }
}

async function fetchStartups() {
    try {
        const response = await fetch('http://localhost:3000/list-startup');
        const startups = await response.json();
        renderStartups(startups);
    } catch (error) {
        console.error("Error fetching startups:", error);
    }
}

function renderStartups(startups) {
    const container = document.getElementById("startup-list");
    container.innerHTML = "";

    startups.forEach(startup => {
        const startupDiv = document.createElement("div");
        startupDiv.className = "p-4 bg-gray-200 rounded-lg flex justify-between items-center";
        
        startupDiv.innerHTML = `
            <div>
                <h2 class="text-xl font-semibold">${startup.name}</h2>
                <p class="text-gray-700">${startup.description}</p>
            </div>
            <button id="${startup.id}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onclick="toggleJoinLeave(this)">
                Join
            </button>
        `;
        
        container.appendChild(startupDiv);
    });
}

async function toggleJoinLeave(button) {
    const startupId = button.id;
    const action = button.textContent === "Join" ? "join" : "leave";

    try {
        const response = await fetch(`http://localhost:3000/join-startup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ startupId })
        });

        if (!response.ok) throw new Error(`Failed to ${action}`);

        if (action === "join") {
            button.textContent = "Leave";
            button.classList.remove("bg-blue-500", "hover:bg-blue-700");
            button.classList.add("bg-red-500", "hover:bg-red-700");
        } else {
            button.textContent = "Join";
            button.classList.remove("bg-red-500", "hover:bg-red-700");
            button.classList.add("bg-blue-500", "hover:bg-blue-700");
        }
    } catch (error) {
        console.error(`Error trying to ${action}:`, error);
    }
}

document.addEventListener("DOMContentLoaded", fetchStartups);
