//create a server
//http is used to lauch server, send request to may be some other server like Google Map API
//https will help us lauch a SSL sever

//CORE MODULES
//const http = require('http');//./ is relative path and / is absolute path.. we dont write either of these then it will look for a module than a file
//node.js is event driven because it keeps on running as long as there are events listeners registered and this is called event loop. The program will 
//keep on running till the time these events are unregistered and we can unregister or stop this process with the help of process.exit and we wont be able
//to reach our webpage hence process.exit hard exited our program
const path = require('path');

//Third party packages
const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');

const app = express();

app.set('view engine', 'ejs');
//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));//it helps in registering those handle bars which are not built in, pug was built in but not handlebars
//app.set('view engine', 'hbs');//now hbs is the way we'll use it now
//app.set('view engine', 'pug');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));//creating another middleware, this middleware also has next function so that we can continue with the next middlewares
app.use(express.static(path.join(__dirname,'public')));//it serves static files,it takes a path to the file to which we want to give read access to

app.use('/admin',adminData.routes);//here we are filtering i.e all files whose route start with /admin will get into the adminRoutes middleware and when it reaches adminRoutes then it will not check /admin
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle:"Page Not Found"})//looking for 404 pug template
})


// app.use((req, res, next) => {//after app and before creating server, it allows us to add a new middleware function
//     console.log('In the middleware');
//     next();//allows the request to continue to the next middleware, if we wont write this then the next middleware will not be executed
// });
// app.use('/',(req, res, next) =>{//after app and before creating server, it allows us to add a new middleware function
//     res.send('<h1>Hello from express</h1>');//it also automatically sets the header,though we can also do it explicitly by res.setHeader();
//     //res.send is also an indication of not putting next in here
// });

//const server = http.createServer(app);//takes 2 params req and response, called when request reaches a server
   // console.log(req.url, req.method, req.headers);//helps to read and manage req
    //process.exit
    //request is always read and sent as stream of data .... The incoming req is broken down into chunks and we can work in these individual without waiting
    //for the full req being read in node.js
    //Buffer is a construct which allows you to work with multiple chunks and work with them before they are released

//server.listen(3000);
//we can cut short the above code and just write it as app.listen(3000)
//as app.listen contains both http.createServer(app) and server.listen(3000);
app.listen(3000);