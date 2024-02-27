// frontend/components/NewBlogForm.js
import React from 'react';

const NewBlogForm = ({ onSubmit }) => {
  const title = '';
  const author = '';
  const content = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, content });
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-md p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border rounded-md p-2 mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-md p-2 mb-2"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default NewBlogForm;
