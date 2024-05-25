import React from 'react';
import Navbar from './Navbar';
import Book from './Book';
import { NavLink } from 'react-router-dom';
import FilteredBooks from './FilteredBooks';
const Home = () => {
    const [filteredBooks, setFilteredBooks] = React.useState([]);

    return (
        <React.Fragment>
            <Navbar setFilteredBooks={setFilteredBooks} />
            <FilteredBooks filteredBooks={filteredBooks} />
        </React.Fragment>

    );
};

export default Home;
