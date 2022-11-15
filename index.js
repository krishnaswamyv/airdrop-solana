// Import Solana web3 functionalities

const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Get the user entered Public Address from CLI
const publicAddress = process.argv.slice(2).toString();

// Airdrop Sol to user provided Wallet Address
const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicAddress),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

//Get the user wallet balance 
const getWalletBalance = async() => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("Connection object is:", connection);

    // Get the balance of user's Wallet by passing user provided Public Address at command line
    const walletBalance = await connection.getBalance(
      new PublicKey(publicAddress)
    );
    console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
  } catch(err) {
      console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await airDropSol();
    await getWalletBalance();
}

mainFunction();
