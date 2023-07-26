//This file is a Node.js module that exports a function called respond. Let's go through the code line by line to understand its functionality:
//2
//require node modules


//The code requires three Node.js modules: url, path, and fs.
// These modules provide utilities for working with URLs, file paths, and the file system.
const url = require('url');
const path = require('path');
const fs = require('fs');
//file imports 

const buildBreadcrumb = require('./breadcrumb.js');
const buildMainContent = require('./mainContent.js');
const getmimeType = require('./getMimeType.js');
//The code imports three custom modules: buildBreadcrumb, buildMainContent, and getMimeType. 
//These modules are located in the same directory as the current file.

//static base bath: location of your static folder
//const staticBasePath = 
console.log(__dirname);//C:\Users\Ritu Raj\sa classes\es6\Node Project -File Explorer\lib --current file jo hai ujska path degi ye
//The console.log(__dirname) statement logs the current file's directory path to the console. This helps in determining the current file's location.

//The code uses path.join to construct the staticBasePath by joining the current file's directory path (__dirname) with the relative path ../static. 
//This ensures that the staticBasePath points to the correct location.
const staticBasePath = path.join(__dirname, '..', 'static');//C:\Users\Ritu Raj\sa classes\es6\Node Project -File Explorer\static==>issi me html file hai
//.. -> 2 dotg upar jane ke liye 2 path ....////bydefault pehla page static folder ka khuilega

//respond to a request

