// console.log(Math.log10(1000));//3
// //10^3 = 1000
// console.log(Math.log10(10000));//4
//10^4 = 10000

// const fileSize = 5758575; //bytes 
const units = "BKMGT";

//......1000.....100000......1000000000
//log10
//log10(fileSize)/3;
//0......1......2......3

const index = Math.floor(Math.log10(fileSizeBytes)/3);

//700 ---> 700/1000^0
//10000 --->  10000^1
//10000000 ---> 10000/1000^2

const fileSizeHuman = (fileSizeBytes/Math.pow(1000,index)).toFixed(1);

const unit = units[index];
fileSize = `${fileSizeHuman}${unit}`;

return [fileSize,fileSizeBytes];

