import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/livro', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {titulo, autor, npaginas } = request.body
    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas
    })
    //console.log(database.list())
    return reply.status(201).send()
})

server.get('/livro', (request) => {
    //pegando a busca
    const search = request.query.search
    //imprimindo a busca
    //console.log(search)
    //acessando database
    const livro = database.list(search)
    //console.log(livros)
    //retomando livros
    return livro
})

server.put('/livro/:id', (request, reply) =>{

    const livroId = request.params.id
    const {titulo, autor, npaginas} = request.body
    const livro = database.update(livroId, {
        titulo,
        autor,
        npaginas
    })
    return reply.status(204).send()
})

server.delete('/livro/:id', (request, reply) => {
    //passando o Id do livro
    const livroId = request.params.id
    //deletando livro
    database.delete(livroId)
    //retomando status de sucesso em branco
    return reply.status(204).send()
})

server.listen({
    port: 3333,
})