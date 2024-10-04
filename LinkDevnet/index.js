import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config"
import base58 from 'bs58'


const userKeypair = Keypair.fromSecretKey(base58.decode(process.env.SECRET_KEY))
console.log(userKeypair)

const devConnection = new Connection('https://devnet.helius-rpc.com/?api-key=17eba785-a65a-47a0-bf42-a60aa610314f')


const add = userKeypair.publicKey.toBase58()
const userAdd = new PublicKey(add)

const balance = await devConnection.getBalance(userAdd)
console.log(balance)

const balanceSol = balance / LAMPORTS_PER_SOL

console.log(`用户 ${userAdd} -- 余额 ${balanceSol} SOL`)