const crypto = require('crypto');
const connection = require('../database/connection');

// todos os métodos do CRUD
module.exports = {
    // LIST
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    // CREATE
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        // console.log(uf);
        const id = crypto.randomBytes(4).toString('HEX');
    
        // await aguarda até finalizar o insert
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
    }
};