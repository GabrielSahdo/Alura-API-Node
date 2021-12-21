const axios = require("axios");
const moment = require("moment");
const conexao = require("../infraestrutura/database/conexao");
const repositorio = require("../repositorios/atendimentos");

class Atendimento {
    constructor() {
        this.dateIsValid = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao);

        this.clientIsValid = ({ tamanho }) => tamanho >= 5;

        this.validate = (parameters) =>
            this.validacoes.filter((campo) => {
                const { nome } = campo;
                const parameter = parameters[nome];

                return !campo.valido(parameter);
            });

        this.validacoes = [
            {
                nome: "data",
                valido: this.dateIsValid,
                mensagem: "Data deve ser maior ou igual a data atual",
            },
            {
                nome: "cliente",
                valido: this.clientIsValid,
                mensagem: "Nome do cliente deve conter pelo menos 5 caracteres",
            },
        ];
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
        const data = moment(atendimento.data, "DD/MM/YYYY").format(
            "YYYY-MM-DD HH:mm:ss"
        );

        const parameters = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length },
        };

        const erros = this.validate(parameters);

        if (erros.length > 0)
            return new Promise((resolve, reject) => reject(erros));

        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        return repositorio.adiciona(atendimentoDatado).then((resultados) => {
            const id = resultados.insertId;
            const oi = { ...atendimento, id };
            return { ...atendimento, id };
        });
    }

    lista() {
        return repositorio.lista();
    }

    getById(id, res) {
        return repositorio.getById(id).then(async (resultado) => {
            const atendimento = resultado[0];
            const cpf = atendimento.cliente;

            const { data } = await axios.get(`http://localhost:8082/${cpf}`);
            atendimento.cliente = data;

            return atendimento;
        });
    }

    altera(id, valores) {
        if (valores.data) {
            valores.data = moment(valores.data, "DD/MM/YYYY").format(
                "YYYY/MM/DD HH:mm:ss"
            );
        }

        return repositorio.altera(id, valores).then((resultado) => {
            return { ...valores, id };
        });
    }

    delete(id) {
        return repositorio.delete(id).then((result) => {
            return { id: id };
        });
    }
}

module.exports = new Atendimento();
