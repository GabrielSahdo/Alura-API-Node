const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/database/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");

conexao.connect((err) => {
    if (err) return console.log(err);

    console.log("\nConnected.....\n");

    Tabelas.init(conexao);

    const app = customExpress();

    app.listen(3000, () => {
        console.log("\nListening port 3000\n");
    });
});
