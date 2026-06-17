import { pool } from '../config/database.js';

const getAlbums = async (req, res) => {
    try {
        // Optional ?search= filters by title, artist, or genre (case-insensitive).
        const { search } = req.query;
        let results;
        if (search) {
            const term = `%${search}%`;
            results = await pool.query(
                'SELECT * FROM albums WHERE title ILIKE $1 OR artist ILIKE $1 OR genre ILIKE $1 ORDER BY id ASC',
                [term]
            );
        } else {
            results = await pool.query('SELECT * FROM albums ORDER BY id ASC');
        }
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

export default {
    getAlbums
}