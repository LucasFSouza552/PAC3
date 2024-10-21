const errorMessage = document.getElementById("error-message");
const emailField = document.getElementsByClassName('email-input')[0];
const [passwordField, confirmPasswordField] = document.getElementsByClassName('password-input');

document.getElementById("registerForm").addEventListener('input', function (e) {
    errorMessage.textContent = "";
    if (e.target.type == 'password') {

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const divRegister = document.getElementsByClassName("register-input");

        if (!password || !confirmPassword || password === confirmPassword) {
            const [passwordField, confirmPasswordField] = document.getElementsByClassName('password-input');
            [passwordField, confirmPasswordField].forEach(removeInvalidElement);
            return;
        }

        addInvalidElement(divRegister);
        errorMessage.textContent = "As senhas devem ser iguais";
        return;
    } else if (e.target.type == 'email') {
        errorMessage.textContent = "";
        removeInvalidElement(emailField);
    }
});

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        [passwordField, confirmPasswordField].forEach(addInvalidElement);
        errorMessage.textContent = "As senhas devem ser iguais";
        return;
    }

    const data = { name, email, password };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.message == "O email já registrado")
            if (result.message == "O email já registrado") {
                addInvalidElement(emailField);
            }
        }

        errorMessage.textContent = result.message;
    } catch (error) {
        console.error('Erro:', error);
    }
});


function addInvalidElement(div) {
    div.classList.add("incorrect-input");
}
function removeInvalidElement(div) {
    div.classList.remove("incorrect-input");
}
