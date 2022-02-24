//Transaction.js
//includes the class that stores data for a transaction
//also stores a function that generates random IPv4, and a random amount of money

// Return a random IPv4 address, generated using random numbers
function generateRandomIPv4() {

    let ipv4 = "";

    // Create network part 1
    ipv4 += Math.floor(Math.random() * 255) + 1;
    ipv4 += ".";

    // Create network part 2
    ipv4 += Math.floor(Math.random() * 255) + 1;
    ipv4 += ".";

    // Create host part 1
    ipv4 += Math.floor(Math.random() * 255) + 1;
    ipv4 += ".";

    // Create host part 2
    ipv4 += Math.floor(Math.random() * 255) + 1;

    return ipv4;

}

// Generates a random amount of money 0 to 1000000
function generateRandomMoney() {
   return Math.floor(Math.random() * 1000000);
}

//Transaction class
//Needs a from address, to address, and amount of cash to instantiate
class Transaction {
    constructor(fromAddress = "", toAddress = "", amount = 0) {
        this.fromAddress = generateRandomIPv4();
        this.toAddress = generateRandomIPv4();
        this.amount = generateRandomMoney();
    }

    // Returns a pretty-print version of the transaction
    prettify() {
        let txStr = `<div>Host <i>${this.fromAddress}</i> sent <i>${this.toAddress}</i> \$${this.amount}.</div>`;
        return txStr;
    }
}

// Export this object to be used elsewhere
module.exports = Transaction;