const transaction = new web3.Transaction()




transaction.add(
  new web3.TransactionInstruction({
    keys:[],
    programId: new web3.PublicKey(pg.PROGRAM_ID)
  }),
)

const txHash = await web3.sendAndConfirmTransaction(
  pg.connection,
  transaction,
  [pg.wallet.keypair],
)

console.log("Transaction send with hash", txHash)