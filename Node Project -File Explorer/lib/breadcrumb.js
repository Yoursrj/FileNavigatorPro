//check video 297
//include node modules
const path = require('path');

const buildBreadcrumb = pathname => {
    //This line defines a function called buildBreadcrumb that takes a single parameter pathname 
    //representing the URL path for which the breadcrumb needs to be generated.
    const pathChunks = pathname.split('/').filter(element => element !== '');
    //This line creates an array called pathChunks by splitting the pathname string at each / character and removing any empty strings using the filter() method with a callback function that tests if the element is not empty.
    console.log(`pathChunks ${pathChunks}`);//pathChunks media(if media in url )
    
    let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;
    //This line sets an initial value for the breadcrumb string, which contains the HTML code for a list item with an anchor element that points to the home page (/).
    let link = '/';
    //This line sets an initial value for the link variable to the root URL path (/).
    pathChunks.forEach((item, index) => {
        link = path.join(link, item);
        if(index !== pathChunks.length - 1){
        breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        }else{
            breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
        }
        //This is the main loop that iterates over each item in the pathChunks array using the forEach() method.
        // For each item, the link variable is updated using path.join() method to generate the URL for that item based on the previous link value and the current item.
        //If the current item is not the last one in the pathChunks array (index !== pathChunks.length - 1),
        // then a new breadcrumb item is created with an anchor element that points to the current link value and displays the item text as the link text.
       //If the current item is the last one in the pathChunks array, the function creates an active list item with the item text and sets the aria-current attribute to page.
    });
    return breadcrumb;
    //Finally, the function returns the concatenated string of all the breadcrumb items. The resulting string is HTML code that can be used to display a breadcrumb navigation menu on a web page.
//important===>    //Overall, this function takes a URL path and generates a breadcrumb navigation menu that helps users navigate to the current page and its parent pages.
};

module.exports = buildBreadcrumb;