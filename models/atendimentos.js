const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const atendimentoDataCriacao = {...atendimento, dataCriacao, data}
        
        //validação
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeEhValido = atendimento.cliente.length >= 5
        
        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual!!!'
            },
            {
                nome: 'cliente',
                valido: nomeEhValido,
                mensagem: 'Nome do cliente precisa ter mais de 5 letras'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        
        if(existemErros){
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO Atendimentos SET ?'
            
            conexao.query(sql, atendimentoDataCriacao, (erro, resultados) => {
                if(erro){
                    //console.log(erro)
                    res.status(400).json(erro)
                }else{
                    //console.log(resultados)
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}` //cuidado aqui é ` e não '

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(atendimento)
            }
        })
    }

    alterar(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
       const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

       conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
            
       })
    }

    deletar(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                //res.status(201).json(resultados)
                res.status(201).json({id})
            }
        })
    }
}

module.exports = new Atendimento