import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PostCreateForm(props) {
  const initialFormData = Object.freeze({
    title: "Title",
    category: "Category",
    body: "Body text text text text",
    image: "Image link",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postToCreate = {
      postId: 0,
      title: formData.title,
      category: formData.category,
      body: formData.body,
      image: formData.image,
    };

    const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPostCreated(postToCreate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Create new post</h1>

      <div className="mt-5">
        <label className="h3 form-label">Title</label>
        <input
          placeholder="Title"
          value={FormData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Category</label>
        
        <input
          placeholder="Category"
          value={FormData.category}
          name="category"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Body</label>
        <textarea
          rows={7}
          placeholder="Content"
          value={FormData.body}
          name="body"
          type="text"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mt-2">
        <label className="h3 form-label">Image</label>
        <input
          placeholder="Img"
          value={FormData.image}
          name="image"
          type="file"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Save post (Submit)
      </button>
      <button
        onClick={() => props.onPostCreated(null)}
        className="btn btn-dark btn-lg w-100 mt-2"
      >
        Cancel
      </button>
    </form>
  );
}