const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
// adding and removing border
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(uppass);
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
            // console.log(element.id);
            // console.log(uppass);
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(inpass);
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
            // console.log(element.id);
            // console.log(inpass);
        }
    }
}
// element image recognition

function signup() {
    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const email = document.getElementById('upmail').value.trim();

    if (!name || !email || uppass.length < 1) {
        alert("Please fill in all fields and select at least 1 image for your password.");
        return;
    }

    fetch("https://graphical-auth-backend.onrender.com/api/signup", {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            passwordSequence: uppass
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            alert("Account Created Successfully!");
        } else {
            alert(data.error || "Signup failed");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error during signup");
    });
}

// image pattern authentication
var v2 = new Boolean(false);
function signin() {
    const email = document.getElementById('inmail').value.trim();

    if (!email || inpass.length < 1) {
        alert("Please enter email and select image password.");
        return;
    }

    fetch("https://graphical-auth-backend.onrender.com/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            passwordSequence: inpass
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            alert("Login is successful");
            NewTab(); // redirect to site
        } else {
            alert(data.error || "Login failed");
            sendMail3(); // optional: your existing function
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error during login");
    });
}


function NewTab() {
    window.location.assign("https://hindustanuniv.ac.in/");

}
