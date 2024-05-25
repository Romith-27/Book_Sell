import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Edit = ({details}) => {
  const [formData, setFormData] = useState(details);
    const navigate = useNavigate();
  console.log(details);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/v1/book/editBook/${formData._id}`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/home");
        toast.success("Book Updated Successfully", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log("Error while updating the book", err.message);
        toast.error("Error while updating the book");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        maxWidth: "50vw",
        zIndex: "1000",
        position: "absolute",
        left: "50",
        right: "50",
        top,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <img
          src={formData.imageUrl}
          alt="Book"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>

      <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", marginBottom: "15px" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <label style={{ fontWeight: "bold" }}>Book Name:</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold" }}>Publication Year:</label>
              <input
                type="text"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </div>

          <label style={{ fontWeight: "bold" }}>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            style={{ marginBottom: "15px", padding: "8px" }}
          />

          <label style={{ fontWeight: "bold" }}>Availability:</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            style={{ marginBottom: "15px", padding: "8px" }}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

          <label style={{ fontWeight: "bold" }}>Available Copies:</label>
          <input
            type="number"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleInputChange}
            style={{ marginBottom: "15px", padding: "8px" }}
          />

          <label style={{ fontWeight: "bold" }}>Book Description:</label>
          <textarea
            name="bookDescription"
            value={formData.bookDescription}
            onChange={handleInputChange}
            rows="6"
            style={{
              marginBottom: "15px",
              padding: "8px",
              resize: "vertical",
              width: "100%",
            }}
          />

          <label style={{ fontWeight: "bold" }}>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.bookPhoto}
            onChange={handleInputChange}
            style={{ marginBottom: "15px", padding: "8px" }}
          />

          {/* Add other form fields as needed */}

          <input
            type="submit"
            className="h-10 rounded-lg"
            value="Submit"
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Edit;
