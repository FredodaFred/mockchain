//Block data structure

// * Imports
const crypto = require("crypto"); // Used for encryption algorithms

// Define a SHA256 hash function from our crypto library
function SHA256(message) {

    return crypto
        .createHash("sha256") // Creates a sha256 hash
        .update(message) // gives the hash a message to hash
        .digest("hex"); // returns the output as  hex
}

class Block {

    constructor(prevHash = "", transactions = []) {
        this.timestamp = Date.now(); // Set the timestamp to now
        this.transactions = transactions; // Transaction list
        this.hash = this.getHash(); // Current block's hash
        this.prevHash = prevHash; // Previous block's hash
        this.nonce = 0; // Some random value for mining purposes
        // Mine the block
        this.mine();
    }
    // Returns the hash of the current block
    getHash() {
      // Combine all transactions into strings
        let txStr = "";
        for (let i = 0; i < this.transactions.length; i++) {
            txStr += JSON.stringify(this.transactions[i]);
        }
        // Hash together... (The hash will take prevhash, timestamp, txtstr, and nonce as its message to hash)
        // this way in validation, by having all this information, you can validate a block
        return SHA256(
            this.prevHash + // The previous hash,
            this.timestamp + // The timestamp of the block,
            txStr + // And all transactions,
            this.nonce // nonce, (number once), random number used to enhance hash 
        );
    }
    // Mine a new block (generate a hash that matches are arbitrary check string, based on global.difficulty)
    mine() {
        // Let's loop until our hash starts with a string 0...000
        //  The length of this string is set through difficulty (default: 1)
        let checkString = Array(global.difficulty + 1).join("0");
        let tries = 0;

        while (!this.hash.startsWith(checkString)) {
            // nonce will keep our necessary data, but change the outcome
            this.nonce++;
            // Recompute the entire hash
            this.hash = this.getHash();
            // Count our tries!
            tries++;
        }
        // Out of curiosity, let's see how many tries we took!
        console.log(`Block mined with ${tries} attempts. Hash: ${this.hash}`);

    }

    // Pretty prints the block
    prettify() {
        // Add basic block parameters
        let blockStr = `<div><b>Block</b> #${this.hash}</div>`;
        blockStr += `<div><b>Timestamp:</b> ${this.timestamp}</div>`;
        blockStr += `<div><b>Previous Hash:</b> ${this.prevHash}</div>`;
        blockStr += "<div><b>Transactions:</b></div><div>";

        // Iterate through all transactions
        for (let i = 0; i < this.transactions.length; i++) {
            blockStr += "    " + this.transactions[i].prettify();
        }
        blockStr += "</div>";

        return blockStr;
    }

}

// Export this object to be used elsewhere
module.exports = Block;