///require node modules
const {execSync} = require('child_process');//This line imports the execSync function from the child_process module. 
//The execSync function allows you to run shell commands synchronously.

const calculateSizeD = (itemFullStaticPath)=>{//This line declares a function named calculateSizeD that takes a parameter itemFullStaticPath.
    // The function calculates the size of a  directory specified by itemFullStaticPath.
    const cleaned = itemFullStaticPath.replace(/\s/g,'\ ');//This line removes any whitespace characters from the itemFullStaticPath and replaces them with a backslash followed by a space.
    // This is done to handle file or directory paths that contain spaces when executing shell commands.
    

    //This line uses the execSync function to execute the du -sh command on the cleaned path. The du command is used to estimate file and directory sizes.
    // The -s option displays only the total size, and the -h option makes the output human-readable (e.g., in kilobytes, megabytes). The output of the command is captured and stored in the commandOutput variable.
    //isme saare values of filesize , 
    const commandOutput =             
    execSync(`du -sh "${cleaned}"`).toString();
    //This line removes any whitespace characters from the commandOutput string.
    let filesize  = commandOutput.replace(/\s/g,'');
    //This line splits the filesize string by the forward slash character ('/'). This is done to separate the size information from the path information (if present).
    filesize = filesize.split('/');


    filesize = filesize[0];//This line assigns the first element of the filesize array back to the filesize variable. This represents the size information without the path.//109 , 108 , 107 mb , kb etc
    let final = '';//This line initializes an empty string variable named final, which will be used to store the final size value.
    for(i=0;i<filesize.length;i++){//This line starts a loop that iterates over each character in the filesize string.
        if(filesize[i]=='C'){//This line checks if the current character in the filesize string is 'C'.//kyuki windows me C://Users ese shuru hota hai matter sara to isliye hume C nahi chahiye
            break;//This line breaks out of the loop if the current character is 'C'. This is done to stop iterating once the size value is complete and before any path information.
        }
        final += filesize[i];//This line appends the current character from the filesize string to the final string.
    }
    let number,unit,filesizeBytes;//This line declares three variables: number, unit, and filesizeBytes. These variables will be used to store the parsed size information.
    if(final === '0'){//This line checks if the final variable is equal to the string '0'. It handles the case where the size is zero.
        final = '0B';//This line assigns the string '0B' to the final variable. It represents zero size.
    }    
    else{
        unit = final.replace(/\d|\./g,'');//This line removes any digits or periods from the final string and assigns the result to the unit variable. 
        //This extracts the unit (e.g., B, K, M, G) from the size information.
        number = parseFloat(final.replace(/(a-z)/i,''));//This line removes any alphabetic characters from the final string and converts the remaining string to a floating-point number using parseFloat(). The result is assigned to the number variable. 
        //This extracts the numerical value from the size information.if 109.87665567 to iisee lowest float me le aynge
         {/*
           //B 10B --> 10 BYTES  (1000^0)
           //K 19K --> 10 * 1000 BYTES (1000^1)
           //M 10M --> 10 * 1000 * 1000 BYTES (1000^2)
           //G 10G --> 10 * 1000 * 1000 * 1000 BYTES (1000 ^ 3)
           //T 10T --> 10 * 1000 * 1000 * 1000 * 1000 BYTES (1000 ^ 4)
        */}
        const units = "BKMGT";//This line declares a string variable units containing the characters 'B', 'K', 'M', 'G', and 'T'. These characters represent the units of size (Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes).
        filesizeBytes = number*Math.pow(1000,units.indexOf(unit));//This line calculates the size in bytes by multiplying the number value with 1000 raised to the power of the index of the unit character in the units string.
        // For example, if unit is 'K' (Kilobytes), then units.indexOf(unit) returns 1, and the calculation becomes number * Math.pow(1000, 1).
        console.log(filesizeBytes);//This line logs the filesizeBytes value to the console. It prints the calculated size in bytes.
    }
    return [final,filesizeBytes];//This line returns an array containing the final size string and the filesizeBytes value. The final size string represents the human-readable size (e.g., 10K, 2.5M).
};
module.exports = calculateSizeD;//This line exports the calculateSizeD function as a module so that it can be used by other parts of the codebase.