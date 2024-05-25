const mongoose = require('mongoose')
const User = require('../models/user.js')
const ReservedBook = require('../models/reservedBooks.js')
const Book = require('../models/book.js')

exports.reserveBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { noOfCopies } = req.body;

        if (!noOfCopies || noOfCopies <= 0) {
            return res.status(403).json({
                message: "Invalid number of copies",
                success: false
            });
        }

        const bookDetails = await Book.findById(bookId);
        if (!bookDetails) {
            return res.status(400).json({
                message: "Book details not found",
                success: false
            });
        }

        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found with given id',
                success: false
            });
        }

        const existingReservedBook = await ReservedBook.findOne({
            userId: id,
            bookId: bookId
        });

        if (existingReservedBook) {
            const newNoOfCopies = parseInt(noOfCopies);
            existingReservedBook.noOfCopies += newNoOfCopies;
            await existingReservedBook.save();
        } else {
            const reservedBook = await ReservedBook.create({
                book: bookDetails.bookName,
                noOfCopies,
                bookPhoto: bookDetails.bookPhoto,
                bookDescription: bookDetails.bookDescription,
                author: bookDetails.author,
                category: bookDetails.category,
                publicationYear: bookDetails.publicationYear,
                userId: id,
                bookId: bookId
            });

            user.reservedBooks.push(reservedBook._id);
            await user.save();
        }

        const updatedBookCopies = bookDetails.availableCopies - noOfCopies;
        await Book.findByIdAndUpdate(bookId, {
            $set: {
                availableCopies: updatedBookCopies
            }
        });

        return res.status(200).json({
            message: 'Updated user reserved books successfully',
            success: true,
            updatedUser: user
        });

    } catch (error) {
        console.log('/reserveBook', error);
        return res.status(500).json({
            message: 'Something went wrong while reserving book',
            success: false
        });
    }
};

exports.editBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { noOfCopies } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const reservedBook = await ReservedBook.findById(id);
        if (!reservedBook) {
            return res.status(404).json({
                message: 'Reserved Book not found',
                success: false
            })
        }

        if (!noOfCopies) {
            return res.status(404).json({
                message: 'Number of Copies not specified',
                success: false
            })
        }

        const updatedBook = await ReservedBook.findByIdAndUpdate({ _id: id }, { noOfCopies: noOfCopies }, { new: true })

        return res.status(200).json({
            message: 'Updated book details successfully',
            success: true,
            book: updatedBook
        })
    } catch (error) {
        console.log('/editBook', error);
        return res.status(500).json({
            message: 'Something went wrong while editing book details',
            success: false
        })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const bookDetails = await ReservedBook.findById(bookId);
        if (!bookDetails) {
            return res.status(404).json({
                message: 'Book Details not found',
                success: false
            })
        }
        const { id } = req.user;

        const userDetails = await User.findById(id);

        await User.findByIdAndUpdate({ _id: id }, {
            $pull: {
                reservedBooks: bookDetails._id
            }
        }, { new: true })

        await Book.findByIdAndRemove(id);

        return res.status(200).json({
            message: 'Successfully Removed book from Reserved Books',
            success: false,
            user: userDetails
        })

    } catch (error) {
        console.log('/deleteReservedBook', error.message)
    }
}

exports.getAllBooks = async (req, res) => {
    try {

        const { id } = req.params;
        const reservedBooks = await ReservedBook.find({ userId: id });
        if (!reservedBooks || reservedBooks.length === 0) {
            return res.status(404).json({
                message: 'No reserved books found for the user',
                success: false
            });
        }
        return res.status(200).json({
            message: 'Successfully fetched reserved books',
            success: true,
            reservedBooks
        });

    } catch (error) {
        console.error('/getAllBooks', error.message);
        return res.status(500).json({
            message: 'Something went wrong while fetching reserved books',
            success: false
        });
    }
};
