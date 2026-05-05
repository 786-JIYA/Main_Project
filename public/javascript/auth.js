const SIGNUP_URL = "https://bus-dashboard.onrender.com/signup";
const LOGIN_URL = "https://bus-dashboard.onrender.com/login";


// ----------- SIGNUP -----------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm = document.getElementById("confirmpassword").value;

        const res = await fetch(SIGNUP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, passwordConfirm })
        });

        const data = await res.json();

        console.log(data);

        if (data.status === "success") {
            alert("Signup successful");
            window.location.href = "/main";
        } else {
            alert(data.message);
        }
    });
}

// ----------- LOGIN -----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        console.log(data);

        if (data.status === "success") {
            // ✅ IMPORTANT
            localStorage.setItem("token", data.token);

            alert("Login successful");

            // redirect to protected page
            window.location.href = "/main";
        } else {
            alert(data.message);
        }
    });
}