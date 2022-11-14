const { v4 : uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const { pool } = require('../db.js');

const addApp = async (req,res) => {
    const { appName : name, appDesc, appLogo, appHost : host, appRedirectUri : redirectURI, userData } = req.body

    const { idx : u_idx } = userData
    const APIKey = uuid().split('-').join('')

    try {
        const applicationSql = `INSERT INTO application( u_idx, name, APIKey, host, redirectURI, usePoint )
                                VALUE ( ${u_idx},'${name}','${APIKey}','${host}','${redirectURI}',1 )`
        await pool.execute(applicationSql)

        const viewAppSql = `SELECt * FROM application WHERE APIKey='${APIKey}'`
        const [[ result ]] = await pool.execute(viewAppSql)
        const { idx : a_idx } = result

        const appDescSql = `INSERT INTO appDesc( a_idx, description ) VALUE ( ${a_idx}, '${appDesc}' )`
        
        await pool.execute(appDescSql)

        const appImgSql = `INSERT INTO appImg( a_idx, imgUrl ) VALUE ( ${a_idx}, '${appLogo}' )`

        await pool.execute(appImgSql)

        res.json({addApp:true})
        
    } catch(e){
        console.log(e)
        res.json({addApp:false})
    }

    
}

const viewAppList = async (req,res) => {
    const { idx : u_idx } = req.body
    const sql = `SELECT * FROM application
                    LEFT JOIN appImg
                    ON application.idx = appImg.a_idx
                    LEFT JOIN appDesc
                    ON application.idx = appDesc.a_idx
                    WHERE application.u_idx=${u_idx}
                `
    const [ result ] = await pool.execute(sql)
    res.json({ appList : result })
}

const viewAppInfo = async (req,res) => {
    const { APIKey } = req.body

    try {
        const sql = `SELECT * FROM application
                        LEFT JOIN appImg
                        ON application.idx = appImg.a_idx
                        LEFT JOIN appDesc
                        ON application.idx = appDesc.a_idx
                        WHERE application.APIKey='${APIKey}'
                    `
        const [[ result ]] = await pool.execute(sql)
        res.json({ viewAppInfo : true, result })
        
    } catch(e) {
        console.log(e)
        res.json({ viewAppInfo :false })
        
    }
}

const deleteApp = async (req,res) => {
    const { a_idx, APIKey, } = req.body

    try {
        const deleteApplicationSql = `
                    DELETE FROM application
                    WHERE APIKey='${APIKey}'
                `
        await pool.execute(deleteApplicationSql)

        const deleteAppImgSql = `
                            DELETE FROM appImg
                            WHERE a_idx=${a_idx}
                        `
        await pool.execute(deleteAppImgSql)

        const deleteAppDescSql = `
                            DELETE FROM appDesc
                            WHERE a_idx=${a_idx}
                        `
        await pool.execute(deleteAppDescSql)

        res.json({delete:true})

    } catch(e){
        console.log(e)
        res.json({delete:false})
    }
}

module.exports = { addApp, viewAppList, viewAppInfo, deleteApp }