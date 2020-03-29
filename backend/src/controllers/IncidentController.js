const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        // Busca de dentro do request.query (query params) o parametro page.
        const { page = 1 } = request.query;

        // Busca o TOTAL de registro incidents
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) // limita somente 5 incidents
        .offset((page - 1) * 5) // calculo para mostrar 5 paginas
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        // Retorna o total de pagina no Header na requisição
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // Desistruturação: pega somente o 'id' gerado e passa para o return
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id }); 
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não permitida.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};