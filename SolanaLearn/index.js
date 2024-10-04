import { Keypair } from "@solana/web3.js";
import base58 from 'bs58';
import { copyFileSync, readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

try {
    const fileData = readFileSync('./id1.json');
    const jsonData = JSON.parse(fileData);
    const userKeypair1 = Keypair.fromSecretKey(Buffer.from(jsonData));
    console.log(userKeypair1);
    console.log(`the public key is:`, userKeypair1.publicKey.toBase58());
    console.log(`the secret key is:`, base58.encode(userKeypair1.secretKey));
} catch (error) {
    console.error('Error reading or parsing id.json:', error.message);
}

try {
    const secretKeyBase58 = process.env.SECRET_KEY;
    if (!secretKeyBase58) {
        throw new Error('SECRET_KEY environment variable not set.');
    }
    const userKeypair2 = Keypair.fromSecretKey(base58.decode(secretKeyBase58));
    console.log(userKeypair2);
    console.log(`the public key is:`, userKeypair2.publicKey.toBase58());
    console.log(`the secret key is:`, base58.encode(userKeypair2.secretKey));
} catch (error) {
    console.error('Error creating Keypair from environment variable:', error.message);
}