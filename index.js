const express = require("express");
const cors = require("cors");
const jsonSql = require('json-sql')();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
jsonSql.setDialect('postgresql');

app.get('/', async (req, res) => {
    return res.json({
        status: "working"
    });
});

app.post('/select', async (req, res) => {
    const sql = jsonSql.build({
        type: 'select',
        ...req.body.query,
    });
    return res.json({
        query: sql.query,
        hash: sql.values
    });
});

app.listen(3000);
console.log("listening on 3000");