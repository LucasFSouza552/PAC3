window.onload = async function () {

    const token = localStorage.getItem('authToken');

    const data = { token };

    try {
        const response = await fetch('/api/articleflow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log(result);
    } catch (error) {
        console.error('Erro:', error);
    }

}