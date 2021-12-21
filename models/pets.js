const connection = require("../infraestrutura/database/conexao");
const uploadDeArquivo = require("../infraestrutura/arquivos/uploadDeArquivos");

class Pet {
    adiciona(pet, res) {
        const query = "INSERT INTO Pets SET ?";

        uploadDeArquivo(pet.imagem, pet.nome, (err, novoCaminho) => {
            if (err) return res.status(400).json({err});

            const novoPet = { nome: pet.nome, imagem: novoCaminho };

            connection.query(query, novoPet, (error) => {
                if (error) return res.status(400).json(error);

                return res.status(201).json(novoPet);
            });
        });
    }
}

module.exports = new Pet();
