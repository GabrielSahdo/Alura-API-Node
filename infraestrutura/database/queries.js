const conexao = require("./conexao");

const executaQuery = (query, parametros = "") => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (err, results, campos) => {
            err ? reject(err) : resolve(results);
        });
    });
};

module.exports = executaQuery;
