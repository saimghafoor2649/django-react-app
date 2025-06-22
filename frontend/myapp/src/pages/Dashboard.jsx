import CreatePost from "../components/Posts/CreatePost";
import PostList from "../components/Posts/PostList";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Your Posts</h1>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Dashboard;
