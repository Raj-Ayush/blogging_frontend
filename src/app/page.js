// frontend/pages/index.js
import Link from 'next/link';
import NewBlogForm from './newblogform/page';

async function getData() {
  const res = await fetch('/api/blogs')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


const HomePage = async ({ initialBlogs }) => {
  const blogs = await getData(); // Use provided initial data


  // Assuming a Client Component approach (Approach A):
const handleNewBlogSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form data
  const title = event.target.title.value;
  const content = event.target.content.value;

  try {
    // Send a POST request to the backend API to create a new blog
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json(); // Assuming the API returns the new blog data

    // Handle any potential errors
    if (!response.ok) {
      throw new Error(`Error creating blog: ${response.statusText}`);
    }

    // Update the blogs state with the newly created blog
    setBlogs([...blogs, data]);

    // Optionally, clear form fields after submission
    event.target.title.value = '';
    event.target.content.value = '';

    // Provide user feedback on successful submission
    console.log('Blog created successfully!');
  } catch (error) {
    console.error('Error creating blog:', error);
    // Display an error message to the user
  }
};


  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <NewBlogForm onSubmit={handleNewBlogSubmit} />
      <div className="mt-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="mb-4">
            <Link href={`/blog/${blog.id}`}>
              <a className="text-xl font-semibold">{blog.title}</a>
            </Link>
            <p className="text-gray-600">By {blog.author}</p>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
