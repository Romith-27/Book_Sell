import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = React.useState({});
  const [reservedBooks, setReservedBooks] = React.useState([]);
  const [dataFetched, setDataFetched] = React.useState(false);

  React.useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const token = sessionStorage.getItem("token");

  const fetchReservedBooks = async () => {
    if (userData && userData._id && !dataFetched) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/reservedBooks/getAllReservedBooks/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservedBooks(response.data.reservedBooks);
        setDataFetched(true);
      } catch (error) {
        console.error("Error while fetching reserved books", error.message);
      }
    }
  };

  React.useEffect(() => {
    fetchReservedBooks();
  }, [userData, token, dataFetched]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/reservedBooks/deleteReserveBook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("This is the response on Delete", response)
    } catch (err) {
      console.error("Error while deleting the reserved book")
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md w-5/12 bg-white p-8 mt-10 shadow-md rounded-md inline-block">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">
          User Profile
        </h1>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Name:
          </label>
          <div className="text-gray-800 font-medium">
            {userData.firstName} {userData.lastName}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Email:
          </label>
          <div className="text-gray-800">{userData.email}</div>
        </div>
        <div>
          <label className="block text-gray-600 font-semibold mb-2">
            Account Type:
          </label>
          <div className="text-gray-800 capitalize">{userData.accountType}</div>
        </div>
      </div>
      <div className="reservedBooks inline-block w-6/12 h-3/4">
        <h1 className="text-3xl font-bold w-6/y text-center mt-6 mb-6 w-full text-indigo-700">
          Reserved Books
        </h1>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {reservedBooks?.length === 0 ? (
            <p>No books available</p>
          ) : (
            reservedBooks?.map((book) => (
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
                          <NavLink to={`/book/${book.bookId}`}>
                            {book.book}
                          </NavLink>
                        </p>
                        {book.author} • {book.publicationYear}
                      </div>
                      <p className="text-black font-semibold">
                        Reservation Date: {new Date(book.reservedDate).toLocaleDateString()}
                      </p>
                      <div className='flex text-gray-800 font-semibold justify-between mt-1'>
                        <button className='flex items-center  hover:fill-[red]' onClick={() => { console.log("Button clicked"), handleDelete(book._id) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex p-4 justify-between border-t border-gray-300 text-gray-700">
                      <div className="flex-1 inline-flex items-center justify-between whitespace-nowrap" >
                        <p className="text-sm font-semibold mr-10">
                          <span className="text-sm font-bold">
                            {book.noOfCopies}
                          </span>{" "}
                          Copies Reserved
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
                  </div>
                </div>
              </div>

            ))
          )}
        </div >
      </div >
    </>
  );
};

export default Profile;
