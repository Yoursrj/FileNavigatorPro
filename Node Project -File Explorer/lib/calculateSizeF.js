//require node modules

const calculateSizeF = stats => {//This line declares a function named calculateSizeF that takes a parameter stats.
    // The function calculates the human-readable file size based on the given stats object.
    const fileSizeBytes = stats.size;//This line extracts the size property from the stats object and assigns it to the fileSizeBytes variable.
    // It represents the size of the file in bytes.
    //bytes 
    // console.log(Math.log10(1000));//3
    // //10^3 = 1000
    // console.log(Math.log10(10000));//4
    //10^4 = 10000

    // const fileSize = 5758575; //bytes 
    const units = "BKMGT";//This line declares a string variable units containing the characters 'B', 'K', 'M', 'G', and 'T'. 
    //These characters represent the units of size (Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes).

    //......1000.....100000......1000000000---->3,6,9 thats why 3 ka use kiya hai 
    //log10
    //log10(fileSize)/3;
    //0......1......2......3

    const index = Math.floor(Math.log10(fileSizeBytes) / 3);
    //This line calculates the index used to determine the appropriate unit for the file size. 
    //It takes the logarithm base 10 of fileSizeBytes, divides it by 3, and rounds down to the nearest integer using Math.floor().
    // This index represents the power of 1000 needed to convert the file size to a readable unit.

    //700 ---> 700/1000^0
    //10000 --->  10000^1
    //10000000 ---> 10000/1000^2

    //Suppose fileSizeBytes is 3456789 (representing 3,456,789 bytes) and index is 2.The calculation is as follows:
    //The value of index is 2, which means the file size should be converted to a unit in the thousands range (i.e., Megabytes).
    //We divide fileSizeBytes by 1000 raised to the power of index. In this case, it becomes: 3456789 / Math.pow(1000, 2).
    //Math.pow(1000, 2) calculates 1000 raised to the power of 2, which is 1,000,000.So, the division becomes: 3456789 / 1,000,000.
    //The result of the division is 3.456789.The value is then formatted to one decimal place using .toFixed(1), resulting in 3.5.
    //Therefore, in this example, the human-readable file size would be "3.5MB".
    
    //This line calculates the human-readable file size by dividing fileSizeBytes by 1000 raised to the power of index.
    // The result is formatted to one decimal place using .toFixed(1).
    const fileSizeHuman = (fileSizeBytes / Math.pow(1000, index)).toFixed(1);

    //This line assigns the unit character corresponding to the index from the units string to the unit variable.
    // This determines the unit (e.g., B, K, M, G, T) for the file size.
    const unit = units[index];

    //This line constructs the final fileSize string by combining the fileSizeHuman value (formatted file size) and the unit value (file size unit).
    fileSize = `${fileSizeHuman}${unit}`;//${3.5} ${MB} 


    //This line returns an array containing the fileSize string and the fileSizeBytes value. 
    //The fileSize string represents the human-readable file size (e.g., 10K, 2.5M), and fileSizeBytes represents the file size in bytes.
    return [fileSize, fileSizeBytes];
};


//This line exports the calculateSizeF function as a module so that it can be used by other parts of the codebase.
module.exports = calculateSizeF;