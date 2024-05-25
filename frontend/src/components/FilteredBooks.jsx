import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FilteredBooks = ({ filteredBooks }) => {
    const navigate = useNavigate()
    const [expandedDescriptionIndex, setExpandedDescriptionIndex] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1)
    const booksPerPage = 12;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleReadMoreClick = (index) => {
        navigate(`/book/${index}`)
    };
    return (
        <React.Fragment>
            <div className='grid gap-8 md:grid-cols-3'>
                {currentBooks?.length === 0 ? (
                    <p>No books available</p>
                ) : (
                    currentBooks?.map((book) => (
                        <div className="max-w-6xl grid mx-auto h-screen" key={book._id}>
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="max-w-sm w-full py-6 px-3">
                                    <img src={book.bookPhoto} width={200} alt={book.bookName} className='m-4' />
                                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                                        <div className="flex justify-end"></div>
                                    </div>
                                    <div className="p-4">
                                        <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
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
                                        </p>
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
                                    <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <NavLink to={`/book/${book._id}`}>
                                            Reserve Book
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))
                )}
            </div >
            <div className="flex justify-center mt-4">
                {filteredBooks.length > booksPerPage && (
                    <ul className="inline-flex -space-x-px text-sm mb-4">
                        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
                            <li key={index} className={`pagination-button${currentPage === index + 1 ? '-active' : ''}`} >
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`pagination-button1${currentPage === index + 1 ? '-active' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </React.Fragment >

    );
};

export default FilteredBooks;
