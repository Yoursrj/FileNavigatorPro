//The overall use of this file is to build the main content (HTML representation) of a directory listing.
// It takes in the fullStaticPath (the path to the directory on the file system) and pathname (the URL path of the directory) as input parameters.

//The code imports the fs (file system) and path modules, which are built-in modules in Node.js.
const fs = require('fs');
const path = require('path');
//require files
//It imports two additional modules: calculateSizeD and calculateSizeF. 
//These are custom modules located in the same directory as the current file, indicated by the relative file paths ./calculateSizeD.js and ./calculateSizeF.js.
const calculateSizeD = require('./calculateSizeD.js');
const calculateSizeF = require ('./calculateSizeF.js');
//The function buildMainContent is defined, taking two parameters: fullStaticPath and pathname.
const buildMainContent = (fullStaticPath,pathname) =>{
//Initialize a variable mainContent as an empty string. This variable will store the HTML content that will be built in the following code.
    let mainContent = '';
//Declare two variables items and stats. These variables will be used later to store the items (files and directories) inside a folder and their corresponding file stats.    
    let items,stats;
 try{
  items =  fs.readdirSync(fullStaticPath);//Try to read the contents of the fullStaticPath directory synchronously using fs.readdirSync. 
 console.log(items)
 }catch(err){
 console.log(`readDirSyncError:${err}`);
//This method returns an array of filenames present in the specified directory.
 return `<div class="alert alert-danger">Internal Server Error </div>`
 }

 //remove   .DSstore
 //Filter out the .DS_Store file from the items array. This is a commonly hidden file on macOS that can be safely ignored.
 items  = items.filter (element => element != '.DS_Store');

 //get the following elements for each item:  //jese ek folder ka naam projects hai or usme ek file ka name hai css hai to uski saari jaankari nikal lo
//Iterate over each item in the items array using forEach.
        items.forEach(item => {//jo item hai pathname ko join kr diya jo particular files nikle hai looping se then usko pathname*(url with folder) se connect kar diya taaki unka alag se path ban jaaye khud ka
         //store item details in an object
         //Create an empty object itemDetails to store details about the current item (file or directory).
         let itemDetails = {};  
         //name
         //Set the name property of itemDetails to the current item's name.
         itemDetails.name = item;   

         console.log(pathname)
         //link
         //Use the path.join method to concatenate the pathname with the current item's name and store it in the link variable. 
         //This will create a URL-like path to the item.
           const link = path.join(pathname,item);
           //icon
           //Declare the icon and stats variables. These will be used to store the icon representation and file stats of the current item.
           let icon,stats;
           //get stats of the item 
           const itemFullStaticPath = path.join(fullStaticPath,item);
           try{
          //Use fs.statSync to get the file stats of the current item, given its full static path (itemFullStaticPath).
              itemDetails.stats = fs.statSync(itemFullStaticPath);
           }catch(err){
                 console.log(  `statSync Error : ${err}`);
                 mainContent = `<div class="alert alert-danger">Internal Server Error</div>`;
                 return false;
           }
           if(itemDetails.stats.isDirectory()){//Check if the current item is a directory or a file by inspecting its stats using itemDetails.stats.isDirectory().
              itemDetails.icon = '<ion-icon name="folder"></ion-icon>';// If it's a directory, set the icon property of itemDetails to an HTML representation of a folder icon.
            [itemDetails.size,itemDetails.sizeBytes] = calculateSizeD(itemFullStaticPath);
            }
            //If the current item is a file, set the icon property of itemDetails to an HTML representation of a document icon.
            else if(itemDetails.stats.isFile()){
              itemDetails.icon = '<ion-icon name="document"></ion-icon>';
            [itemDetails.size,itemDetails.SizeBytes] = calculateSizeF(itemDetails.stats);
            }

            //when was the file last change?(unix timestamp)
            //Get the last modification timestamp (mtimeMs) from the file stats and assign it to itemDetails.timeStamp.
            itemDetails.timeStamp = itemDetails.stats.mtimeMs;

            //convert time stamp to a date
            //Create a Date object from the itemDetails.timeStamp and assign it to itemDetails.date.
            
            // This will represent the last modification date of the item.
            itemDetails.date =  new Date(itemDetails.timeStamp)

            //Format the itemDetails.date as a localized string using toLocaleString(). 
            //This will convert the date to a more human-readable format.
            itemDetails.date = itemDetails.date.toLocaleString();
            
            //Output the formatted itemDetails.date to the console.
            console.log(itemDetails.date);
          
          //Append a table row (<tr>) to the mainContent variable, containing data attributes for the item's name, timestamp, and size in bytes.
          // The row also includes HTML markup for displaying the icon, a hyperlink to the item's link, size, and last modified date.
           mainContent += `<tr data-name = "${itemDetails.name}" data-time = "${itemDetails.timeStamp} data-size = "${itemDetails.sizeBytes}"> 
 <td>${itemDetails.icon}<a href="${link}" target='${itemDetails.stats.isFile() ? "_blank" : "" }'>${item}</a></td>
 <td>${itemDetails.size }</td>
<td> ${itemDetails.date }</td>
 </tr>`;
        });
        //link to the item 
        //size
        //last modified
                 
 //Finally, return the mainContent variable, which contains the built HTML content for the files and directories in the specified folder.
 return mainContent;
};
//Export the buildMainContent function so that it can be used by other modules.
module.exports = buildMainContent;
//That's a line-by-line explanation of the provided code. Let me know if you have any further questions!

//It reads the contents of the directory specified by fullStaticPath using fs.readdirSync.
//It filters out any unwanted files, such as the .DS_Store file.
//It iterates over each item in the directory and retrieves its details using fs.statSync to get the file stats.
//Based on whether an item is a directory or a file, it determines the appropriate icon representation and calculates the size of the item.
//It formats the last modification timestamp of the item to a human-readable date format.
//It appends the item details (icon, name, link, size, and date) to the mainContent variable as an HTML table row.
//Finally, it returns the mainContent, which contains the HTML representation of the directory listing.


//In summary, this file is used as a utility module to generate the main content (HTML)
// for displaying the files and directories in a specified folder, typically used in a web application or file explorer interface.




