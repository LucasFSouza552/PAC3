const register = (req, res) => {
    res.render('register');
}

const main = (req, res) => {
    res.render('main');
}


export { register, main };