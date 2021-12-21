class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        this.dropTable("Atendimentos");

        const sql =
            "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";

        this.conexao.query(sql, (err) => {
            if (err) return console.log(err);

            console.log("- Atendimentos (OK)");
        });
    }

    criarPets() {
        this.dropTable("Pets");

        const sql =
            "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))";

        this.conexao.query(sql, (err) => {
            if (err) return console.log(err);

            console.log("- Pets (OK)");
        });
    }

    dropTable(table_name) {
        const sql = `DROP TABLE IF EXISTS ${table_name}`;

        this.conexao.query(sql, (err) => {
            if (err) return console.log(err);

            console.log(`-${table_name} (cleaning...)`);
        });
    }
}

module.exports = new Tabelas();
