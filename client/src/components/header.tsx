import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  return (
    <div>
      <header className="container py-4  flex justify-between items-center mx-auto">
        <Link to={"/"} className=" font-bold text-lg">
          auth
        </Link>
        <nav className=" flex gap-2  text-white *:px-2 *:py-1 *:text-sm  *:rounded items-center">
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="hover:bg-[#262626]  w-full"
            >
              Logout
            </button>
          ) : (
            <Link className="border border-gray-600" to={"/login"}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}