//following is function passed to createServer used to create the server
const respond = (request, response) => {
  //The respond function is defined, taking two parameters: request and response. 
  //These parameters represent the incoming HTTP request and the corresponding response object.  


  //before working with the pathname , you need to decode it
  let pathname = url.parse(request.url, true).pathname;//let daala hai taakli change ho sake value future mein
  //pathname = / , /music , /cars
  //The pathname variable is assigned the decoded pathname from the request URL. url.parse(request.url, true).
  //pathname extracts the pathname from the request URL and then decodes it.


  //if favicon.io , then stop 
  //29-30. If the pathname is /favicon.ico, the code returns false to stop further processing.
  //This is to handle the favicon request separately.
  if (pathname === '/favicon.ico') {
    return false;
  }
  //The pathname is decoded using decodeURIComponent to handle URL encoding.
  pathname = decodeURIComponent(pathname);
  // %pahnameApplandingPage%Bootstrap iss jese pathname ko decode klrne ke liye use honge

  //get the full corresponding full static path located in the static folder 
  const fullStaticPath = path.join(staticBasePath, pathname);//url ka jo path hai ..or directory ka path jo hai usse join kardo //dorectory- yani jnis file me hum abhi hai
  //C:\Users\Ritu Raj\sa classes\es6\Node Project -File Explorer\static\media   //C:Users se leke static tak to directory ka naam hai(staticBasePath)...uske aage jo media hai wo url(pathname) ka pathname hai
  //The fullStaticPath variable is created by joining the staticBasePath with the decoded pathname.
  //This represents the full path to the file or directory on the file system.
  
  
  //can we find something in fullStaticPath?

  //no:send '404':'FILE NOT FOUND!'
  //OK, so let's go to our next step.Which is to check if the false static path corresponds to something inside the static folder.
  //So to do this, you can use the method.Exists, think of the first model, so you're going to do this synchronously because we want to wait for the output's before we can execute any coming code.
  //So this will be applied to the full Static...
  if (!fs.existsSync(fullStaticPath)) { //kuch nahi mila to ye chalega...matlab path ki jo directory hai usme kopi file .js,.xss etc hai ya bhi nahi
    console.log(`${fullStaticPath}does not exist`);
    response.write('404:File Not Found');
    response.end();
    return false;
  }
  //If the fullStaticPath does not exist (i.e., the file or directory doesn't exist), the code logs an error and sends a response with a "404: File Not Found" message.


  //we found something //kuch mila to ye chalega
  //is it a file or directory??
  let stats;
  try {//fullStaticPath = mixture of url and directory..../localhost.../.../static/media.....static tak diorectory(static) or uske baad url ka path(mmedia)
    stats = fs.lstatSync(fullStaticPath);//isse puri info. milegi pure fullStaticPath ki 
    //. The stats object returned by lstat() contains information about the file, such as its size, permissions, and modification time.
  } catch (err) {
    console.log(`lstatSync Error ${err}`)
  }
  //This code retrieves the file or directory information using fs.lstatSync. The stats variable will store the result, which includes details such as file size, permissions, and modification time.
  // If there's an error during this process, it will be caught and logged.
 
  //it is a directory:
  if (stats.isDirectory()) {
    //get content from the template index.html
    //If the stats indicate that the requested path corresponds to a directory, this code block is execute
    
    //It reads the index.html template file located in the project_files directory, and assigns its content to the data variable.
    let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8')//static path or jo main content wali index.html ko join krdo or content show kro
    //build the page title yaani page title bhi wohi hona chahiye jo directory p hai hum abhi
    console.log(pathname);
    let pathElements = pathname.split('/').reverse();// It then extracts the path elements, including the folder name, from the pathname
    pathElements = pathElements.filter(element => element !== '');
    let folderName = pathElements[0];
    if (folderName === undefined) {
      folderName = 'Home';
    }

    console.log(folderName); {/*[
        if the url is '/', and similarly for other urls
        'code',
        'file.txt',
        'form.html',
        'images',
        'media',
        'Projects',
        'project_files',
        'Purchased Books'
      ] */}

    //build breadcrumb
        // If no folder name is found, it defaults to 'Home'.
        // The breadcrumb is generated using the buildBreadcrumb function, and the mainContent is generated using the buildMainContent function
    const breadcrumb = buildBreadcrumb(pathname);
    //build table rows (main_content) // table ki rows 
    const mainContent = buildMainContent(fullStaticPath, pathname);
    //fill the template data with: the page title , breadcrumb and table rows(main_content)
    data = data.replace('page_title', folderName);//home Projects media
    //home  
    //    Projects
    //           App Landing Page
    data = data.replace('pathname', breadcrumb);

    data = data.replace('mainContent', mainContent);
    //print data to the webpage 
    response.statusCode = 200;
    response.write(data);//content show krne ke liye main page mein
    return response.end();
  }
  // If the fullStaticPath exists and corresponds to a directory, 
  //the code reads the contents of the index.html template file located in the project_files directory.
  // It builds the page title, breadcrumb, and main content based on the directory path 
  //and replaces the corresponding placeholders in the template with the generated values.
  
  
  //It is not a directory but not a file either
  if (!stats.isFile()) {
    response.statusCode = 401;
    response.write('401:Access Denied');
    console.log('not a file');
    return response.end();
  }
  // If the fullStaticPath corresponds to something that is not a directory or a file, the code sends a "401: Access Denied" response.
  //If the stats indicate that the requested path corresponds to something that is not a directory or a file, this code block is executed. 
  //It sets the response status code to 401 (Access Denied), writes a corresponding message to the response body, logs a message to the console, and ends the response.
  
  //send:401 :  Access denied!

  //It is a file 
  //Lets get the file extension 
  let fileDetails = {};
  fileDetails.extname = path.extname(fullStaticPath);
  console.log(fileDetails.extname);

  //file size
  let stat;
  try {
    stat = fs.statSync(fullStaticPath);
  }
  catch (err) {
    console.log(`err:${err}`);
  }
  fileDetails.size = stat.size;
  //get the file mime type and add it to the response header
  getmimeType(fileDetails.extname)
    .then(mime => {
      // //console.log(mime);
      // response.statusCode=200;
      // response.write(`status code in getMimeType function :${mime}`);
      // return response.end();

      //store headers here
      let head = {};
      let options = {};

      //response status code
      let statusCode = 200;

      //set "Content-type" for all file types
      head['Content-Type'] = mime;

      //get the file size and add it to the response header
      //pdf file -> display in browser
      if (fileDetails.extname === '.pdf') {
        head['Content-Disposition'] = 'inline';
        // head['Content-Disposition'] = 'attachment;filename-file.pdf';
      }

      //audio/video file? -> stream in ranges 
      if (RegExp('audio').test(mime) || RegExp('video').test(mime)) {
        //header
        head['Accept-Ranges'] = 'bytes';
        const range = request.headers.range;
        console.log(`range: ${range}`);

        if (range) {
          //bytes = 5210112 - end
          const start_end = range.replace(/bytes=/, "").split('-');
          const start = parseInt(start_end[0]);
          const end = start_end[1] ? parseInt(start_end[1]) : fileDetails.size - 1;
          //0 ... last byte
          //headers
          //Content - Range
          head['Content-Range'] = `bytes ${start}-${end}/${fileDetails.size}`;
          //Content - length
          head['Content-Length'] = end - start + 1;
          statusCode = 206;

          //options
          options = { start, end };
        }

      }
      //reading the  file using fs.readFile
      // fs.readFile(fullStaticPath,'utf-8',(error,data )=>{
      //   if(error){
      //     response.statusCode = 404;
      //     response.write('404:File Reading error!');
      //     return response.end();
      //   }
      //   else{
      //     response.writeHead(statusCode,head);
      //     response.write (data);
      //     return response.end();
      //   }
      // });

      //promises method
      // fs.promises.readFile(fullStaticPath,
      //   'utf-8')
      //   .then((error,data )=>{
      //     if(error){
      //       response.statusCode = 404;
      //       response.write('404:File Reading error!');
      //       return response.end();
      //     }
      //     else{
      //       response.writeHead(statusCode,head);
      //       response.write (data);
      //       return response.end();
      //     }
      //   })
      //   .catch(error=>{
      //     console.log(error);
      //     response.statusCode = 404;
      //     response.write('404:File Reading Error!');
      //     return response.end();
      //   });

      //streaming method
      const fileStream = fs.createReadStream(fullStaticPath, options);
      //stream chunks to your response object
      response.writeHead(statusCode, head);
      fileStream.pipe(response);

      //events: close and error
      fileStream.on('close', () => {
        return response.end();
      });
      fileStream.on('error', error => {
        console.log(error);
        response.statusCode = 404;
        response.write('404:File streaming Error!');
        return response.end();
      });
    })
    .catch(err => {
      response.statusCode = 500;
      response.write('500:Internal Server Error ');
      console.log(`Promise Error : ${err}`);
      return response.end();
    })
  //get the file size and add it to the response header
  //pdf file? -> display in browser 
  //audio/video file? -> stream in ranges
  //all other  files stream in normal way 
}
//If the stats indicate that the requested path corresponds to a file, this code block is executed. 
//It retrieves the file extension using path.extname and stores it in the fileDetails object. 
//The file size is obtained using fs.statSync and stored in fileDetails.size. 
//The getMimeType function is called to determine the MIME type of the file. 
//Based on the MIME type, the appropriate response headers are set, including Content-Type and Content-Disposition. 
//If the file is an audio or video file, range streaming is supported. 
//The file content is streamed to the response using fs.createReadStream and piped to the response object. 
//Event handlers are set for the close and error events of the file stream. If any errors occur during the process, appropriate error messages and status codes are set in the response.

//Finally, the respond function is exported so that it can be used by other modules.
module.exports = respond;

//The objective of this file is to handle incoming HTTP requests and generate appropriate responses based on the requested file or directory. 
//It serves as the core logic for a file explorer application.

// The file contains a function called respond which takes in an HTTP request and response object. It performs the following tasks:

// It retrieves the file or directory information using fs.lstatSync to determine the type and existence of the requested resource.
// If the requested path corresponds to a directory, it reads the index.html template file, 
//replaces placeholders with dynamic values such as the folder name, breadcrumb, and main content, and sends the modified HTML as the response.
// If the requested path corresponds to something other than a directory or a file, it sends a "401: Access Denied" response.
// If the requested path corresponds to a file, it determines the file's extension, size, and MIME type.
// It sets appropriate response headers based on the file type.
// For audio or video files, it enables range streaming to allow partial content requests.
// It streams the file content to the response using fs.createReadStream and handles events such as close and error.
// If any errors occur during the process, appropriate error messages and status codes are set in the response.
// Overall, the purpose of this file is to handle HTTP requests, determine the requested resource type,
// generate the appropriate response (HTML for directories, file content for files), and handle any errors that may occur in the process.