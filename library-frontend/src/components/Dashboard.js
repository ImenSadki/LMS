import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

const Dashboard = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/books');
                setBooks(res.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des livres:', err);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary">Tableau de bord</h2>
            <Link to="/add-book" className="btn btn-success mb-4">Ajouter un livre</Link>
            <h3 className="text-secondary">Liste des livres</h3>
            <div className="row">
                {books.map(book => (
                    <div className="col-md-4 mb-4" key={book._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text"><strong>Auteur:</strong> {book.author}</p>
                                <p className="card-text"><strong>Description:</strong> {book.description}</p>
                                <p className="card-text"><strong>Prix:</strong> ${book.price}</p>
                                <Link to={`/book/${book._id}`} className="btn btn-primary">Détails</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
