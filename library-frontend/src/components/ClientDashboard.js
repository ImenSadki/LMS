import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Input } from 'reactstrap';

const ClientDashboard = () => {
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get('http://localhost:5000/api/books', {
                params: { title: searchTitle, author: searchAuthor } 
            });
            setBooks(res.data);
        };
        fetchBooks();
    }, [searchTitle, searchAuthor]); 

    return (
        <div className="container mt-5">
            <h2 className="text-center">Livres Disponibles</h2>
            <Input
                type="text"
                placeholder="Rechercher par titre"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="mb-3"
            />
            <Input
                type="text"
                placeholder="Rechercher par auteur"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                className="mb-3"
            />
            <h3 className="mt-4">Liste des livres</h3>
            <div className="row">
                {books.map(book => (
                    <div className="col-md-4 mb-4" key={book._id}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{book.title}</CardTitle>
                                <CardText>Auteur: {book.author}</CardText>
                                <CardText>Description: {book.description}</CardText>
                                <CardText>Prix: ${book.price}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientDashboard;
