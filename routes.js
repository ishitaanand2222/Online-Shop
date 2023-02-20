const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/')
    {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action = "/message" method ="POST"> <input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    //Process of Execution
    //node.js after entering the if condition will first register both the events and will run the functions inside them later which is why it is
    //asynchronous i.e it will first register req.on('data') and req.on('end') and will straight away run the code written after that.That is why
    //it doesnt pause, had it to register events and also run the code written it will cause server delay. It does this so that code blockage doesnt happen
    //Hence nodejs is having performance becuz it never blocks code it will OS to do this, to do that and then will later come to callbacks
    if(url === '/message' && method === 'POST')
    {
        const body = [];//req body
        req.on('data',(chunk) => {//on is an event listener and here it will help us to parse the data
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end' ,()=>{
            const parsedBody = Buffer.concat(body).toString();//it will create a new buffer and will add all chunks inside it;Buffer is like a bus
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });//Sync is synchronous which will block execution of the other code until its execution is done 
            //res.writeHead(302, {});//helps to write meta information in one go we can also do the same in a series of steps
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page </title></head>');
    res.write('<body><h1>Hello from my node.js </h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = requestHandler;//requestHandler is registered

// module.exports = {
//     handler : requestHandler,
//     someText : 'Some hard code txt'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some more txt';

exports.handler = requestHandler;
exports.someText = 'Some more more txt';