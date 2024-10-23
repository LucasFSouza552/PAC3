const errorMessage = document.getElementById("error-message");
const nameField = document.getElementsByClassName("name-input")[0];
const emailField = document.getElementsByClassName('email-input')[0];
const [passwordField, confirmPasswordField] = document.getElementsByClassName('password-input');

document.getElementById("registerForm").addEventListener('input', function (e) {
    errorMessage.textContent = "";
    if (e.target.type === 'password') {
        validatePasswords();
    } else {
        errorAllFields(false)
    }
});

const form = document.getElementById('registerForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const canSubmit = verifyNeedParameters(name, email, password, confirmPassword);

    if (!canSubmit) {
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
                errorMessage.textContent = result.message;
                errorMessage.style.display = 'block';
            }
            return;
        }

        form.reset();

        const token = result.token; // Supondo que o token esteja na propriedade `token`
        localStorage.setItem('authToken', token);

        // Como continuar?

    } catch (error) {
        console.error('Erro:', error);
    }
});


function addInvalidElement(div) {
    console.log(div)
    div.classList.add("incorrect-input");
}
function removeInvalidElement(div) {
    div.classList.remove("incorrect-input");
}


function validatePasswords() {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (password && confirmPassword && password !== confirmPassword) {
        addInvalidElement(passwordField);
        addInvalidElement(confirmPasswordField);
        errorMessage.textContent = "As senhas devem ser iguais";
        errorMessage.style.display = 'block';
    } else {
        removeInvalidElement(passwordField);
        removeInvalidElement(confirmPasswordField);
    }
}

function errorAllFields(addError = true) {
    const fields = [nameField, emailField, passwordField, confirmPasswordField];
    if (addError) {
        fields.forEach(field => addInvalidElement(field));
        errorMessage.textContent = "Por favor, preencha todos os campos.";
        errorMessage.style.display = 'block';
        return;
    }
    fields.forEach(field => removeInvalidElement(field));
    errorMessage.textContent = "";
    errorMessage.style.display = 'none';
}

function verifyNeedParameters(name, email, password, confirmPassword) {
    if (!password && !confirmPassword && !name && !email) {
        errorAllFields();
        return false;
    }

    if (!name) {
        addInvalidElement(nameField);
        errorMessage.textContent = "Por favor, preencha o campo nome";
        errorMessage.style.display = 'block';
        return false;
    }

    if (!email) {
        addInvalidElement(emailField);
        errorMessage.textContent = "Por favor, preencha o campo email";
        errorMessage.style.display = 'block';
        return false;
    }

    if (!password) {
        [passwordField, confirmPasswordField].forEach(addInvalidElement);
        errorMessage.textContent = "Por favor, preencha o campo senha";
        errorMessage.style.display = 'block';
        return false;
    }

    if (password !== confirmPassword) {
        [passwordField, confirmPasswordField].forEach(addInvalidElement);
        errorMessage.textContent = "As senhas devem ser iguais";
        errorMessage.style.display = 'block';
        return false;
    }
    return true;
}