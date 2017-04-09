exports.login = function(req, res){
    if(req.body.remember === 'remember'){
        req.session.remember = true;
        req.session.email = req.body.email;
    }
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var error = req.validationErrors();
    if(error){
        res.render('index', {
            title: 'There have been validation error: '+ JSON.stringify(error),
            isLoggedIn: false
        });
        return;
    };


    console.log(req.body);
    console.log('Email : '+req.body.email);
    console.log('Password : '+req.body.password);

    res.render('index',{
        title:'Logged in as : '+req.body.email,
        isLoggedIn: true
    })
}

exports.logout = function(req, res){
    req.session = null;
    res.render('index',{
        title: 'See you again later',
        isLoggedIn: false
    });
};