// Enviar uma solicitação para o servidor

const FETCHPOST = async (url, options) => {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });
}


export default FETCHPOST;