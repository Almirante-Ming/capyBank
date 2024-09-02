// Biblioteca principal
const http = require('http')

const { createTable, readColumn } = require('./database/db')
const { getBody } = require('./scripts/getBody')
const { getResponse } = require("./scripts/getResponse")

// Variável global que vai receber, ao longo da execução do código, uma arrow function que conterá
// a chave primária do usuário na tabela principal, nesse caso, foi alterado para CPF ao invés de ID.

let fetchID

// Server: irá receber os dados do front-end e tratar as requisiões realizadas pela fetch API.
const server = http.createServer( async (req, res) => {

    if (req.url.includes('Data')) {

        let body = await getBody(req).catch((err) => console.log(err)) 
        let data = JSON.parse(body)
        
        let response = getResponse()

        // Cadastro inicial
        if (req.url == '/saveData') {
            response.saveData(data, res)
        }
        
        // Login
        else if (req.url == '/validateData') {
            const id = await response.validateData(data, res)
            fetchID = () =>  { return id }  
        }

        // Atualização de dado
        else if (req.url == '/updateData') {
            response.updateData(data, res, fetchID)
        }

        // Envio de dado (transferência, enviar email..)
        else if (req.url == '/sendData') {
            response.sendData(data, res, fetchID)
        }
 
    }

    // Bloco desbloqueado pós-autenticação
    if (typeof(fetchID) == 'function' && (req.url.includes('api'))) {
        // Os tratamentos abaixo possuem um único objetivo:
            // -> Extrair dados do banco, enviá-los para o servidor em formato JSON. 
            // -> Esses dados são capturados pela fetch API (visto no script Cliente.JS) e renderizados na DOM do projeto (home.js, meu-perfil.js...) .

        let id = fetchID() 
        let query 

        if (req.url == '/api/user') {
            query = `SELECT * FROM dados_clientes where cpf = '${id}'`;
        }

        else if (req.url == '/api/transferencia') {
            query = `SELECT * FROM transferencia WHERE cpf_envia = '${id}' OR cpf_recebe = '${id}'`;
        }

        else if (req.url == '/api/conta') {
            query = `SELECT * FROM conta WHERE cpf = '${id}'`;
        }
        const database = await readColumn(query)
        const userData = database.rows

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        res.end(JSON.stringify(userData))

    }
    

})

createTable().then(isConnected => {

    if (!isConnected) {
        console.log('Não foi possível conectar ao banco de dados. O servidor não será iniciado. Certifique se as credenciais estão corretas.')
        return
    }

    console.log('Conexão com o banco de dados estabelecida. Tabela dados_clientes criada. Iniciando o servidor...');
    server.listen(8080, 'localhost', () => {
        console.log('Servidor rodando na porta 8080')
    })

})