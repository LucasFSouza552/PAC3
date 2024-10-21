document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Evita o envio padrão do formulário

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById("error-message");

    if (password !== confirmPassword) {
        alert("As senhas não coincidem");
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
        errorMessage.textContent = result.message;
        // Redirecionar ou atualizar a interface
    } catch (error) {
        console.error('Erro:', error);
    }
});
