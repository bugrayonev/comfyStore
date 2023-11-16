import { Link } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSLice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.userState.user);
 
  const handleLogout = ()=> {
    navigate("/")
    dispatch(clearCart())
    dispatch(logoutUser())

    /*  kullanıcı çıkış yaptığında onun query bilgisini yeni kullanıcı görmesin diye bütün qery leri silicez
        fakat bizim Orders.jsx de queryKey: ["orders"] den dolayı cache deki request i sergilediğinden göremiyoruz
        bunun için yeni bir satın almada ["orders"] silmeliyiz
      
         */
    queryClient.removeQueries() //  bütün query leri silicek
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {/* USER */}
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button className="btn btn-xs btn-outline btn-primary" onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center"> {/* links */}
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
