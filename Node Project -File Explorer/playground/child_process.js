const {execSync} = require('child_process').execSync

try{
  const result = execSync(`du -sh "/c/Users/Ritu Raj/sa classes/es6/Node Project -File Explorer"`).toString();
  console.log(result);
}catch (err){
  console.log(`error: ${err}`)
}
//C:\Users\Ritu Raj\sa classes\es6\Node Project -File Explorer

