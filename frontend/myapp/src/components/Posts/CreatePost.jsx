import { useState } from "react";
import { postAPI } from "../../api";

const CreatePost = ({ setPosts }) => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await postAPI.createPost(postData);
      setPosts((prev) => [response.data, ...prev]);
      setPostData({ title: "", content: "" });
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="centered-page">
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
