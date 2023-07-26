//MIME (Multipurpose Internet Mail Extensions) type is a standard way to classify files on the Internet based on their nature and format. 
//It is a two-part identifier that indicates the nature and format of a file or resource. MIME types were originally developed for email purposes to determine the type of data being transmitted.


let https = require('https');//This line imports the https module from Node.js. The https module allows you to make HTTPS requests and interact with HTTPS servers.
//This line declares a constant variable named mimeUrl and assigns it a string value. The string represents the URL of a JSON file hosted on GitHub Gist. The JSON file contains a mapping of file extensions to MIME types.
//In this case, the URL points to a specific JSON file created by Ash Heskes, which provides a mapping between file extensions and their corresponding MIME types. The file can be accessed using an HTTP GET request.
//The JSON file is hosted on GitHub Gist and is used to retrieve MIME types based on file extensions. example - .pdf , .mp4 etc
const mimeUrl = "https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json";
//This line declares a constant variable named mimeUrl and assigns it a string value. The string represents the URL of a JSON file hosted on GitHub Gist. The JSON file contains a mapping of file extensions to MIME types. 
//This URL is used to retrieve the MIME types based on file extensions.

const getMimeType = extension =>{//This line declares a constant variable named getMimeType and assigns it an arrow function. The function takes an extension parameter, which represents the file extension for which you want to retrieve the MIME type.
return new Promise ((resolve,reject)=>{//This line returns a new Promise. Promises are used to handle asynchronous operations. It takes two parameters: resolve and reject, which are functions used to either fulfill or reject the Promise.
     https = require('https');
    https.get(mimeUrl, response => {//This line makes an HTTPS GET request to the mimeUrl URL. It retrieves the JSON file containing the mapping of file extensions to MIME types. The response from the server is passed as a parameter to the callback function.
     if(response.statusCode<200 || response.statusCode > 299){//This line checks the status code of the HTTP response. If the status code is not within the 200-299 range, it indicates an error. 
      //In this case, it rejects the Promise and provides an error message.
        reject(`Error failed to load mime ypes for js files${response.statusCode}`);
        console.log(`Error failed to load mime ypes for js files${response.statusCode}`)
        return false;
     }
     let data ='';//This line declares a variable named data and initializes it as an empty string. This variable will be used to store the received data from the server.
     //you will receive data by chunks 
      response.on('data', chunk => {//This line listens for the data event emitted by the response stream. When data is received from the server, it appends the data to the data variable.
      data += chunk;
    });
    //once you received alll types of data
    response.on('end',() =>{//This line listens for the end event emitted by the response stream. It indicates that all the data has been received from the server.
     //This line resolves the Promise and passes the corresponding MIME type to the resolve function. 
     //It parses the received data as JSON and retrieves the MIME type based on the provided extension parameter.
      resolve(JSON.parse(data)[extension ]);
    });
    
    }).on('error', (e) => {
      //This line listens for the error event emitted by the HTTPS request. If there is an error during the request, it logs the error to the console.
      console.error(e);
    });//This line closes the Promise and the callback functions.
})  ;//This line closes the Promise and the callback functions.
}

module.exports = getMimeType;//This line exports the getMimeType function to make it available for other modules to import and use.

//Overall, this code defines a function getMimeType that retrieves the MIME type for a given file extension by making an HTTPS request to a JSON file hosted on GitHub Gist. 
//The function returns a Promise that resolves with the MIME type.

//CONCEPT OF CHUNK ---->


// Certainly! In the context of the code you provided, the term "chunk" refers to a small piece of data that is received from the server during an HTTP request.

// When you make an HTTP request to retrieve data from a server, the data is usually sent in small portions or "chunks." These chunks are parts of the complete response. 
//The server sends these chunks as soon as they are available, rather than waiting to send the entire response at once. This allows for more efficient transmission and processing of large amounts of data.

// In the code, the line response.on('data', chunk => { ... }) sets up an event listener for the 'data' event emitted by the response stream. 
//Whenever a chunk of data is received from the server, the callback function specified in the arrow function (chunk => { ... }) is executed.

// The received data chunks are appended to the data variable using the += operator, which concatenates the new chunk to the existing data. 
//By accumulating the chunks, the complete response is gradually built up.

// This approach is particularly useful when dealing with large files or when the server sends data in chunks to optimize memory usage and network efficiency. 
//It allows for processing the received data incrementally instead of waiting for the entire response to be received before acting on it.

// Once all the chunks have been received, the 'end' event is emitted, and the callback function specified in response.on('end', () => { ... }) is executed. 
//At this point, the accumulated data contains the complete response from the server, and further processing can take place.

// In summary, handling data in chunks allows for more efficient transmission and processing, especially when dealing with large amounts of data or in scenarios where data is sent gradually as it becomes available.


