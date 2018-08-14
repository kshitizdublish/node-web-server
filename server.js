const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, Method: ${req.method}, Url: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('convertToUpper', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomePageProperty: 'Welcome to my website!'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle the request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!!!')
});