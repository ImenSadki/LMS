const express = require('express');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const router = express.Router();


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token non fourni');

 
    const bearerToken = token.split(' ');
    if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
        return res.status(400).send('Format du token incorrect');
    }

    jwt.verify(bearerToken[1], 'secret', (err, decoded) => {
        if (err) return res.status(500).send('Token invalide');
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};


router.post('/', verifyToken, async (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).send('Accès interdit');
    }

    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du livre:', error);
        res.status(500).send('Erreur serveur lors de l\'ajout du livre');
    }
});


router.get('/', async (req, res) => {
    const { title } = req.query; 

    try {
        const query = title ? { title: { $regex: title, $options: 'i' } } : {}; 
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        console.error('Erreur lors de la récupération des livres:', error);
        res.status(500).send('Erreur lors de la récupération des livres');
    }
});

module.exports = router;
