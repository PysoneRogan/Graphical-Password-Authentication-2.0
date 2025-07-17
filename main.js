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

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (uppass.length < 1) {
        alert("Please select at least 1 image for your password.");
        return;
    }

    // Save name, email, and image password to session storage
    sessionStorage.setItem("upname", email);
    sessionStorage.setItem("username", name); // (Optional: for display later)
    sessionStorage.setItem("uppass", uppass);
    alert("Account Created Successfully!");
}
// image pattern authentication
var v2 = new Boolean(false);
function signin() {
    const email = document.getElementById('inmail').value.trim();

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (inpass.length < 1) {
        alert("Please select at least 1 image.");
        return;
    }

    const storedEmail = sessionStorage.getItem("upname");
    const storedPass = sessionStorage.getItem("uppass")?.split(",") || [];

    const isMatch = (email === storedEmail) && (JSON.stringify(storedPass) === JSON.stringify(inpass));

    if (isMatch) {
        alert("Login is successful");
        NewTab();
    } else {
        alert("Login Failed");
        sendMail3();
    }
}


function NewTab() {
    window.location.assign("https://hindustanuniv.ac.in/");

}
