const express = require('express');
const Book = require('../models/Book'); // Modèle de livre
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware de vérification du token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token non fourni' });

    const bearerToken = token.split(' ');
    if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
        return res.status(400).json({ message: 'Format du token incorrect' });
    }

    jwt.verify(bearerToken[1], 'votre_clé_secrète', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token invalide', error: err.message });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Route POST : Ajouter un livre (réservée aux admins)
router.post('/', verifyToken, async (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit. Rôle admin requis.' });
    }
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l’ajout du livre' });
    }
});

// Route GET : Récupérer tous les livres ou par titre
router.get('/', async (req, res) => {
    const { title } = req.query;
    try {
        const query = title ? { title: { $regex: title, $options: 'i' } } : {};
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des livres' });
    }
});

// Route DELETE : Supprimer un livre (réservée aux admins)
router.delete('/:id', verifyToken, async (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit. Rôle admin requis.' });
    }
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.status(200).json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du livre' });
    }
});

module.exports = router;
