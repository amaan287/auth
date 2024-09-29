import { RootState } from "@/redux/store";
import { signoutSuccess } from "@/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
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
    <main className="flex  w-screen items-center justify-center">
      <div className=" w-96 h-96 bg-white text-black flex flex-col items-center justify-center">
        <div>this is home page </div>
        <div>
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="hover:bg-[#262626] p-2 border bg-black rounded-lg text-white  w-full mt-2"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="hover:bg-[#262626] p-2 border bg-black rounded-lg text-white w-full ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
