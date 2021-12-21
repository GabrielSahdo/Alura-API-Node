const fs = require("fs");
const path = require("path");

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const validTypes = ["jpeg", "png", "jpg"];
    const tipo = path.extname(caminho);

    if (validTypes.indexOf(tipo.substring(1)) === -1) {
        const err = "Invalid Type";
        callbackImagemCriada(err);
        return console.log("tipo invalido");
    }

    const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;

    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on("finish", () => callbackImagemCriada(false, novoCaminho));
};
