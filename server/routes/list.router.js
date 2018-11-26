const express = require('express');
const bodyParser = require('body-parser');
const listRouter = express.Router();
const pg = require('pg');


const Pool = pg.Pool;
const pool = new Pool({
    database: 'check_list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () =>{
    console.log('connect to DB');
    
});

pool.on('error', (error) =>{
    console.log('error connecting to db', error);
    
});

listRouter.get('/', (req,res)=>{
    console.log('in get route');
    let queryString = `SELECT * from  "list_items" ORDER BY "id" DESC`
    pool.query(queryString).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        res.sendStatus(500);
    })
})

listRouter.post('/', (req, res) =>{
    console.log('in POST Route');
    let toDO = req.body;
    let queryString = `INSERT INTO "list_items"("task", "description", "status" ) VALUES ($1, $2, $3)`
    pool.query(queryString, [toDO.task, toDO.description, toDO.status]).then(()=> {
        res.sendStatus(201);
    }).catch((err)=> {
        res.sendStatus(500);
    })
    
});

listRouter.delete('/:id', (req, res)=>{
    console.log('in delete route');
    let rowToDelete = req.params.id;
    console.log(rowToDelete);
    let queryString = `DELETE FROM "list_items" WHERE "id" = $1; `
    pool.query(queryString,[rowToDelete] ).then(() =>{
        res.sendStatus(201);
    }).catch((err) =>{
        res.sendStatus(500);
    })
    
    
})

module.exports = listRouter;