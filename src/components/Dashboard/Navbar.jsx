import { NavLink } from "react-router-dom";
import Logo from "../../assets/LOGO.svg";
import Profile from "../../assets/images/profile.svg";
import { useDispatch } from "react-redux";
import { setMyProfileOpen } from "../../slices/myProfileSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center w-full p-4 h-[100px] shadow-custom-shadow bg-white">
      <div className="flex items-baseline">
        <img src={Logo} alt="Rehaabit" className="h-18 w-16 mr-2" />
        <span
          className="text-[40px] text-[#2E0B55] font-[Amaranth] font-[700]"
        >
          Rehaabit
        </span>
      </div>

      <NavLink to="my-profile">
        <div className="flex items-center">
          <img
            src={Profile}
            alt="Profile"
            className="h-14 w-14 rounded-full"
            onClick={() => dispatch(setMyProfileOpen())}
          />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;