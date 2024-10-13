import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [alert, setAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem('token');
        console.log('Token récupéré:', token);

        try {
            const response = await axios.post('http://localhost:5000/api/books',
                { title, author, description, price },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Réponse du serveur:', response.data);
            
            setAlert({ type: 'success', message: 'Livre ajouté avec succès !' });
            setTitle('');
            setAuthor('');
            setDescription('');
            setPrice('');
        } catch (error) {
            console.error('Erreur lors de la requête:', error.response?.data || error.message);
            
            setAlert({ type: 'danger', message: 'Erreur lors de l\'ajout du livre.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Ajouter un livre</h2>
            {alert && (
                <div className={`alert alert-${alert.type} mt-4`} role="alert">
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                    {isLoading ? 'Ajout en cours...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;