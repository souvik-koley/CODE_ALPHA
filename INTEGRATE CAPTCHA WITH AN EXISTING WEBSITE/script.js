const captchaTextBox = document.querySelector(".captcha input");
const refreshButton = document.querySelector(".bx-refresh");
const captchInputBox = document.querySelector(".captch-input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".btn-step");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

let captchaText = null;

const generateCaptcha = () => {
    const radomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = radomString.split("");
    const changeString = randomStringArray.map(char => Math.random() > 0.5 ? char.toUpperCase() : char)
    captchaText = changeString.join("        ");
    // console.log(captchaText);
    captchaTextBox.value = captchaText;
}
const refreshBtnClick = () => {
    generateCaptcha();
    captchInputBox.value = "";
    captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
    submitButton.classList.toggle("disabled", !captchInputBox.value);
    if (captchInputBox.value === "") {
        message.classList.remove("active");
    }
};

const submitBtnCliked = () => {
    captchaText = captchaText.split("").filter((char) => char !== " ").join("");
    message.classList.add("active");
    if (captchInputBox.value === captchaText) {
        message.innerText = "Entered captcha is correct";
        message.style.color = "#826afb";
        sendEmail();
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    } else {
        message.innerText = "Entered captcha is not correct";
        message.style.color = "#FF2525";
    }
    // console.log(captchaText);
}

refreshButton.addEventListener("click", refreshBtnClick);
captchInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnCliked);

generateCaptcha();
