const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Aucun token fourni.');

    jwt.verify(token, 'votre_clé_secrète', (err, decoded) => {
        if (err) return res.status(500).send('Erreur de token.');
        req.userId = decoded.id;
        req.userRole = decoded.role; 
        next();
    });
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Nom d’utilisateur ou mot de passe incorrect' });

        
        const token = jwt.sign({ id: user._id, role: user.role }, 'votre_clé_secrète', { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription. Vérifiez si le nom d’utilisateur existe déjà.' });
    }
});


router.get('/protected', verifyToken, (req, res) => {
    if (req.userRole !== 'admin') {
        return res.status(403).send('Accès interdit pour les administrateurs');
    }
    res.status(200).send('Accès autorisé');
});

module.exports = router;
