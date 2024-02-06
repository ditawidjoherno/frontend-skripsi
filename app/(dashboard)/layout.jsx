// pages/index.js
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const Home = ({ children }) => {

  return (
    <>
      <Sidebar />
      <div className="pl-64">
        {children}
      </div>
    </>
  );
};

export default Home;
