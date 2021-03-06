// Controller responsável por retornar perfil de uma ONG.
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // Pega os dados da ong logada.
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}