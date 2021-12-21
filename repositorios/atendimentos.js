const conexao = require("../infraestrutura/database/conexao");
const query = require("../infraestrutura/database/queries");

class Atendimento {
    adiciona(atendimento) {
        const sql = "INSERT INTO Atendimentos SET ?";
        return query(sql, atendimento);
    }

    lista() {
        const sql = "SELECT * FROM Atendimentos";
        return query(sql);
    }

    getById(id) {
        const sql = "SELECT * FROM Atendimentos where id = ?";
        return query(sql, id);
    }

    altera(id, valores) {
        const sql = "UPDATE Atendimentos SET ? where id=?";
        return query(sql, [valores, id]);
    }

    delete(id) {
        const sql = "DELETE from Atendimentos where id=?";
        return query(sql, id);
    }
}

module.exports = new Atendimento();
