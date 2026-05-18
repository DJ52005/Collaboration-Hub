import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {

  return (
    <div className="bg-[#070B1A] min-h-screen">

      <Sidebar />

      <div className="ml-[280px] p-10">

        {children}

      </div>

    </div>
  );
};

export default MainLayout;