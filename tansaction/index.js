import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config"
import base58 from 'bs58'


const userKeypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
console.log(userKeypair)

const devConnection = new Connection('https://devnet.helius-rpc.com/?api-key=17eba785-a65a-47a0-bf42-a60aa610314f')

const add = userKeypair.publicKey.toBase58()
const userAdd = new PublicKey(add)


const toAdd = new PublicKey(`9Hw9LzkvvLiyN2B5TQzJfcHu8Hzop4dzMoz9MBAKCBmo`)

let myBalance = await devConnection.getBalance(userAdd)
let toAddBalance = await devConnection.getBalance(toAdd)

let balanceSol = myBalance / LAMPORTS_PER_SOL
let toAddBalanceSol = toAddBalance / LAMPORTS_PER_SOL

console.log(`发送方 ${userAdd} -- 余额 ${balanceSol} SOL`)
console.log(`接收方 ${toAdd} -- 余额 ${toAddBalanceSol} SOL`)

const transaction = new Transaction()

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: userAdd,
    toPubkey: toAdd,
    lamports: 0,
})

transaction.add(sendSolInstruction)


let signature = await sendAndConfirmTransaction(devConnection, transaction, [
    userKeypair,
])


console.log(
    `成功发送`
)



myBalance = await devConnection.getBalance(userAdd, `confirmed`)
toAddBalance = await devConnection.getBalance(toAdd, `confirmed`)

balanceSol = myBalance / LAMPORTS_PER_SOL
toAddBalanceSol = toAddBalance / LAMPORTS_PER_SOL

console.log(`发送方 ${userAdd} -- 余额更新为 ${balanceSol} SOL`)
console.log(`接收方 ${toAdd} -- 余额更新为 ${toAddBalanceSol} SOL`)