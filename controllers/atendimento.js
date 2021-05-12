const Atendimento = require('../models/atendimentos')

module.exports = app =>{
    //app.get('/atendimentos', (req, res) => res.send('Atendimento PET'))
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) =>{
        
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id, res)
       //res.send('OK')
    })

    app.post('/atendimentos', (req, res) => {
        //console.log(req.body)
        const atendimento = req.body

        Atendimento.adiciona(atendimento,res)
        //res.send('Rota POST de atendimento')
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.alterar(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deletar(id, res)
    })

}


