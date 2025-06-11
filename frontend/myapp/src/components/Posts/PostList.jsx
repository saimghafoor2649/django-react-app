import { useEffect, useState } from "react";
import { postAPI } from "../../api";
import CreatePost from "../Posts/CreatePost";
import PostItem from "../Posts/PostList"; // ✅ Import PostItem if it's in use

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Define loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postAPI.getPosts();
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await postAPI.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>; // ✅ Will now work properly

  return (
    <div className="post-list">
      <CreatePost setPosts={setPosts} />
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <PostItem key={post.id} post={post} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default PostList;
