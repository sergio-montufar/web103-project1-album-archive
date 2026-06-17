// Load environment variables first, then the pool (which reads process.env).
import './dotenv.js';
import { pool } from './database.js';
import { albums } from '../data/albums.js';

const createAlbumsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS albums;

        CREATE TABLE IF NOT EXISTS albums (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            year INTEGER NOT NULL,
            genre VARCHAR(255) NOT NULL,
            tracks TEXT[] NOT NULL
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 albums table created successfully');
    } catch (err) {
        console.error('⚠️ error creating albums table', err);
    }
};

const seedAlbumsTable = async () => {
    await createAlbumsTable();

    for (const album of albums) {
        const insertQuery = {
            text: 'INSERT INTO albums (slug, title, artist, year, genre, tracks) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [
                album.slug,
                album.title,
                album.artist,
                album.year,
                album.genre,
                album.tracks,
            ],
        };

        try {
            await pool.query(insertQuery);
            console.log(`✅ ${album.title} added successfully`);
        } catch (err) {
            console.error(`⚠️ error inserting ${album.title}`, err);
        }
    }

    // Close the pool so the script exits once seeding is done.
    await pool.end();
};

seedAlbumsTable();
