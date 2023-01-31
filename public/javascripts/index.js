if (document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        // document.getElementById("login").style.display = "none";
        // document.getElementById("register").style.display = "none";
        // document.getElementById("logout").style.display = "inline-block";
        // document.getElementById("email").style.display = "inline-block";
        let userContainer = document.getElementById("user");
        let email = document.createElement("p");
        let logout = document.createElement("button");
        logout.innerHTML = "Logout";
        logout.setAttribute("onclick", "logOut()");

        fetch("/api/private", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + authToken
            }
        })
            .then((response) => response.json())
            .then((m) => {
                email.innerHTML = m.email;
            })
            .catch((e) => {
                console.log("error" + e)
            })

        userContainer.appendChild(logout);
        userContainer.appendChild(email)

    } else {
        // document.getElementById("login").style.display = "inline-block";
        // document.getElementById("register").style.display = "inline-block";
        // document.getElementById("logout").style.display = "none";
        // document.getElementById("email").style.display = "none";

        let userContainer = document.getElementById("user");
        let linksContainer = document.getElementById("links");
        let login = document.createElement("a");
        let register = document.createElement("a");
        login.innerHTML = "Login";
        register.innerHTML = "Register";
        login.setAttribute("href","/login.html");
        register.setAttribute("href","/register.html");

        linksContainer.appendChild(login);
        linksContainer.appendChild(register)
    }
}

function logOut() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}