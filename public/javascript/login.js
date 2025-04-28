const form = document.querySelector(".form");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const passwordagain = document.querySelector(".passwordagain");
const element = document.querySelector(".element");
const h2 = document.querySelector("h2");

const small = document.querySelector(".small");
const small1 = document.querySelector(".small1");
const small2 = document.querySelector(".small2");
const small3 = document.querySelector(".small3");
const click = document.querySelector(".click");
const submit = document.querySelector(".submit");


const error = function error(input) {

    input.classList.add("incorrect");
}

const value = function value(val) {
    val.classList.add("error");
}


const correct = function correct(input) {
    input.classList.add("correct")
}


const checkUsername = function (input) {
    if (input.value === "") {
        error(username);
        value(small);
        small.innerHTML = " Username is required "
    }
    else {
        correct(input);
        h2.innerHTML = `Welcome ${input.value}`;

    }

};
const check = function (email) {
    if (email.value === "") {
        error(email);
        value(small1);
        small1.innerHTML = "Email is required"
    }

    else if (!validateEmail(email.value)) {
        error(email);
        value(small1);
        small1.innerHTML = "Please enter valid Email"
    }
    else {

        correct(email);
    }
}

const checkPassword = function (password) {
    if (password.value === "") {
        error(password);
        value(small2);
        small2.innerHTML = "Password is required"
    }
    else {
        correct(password);
    }
}

const checkAgain = function (passwordagain) {

    if (passwordagain.value === "") {
        error(passwordagain);
        value(small3);
        small3.innerHTML = "Conformation of password is required"
    }
    else {
        correct(passwordagain);
    }
}


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const length = (input, min, max) => {
    if (input.value.length < min && input.value.length > 0) {
        error(input);
        value(small);
        small.innerHTML = " Username must be greater than 3 letters"

    }
    else if (input.value.length > max) {
        error(input);
        value(small);
        small.innerHTML = " Username must be less than 5 letters"

    }
    else {
        correct(input);
    }
}

const passlength = (input, min, max) => {
    if (input.value.length < min) {
        error(input);
        value(small2);
        small2.innerHTML = " Password must be greater than 8 letters/digits"
    }
    else if (input.value.length > max) {
        error(input);
        value(small2);
        small2.innerHTML = " Password must be less than 25 letters"

    }
    else {
        correct(input);
    }
}

const checkpass = (password1, password2) => {
    if (password1.value !== password2.value) {
        // error(password1);
        error(password2);
        value(small3);
        small3.innerHTML = " Password does not match ";
    }
    else {
        correct(password1);
        correct(password2);
    }
}





form.addEventListener("submit", function (h) {
    h.preventDefault();

    checkUsername(username)
    check(email)
    checkPassword(password)
    checkAgain(passwordagain)
    length(username, 3, 5)
    checkpass(password, passwordagain)
    if (username.value == "jiya") {
        click.classList.remove("hiddenclick");

    } else {
        h2.textContent = "Access to Admin only"
    }


})

// submit.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(username.value);
// })





