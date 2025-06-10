import { useEffect, useState } from "react";
import { postAPI } from "../../api";
import CreatePost from "../Posts/CreatePost";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postAPI.getPosts();
        setPosts(response.data);
      } catch (err) {
        console.error(err);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-list">
      <CreatePost setPosts={setPosts} />
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PostList;
