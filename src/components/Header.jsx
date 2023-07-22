import LogoutButton from "./HeaderItems/LogoutButton";
import Toolbar from "./HeaderItems/Toolbar";
import SaveButton from "./HeaderItems/SaveButton";

function Header() {
  return (
    <div className="flex flex-col w-full h-min-[120px] bg-black-bg">
      <div className="flex flex-row justify-between items-center h-[50px] p-3 bg-black-bg">
        <img
          className="w-10"
          src="/assets/dataface_logo.png"
          alt="dataface logo"
        />
        <h1 className="text-white">Page Name</h1>
        <LogoutButton />
      </div>

      <div className="flex flex-row justify-between items-center h-[70px] p-3 bg-black-bg">
        <Toolbar />
        <SaveButton />
      </div>
    </div>
  );
}

export default Header;
