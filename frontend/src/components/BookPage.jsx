import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Book from './Book';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edit from './EditPage';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
const BookPage = () => {
    const { id } = useParams()
    const [accountType, setAccountType] = useState("User")
    const navigate = useNavigate();
    const [dataFetched, setDataFetched] = React.useState(false)
    const [editToggle, setEditToggle] = React.useState(false)
    const [availableCopies, setAvailableCopies] = React.useState(0)
    const [toggleReserve, setToggleReserve] = React.useState(false)

    const [book, setBook] = React.useState({})
    const token = sessionStorage.getItem('token');
    const fetchCardData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/book/getBook/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setBook(response.data.book);
            setDataFetched(true);
        } catch (error) {
            console.error('Error while fetching the book', error.message);
            toast.error('Error while fetching the data');
        }
    };
    const toggleEdit = () => {
        setEditToggle(!editToggle);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/book/deleteBook/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
            );
            navigate('/home');
            toast.success('Book Deleted Successfully', {
                autoClose: 3000,
                hideProgressBar: true
            });
        } catch (error) {
            console.log('Error while deleting the book', error.message);
            toast.error('Error while deleting the book');
        }
    };

    const handleReserveBook = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/v1/reservedBooks/dd/${id}`, {
                noOfCopies: availableCopies
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            toast.success(`Book ${book.bookName} has been reserved`)
            setAvailableCopies(0)
            setToggleReserve(false)
        } catch (err) {
            console.log("Error while reserving the book", err.message)

        }
    }

    React.useEffect(() => {
        if (!dataFetched) {
            fetchCardData();
        }
    }, [dataFetched, id]);

    React.useEffect(() => {
        if (sessionStorage.getItem('user')) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            console.log("This is the user", user);
            if (user.accountType === 'Admin') {
                setAccountType("Admin");
            } else {
                setAccountType("User");
            }
        }
    }, []);
    return (
        <React.Fragment>
            <Navbar />
            <div>{editToggle && <Edit details={book} />}</div>
            <div>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-full md:w-1/2 py-4'>
                        <img
                            src={book.bookPhoto}
                            width={350}
                            alt={book.bookName}
                            className='mx-auto max-w-full h-auto'
                        />
                    </div>
                    {toggleReserve ? (
                        <>
                            <div className="w-full lg:max-w-xl p-6 space-y-10 sm:p-8 bg-white rounded-lg shadow-xl">
                                <div className="text-2xl font-bold tex-gray-900 sm:w-[100%]">
                                    <h2>Reserve Book</h2>
                                </div>
                                <form
                                    method="POST"
                                    className="mt-8 space-y-6 "
                                    onSubmit={handleReserveBook}
                                >
                                    <div>
                                        <label
                                            htmlFor="bookDescription"
                                            className="block mb-1 text-sm font-medium text-medium dark:text-black select-text"
                                        >
                                            Book Name<span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            id="author"
                                            value={book.bookName}
                                            placeholder="Name of the Author"
                                            autoComplete="off"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-900 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 select-all"
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="availableCopies"
                                            className="block mb-2 text-sm font-medium text-medium select-all"
                                        >
                                            Number of Copies to Reserve
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="number"
                                                name="availableCopies"
                                                id="availableCopies"
                                                value={availableCopies}
                                                placeholder="Enter the number of copies"
                                                autoComplete="off"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-white dark:border-gray-600 dark:placeholder-gray-900 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 select-all"
                                                required
                                                onChange={(e) => setAvailableCopies(e.target.value)}
                                            />

                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-between h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                name="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                required
                                            />
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="remember"
                                                    className="font-medium text-black"
                                                >
                                                    Are you sure want to confirm ?
                                                </label>
                                            </div>
                                        </div>
                                        <button className="ml-3 text-sm flex hover:cursor-pointer hover:text-blue-600 hover:underline hover:fill-[blue]"
                                            onClick={() => {
                                                setToggleReserve(false)
                                            }}
                                        >
                                            <span className='hover:text-blue-500'>Go Back</span>
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-5 py-3 text-white font-semibold text-center  bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:w-[100%] lg:w-[100%]  transition duration-500 ease-in-out dark:bg-blue-500"
                                    >
                                        RESERVE BOOK
                                    </button>

                                </form>
                            </div>

                        </>
                    ) : (<>
                        <div className='w-full md:w-1/2'>
                            <div className="p-4">
                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                                    <p className="text-3xl text-gray-900 cursor-pointer">
                                        {book.bookName}
                                    </p>
                                    {book.author} • {book.publicationYear}
                                </p>
                                <p className="text-gray-700 mb-4">{book.bookDescription}</p>
                            </div>
                            {
                                accountType === 'Admin' && (
                                    <div className='flex text-gray-800 font-semibold justify-between mb-2 hover:fill-[#4CAF50] hover:text-[#4CAF50]'>
                                        <button className='flex items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
                                            Edit Book
                                        </button>
                                        <button className='flex items-center  text-red-600' onClick={handleDelete}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill='red' />
                                            </svg>
                                            Delete Book
                                        </button>
                                    </div>
                                )
                            }

                            <div className="flex p-4 border-t border-gray-300 text-gray-700">

                                {
                                    book.availability === false || book.availableCopies === 0 ? (
                                        <>
                                            <div className='flex-1 inline-flex items-center'>
                                                <p>
                                                    <span className='text-red-500 font-bold'>
                                                        OUT OF STOCK
                                                    </span>
                                                </p>
                                            </div>
                                        </>
                                    )
                                        :
                                        (<>
                                            <div className="flex-1 inline-flex items-center">
                                                <p className='font-semibold text-gray-700'>
                                                    <span className="text-gray-900 font-bold pr-2">
                                                        {book.availableCopies}
                                                    </span>
                                                    Available Copies
                                                </p>
                                            </div>
                                        </>
                                        )
                                }
                                <div className="flex-1 inline-flex items-center">
                                    <p>
                                        <span className="text-gray-900 font-bold">
                                            {book.category}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {
                                (book.availability === true || book.availableCopies === "0") && (
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setToggleReserve(true)}>
                                        Reserve Book
                                    </button>
                                )
                            }
                        </div>
                    </>)}

                </div>
                <div>
                    <p className="p-4 uppercase tracking-wide text-sm font-bold text-gray-700">
                        <p className="text-3xl text-gray-900 cursor-pointer">
                            Find Similar Books
                        </p>
                    </p>
                    <Book />
                </div>
            </div>
        </React.Fragment >
    );
};

export default BookPage;
