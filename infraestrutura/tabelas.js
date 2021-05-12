class Tabelas{
    init(conexao){
        console.log('Entrando na criação/acesso de tabelas...')
        this.conexao = conexao

        this.criarAtendimento()
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL,data datetime NOT NULL, datacriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => { 
            if(erro){
                console.log(erro)
            }else{
                console.log('Acesso a Tabela Atendimentos criada com sucesso !!!!')
            }
        })
    }
} 

module.exports = new Tabelas