const { v4 : uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const { pool } = require('../db.js');

const addApp = async (req,res) => {
    const { appName : name, appDesc, appLogo, appHost : host, appRedirectUri : redirectURI, userData } = req.body

    const { idx : u_idx } = userData
    const APIKey = uuid().split('-').join('')



    const sql = `INSERT INTO application(
                                        u_idx, name, APIKey, host, redirectURI, usePoint
                                    ) VALUE (
                                        ${u_idx},'${name}','${APIKey}','${host}','${redirectURI}',1
                                    )`
    await pool.execute(sql)

    




    res.json({a:393949394})
}

module.exports = { addApp }