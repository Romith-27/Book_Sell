import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
    const [books, setBooks] = React.useState([]);
    const booksPerPage = 6;
    var currentPage = 1
    var dataFetched = false;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    React.useEffect(() => {
        if (!dataFetched) {
            fetchBooks();

        }
    }, [dataFetched]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/book/getAllBooks');
            setBooks(response.data.books)
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    const navigate = useNavigate()
    const [expandedDescriptionIndex, setExpandedDescriptionIndex] = React.useState(null);
    const handleReadMoreClick = (index) => {
        navigate(`/book/${index}`)
    };
    return (
        <React.Fragment>
            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                {currentBooks?.length === 0 ? (
                    <p>No books available</p>
                ) : (
                    currentBooks?.map((book) => (
                        <div className="max-w-6xl mx-auto h-screen" key={book._id}>
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="max-w-sm w-full py-6 px-3">
                                    <img src={book.bookPhoto} width={200} alt={book.bookName} className='m-4' />
                                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                                        <div className="flex justify-end"></div>
                                    </div>
                                    <div className="p-4">
                                        <div className="uppercase tracking-wide text-sm font-bold text-gray-700">
                                            <p className="text-3xl text-gray-900">
                                                <NavLink to={`/book/${book._id}`}>
                                                    {
                                                        book.bookName.length > 30 ? (
                                                            <>
                                                                <p className="text-gray-700">
                                                                    {expandedDescriptionIndex === book._id
                                                                        ? book.bookName
                                                                        : `${book.bookName.substring(0, 30)}...`}
                                                                </p>
                                                                {expandedDescriptionIndex !== book._id && (
                                                                    <button
                                                                        onClick={() => handleReadMoreClick(book._id)}
                                                                        className="hidden"
                                                                    >
                                                                    </button>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {book.bookName}
                                                            </>
                                                        )
                                                    }
                                                </NavLink>
                                            </p>
                                            {book.author} • {book.publicationYear}
                                        </div>
                                        {book.bookDescription.length > 50 ? (
                                            <>
                                                <p className="text-gray-700">
                                                    {expandedDescriptionIndex === book._id
                                                        ? book.bookDescription
                                                        : `${book.bookDescription.substring(0, 30)}...`}
                                                </p>
                                                {expandedDescriptionIndex !== book._id && (
                                                    <button
                                                        onClick={() => handleReadMoreClick(book._id)}
                                                        className="text-blue-600 hover:underline mt-0 mb-0 p-0"
                                                    >
                                                        Read More
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-gray-700 mb-4">{book.bookDescription}</p>
                                        )}
                                    </div>
                                    <div className="flex p-4 justify-between border-t border-gray-300 text-gray-700">
                                        <div className="flex-1 inline-flex items-center justify-between whitespace-nowrap" >
                                            <p>
                                                <span className="text-gray-900 font-bold">
                                                    {book.availableCopies}
                                                </span>{" "}
                                                Available Copies
                                            </p>
                                        </div>
                                        <div className="flex-1 inline-flex items-center justify-end">
                                            <p>
                                                <span className="text-gray-900 font-bold">
                                                    {book.category}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <NavLink to={`/book/${book._id}`}>
                                        <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Reserve Book
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    ))
                )}
            </div >
        </React.Fragment>

    );
};

export default Book;
