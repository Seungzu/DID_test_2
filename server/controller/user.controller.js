const generateHash = require('../util/hashGenerator.js')
const { encryptUserInfo, decryptUserInfo } = require('../util/crypto.js')
const getDeplyed = require('../web3.js')
const { v4 : uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const { pool } = require('../db.js');


const regist = async (req,res) => {
    const { id, pw, name, age } = req.body
    const deployed = await getDeplyed()
    const userCode = uuid().split('-').join('')
    const hash = generateHash(id, pw)

    const userInfo = { id, name, age }
    const address = process.env.ADDRESS;

    const stringifiedUserInfo = JSON.stringify(userInfo)

    const encoded = encryptUserInfo(stringifiedUserInfo)


    const userData = {
        userCode,
        userInfo : encoded,
    }

    try {
        const txCount = await deployed.client.web3.eth.getTransactionCount(address);
        await deployed.contract.methods.registerUser(hash, userData).send({ nonce: txCount, from: address })

        const sql = `INSERT INTO user(userId, userCode) VALUES('${id}','${userCode}')`
        await pool.execute(sql)

        res.json({ regist :true })

    } catch(e){
        console.log(e)
        console.log('유저정보 안들어감')
        res.json({ regist : false })
    }
}

const login = async (req,res) => {
    const { id : userId, pw } = req.body;
    const hash = generateHash(userId, pw);
    const deployed = await getDeplyed();
    const address = process.env.ADDRESS;
    const isRegistered = await deployed.contract.methods.isRegistered(hash).call({from:address})
    try{

        const sql = `SELECT * FROM user WHERE userId='${userId}'`
        const [[result]] = await pool.execute(sql)
        const { idx } = result

        if(isRegistered){
            const userInfo = { idx, userId };
            const salt = process.env.COOKIE_SALT;
            const options = { expiresIn : '7d'}
            jwt.sign(userInfo, salt, options, (err, token) => {
                if(err) console.log(err);
                else res.json({ login:true, token})
            })
        } else {
            res.json({login:false})
        }
    } catch(e){
        console.log(e)
        res.json({login:false})
    }
}

const checkToken = async (req,res) => {
    const { userToken : token } = req.body
    const salt = process.env.COOKIE_SALT;
    try{
        jwt.verify(token, salt,(err,decoded)=>{
            if(err){
                console.log('복호화 에러')
                res.sendStatus(500).send(false);
            } else {
                const { idx, userId } = decoded;
                const result = { idx, userId }
                res.json(result)
            }
        })
    } catch(e){
        console.log(e)
    }
}

const PwCheck = (req,res) => {

    const { userPw , cookies } = req.body;
    const token = cookies.Han_DID

    const salt = process.env.COOKIE_SALT;
    try{
        jwt.verify(token, salt, async (err,decoded)=>{
            if(err){
                console.log('복호화 에러')
                res.sendStatus(500).send(false);
            } else {
                const { userId } = decoded;
                const hash = generateHash(userId, userPw)
                const deployed = await getDeplyed();
                const address = process.env.ADDRESS;
                const isRegistered = await deployed.contract.methods.isRegistered(hash).call({from:address})
                if(isRegistered) res.json({ pwCheck : true, hash })
                else res.json({ pwCheck : false })
            }
        })
    } catch(e){
        console.log(e)
    }
}

const getUserInfo = async (req,res) => {
    try{
        const { hash } = req.body
        const deployed = await getDeplyed();
        const address = process.env.ADDRESS;
        const getUserInfo = await deployed.contract.methods.getUserInfo(hash).call({from:address})
        const decrypt = decryptUserInfo(getUserInfo.userInfo)
        const userInfo = JSON.parse(decrypt)
        res.json({ userInfo })

    }catch(e){
        console.log(e)
        res.json({ error:false })
    }
    


}

const withdrawUser = async (req,res) => {
    try{
        const { hash, userData } = req.body
        const deployed = await getDeplyed();
        const address = process.env.ADDRESS;

        const txCount = await deployed.client.web3.eth.getTransactionCount(address);
        await deployed.contract.methods.withdrawUser(hash).send({ nonce: txCount, from: address })

        const sql = `DELETE FROM user WHERE userId='${userData.userId}'`
        await pool.execute(sql)

        res.json({ withdraw:true })

    }catch(e){
        console.log(e)
        res.json({ withdraw:false })
    }
}

module.exports = { regist, login, checkToken, PwCheck, getUserInfo, withdrawUser }