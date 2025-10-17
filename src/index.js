const prompt = require('prompt-sync')()
const { default: axios } = require('axios')
const FormData = require('form-data')
const { ethers } = require('ethers')
const { readFileSync, writeFileSync, existsSync, createReadStream } = require('fs')
require('dotenv').config()

const abiERC20 = require('./abi/ERC20.json')
// const abiMulticall3 = require('./abi/Multicall3.json')
const abiFourMeme = require('./abi/FourMeme.json')
const { bsc } = require('viem/chains')

const AUTH_HEADER = process.env.BLOX_AUTH_HEADER
const RPC_URL = ''
const FOUR_MEME_ADDRESS = '0x5c952063c7fc8610FFDB798152D69F0B9550762b'
// const DEPLOYER_ADDRESS = '0x8D68E48bAEe3264eCd62A8B85B80F8558Cc1b499'

const ART_LOGO = `
   ___                         __          __
  / __\\__  _   _ _ __ /\\/\\    /__\\/\\/\\    /__\\
 / _\\/ _ \\| | | | '__/    \\  /_\\ /    \\  /_\\
/ / | (_) | |_| | |_/ /\\/\\ \\//__/ /\\/\\ \\//__
\\/   \\___/ \\__,_|_(_)/    \\/\\__/\\/    \\/\\__/
`

const provider = new ethers.JsonRpcProvider(RPC_URL, 56)
const FourMeme = new ethers.Contract(FOUR_MEME_ADDRESS, abiFourMeme)

function promptEnforce(ask, rxp = /.{1,255}/) {
    for (let i = 0; i < 5; i++) {
        const res = prompt(ask)
        if (res && rxp.test(res))
            return res
    }
    throw Error('Input error')
}

async function main() {
    const owner = readOwner()
    const balance = await provider.getBalance(owner.address)
    while (true) {
        console.log([
            '',
            ART_LOGO,
            `   (owner: ${owner.address.slice(0, 6)}...${owner.address.slice(-4)} ${Number(ethers.formatEther(balance)).toFixed(6)} BNB)`,
            '',
            '\t1. Create wallets',
            '\t2. Create token & buy',
            '\t3. Buy tokens',
            '\t4. Sell tokens',
            '\t5. Withdraw BNB',
            '\tType "exit" to exit',
            '',
        ].join('\n'))
        const k = prompt('Input number(1-5): ')
        try {
            if (k == 'exit')
                return
            if (k == 1)
                await configWallets(owner)
            else if (k == 2)
                await createToken(owner)
            else if (k == 3)
                await buyTokens(owner)
        } catch (ex) {
            console.error("error", ex)
            writeFileSync('error.txt', JSON.stringify(ex, undefined, 4))
        }
    }
}

function readOwner() {}

function readWallets() {}

async function configWallets(owner) {}

async function prepareBundle(wallets) {}

async function sendBundle(txns) {
    return false
}

async function createToken(owner) {
    prompt('Press Enter to return')
}

async function buyTokens(owner) {
    prompt('Press Enter to return')
}

async function sendBNB(owner) {}

async function sellTokens(owner) {
    prompt('Press Enter to return')
}

//... main code is private ...


main()
