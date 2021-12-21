const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
    app.get("/atendimentos", (req, res) => {
        Atendimento.lista()
            .then((resultados) => res.status(200).json(resultados))
            .catch((err) => res.status(400).json(err));
    });

    app.get("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.getById(id)
            .then((resultado) => res.status(200).json(resultado))
            .catch((err) => res.status(400).json(err));
    });

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento)
            .then((response) => res.status(201).json(response))
            .catch((err) => res.status(400).json(err));
    });

    app.patch("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores)
            .then((resultado) => res.status(200).json(resultado))
            .catch((err) => res.status(400).json(err));
    });

    app.delete("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.delete(id)
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(400).json(err));
    });
};
