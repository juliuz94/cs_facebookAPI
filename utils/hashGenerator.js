const crypto = require('crypto');

const createHash = (string) => {
    //creating hash object 
    var hash = crypto.createHash('sha256');
    //passing the data to be hashed
    const data = hash.update(string, 'utf-8');
    //Creating the hash in the required format
    const gen_hash = data.digest('hex');
    //Printing the output on the console
    return gen_hash

}

module.exports = createHash