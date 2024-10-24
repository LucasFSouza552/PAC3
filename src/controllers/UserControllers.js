const register = (req, res) => {
    res.render('register');
}

const main = (req, res) => {
    res.render('main');
}

const login = (req, res) => {
    res.render('login');
}

const articles = (req, res) => {
    res.render('articles');
}


export { register, main, login, articles };