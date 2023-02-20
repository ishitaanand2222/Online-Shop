const path = require('path');
module.exports = path.dirname(require.main.filename);//this dirname will yeild the path from where our application is running i.e app.js
//module.exports = path.dirname(process.mainModule.filename);