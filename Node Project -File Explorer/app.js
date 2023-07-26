//1
//you will build this project using pure Node to gain a thorough understanding of Node . 
//there are obviously easier ways to buildng this project using external modules , but that is the purpose of this project as you would miss out on many code concepts.


//require node modules
const http = require('http');

//file imports
const respond =   require('./lib/respond.js');   

//connection strings
const port = process.env.port || 3000;

//create server`    
const server = http.createServer(respond);

//listen to the client requests on the specific port,the port should be available
server.listen(port,()=>{
    console.log(`listening on port :${port}`)
});