import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { loading, error: errorMessage } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return dispatch(signInFailure(data.message || "Sign in failed"));
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure((error as Error).message));
      console.error(error);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value.trim() }));
  };

  return (
    <div className="bg-black h-screen items-center flex">
      <div className="border border-[#262626] max-w-md w-full mx-auto rounded-2xl p-8 bg-black">
        <h2 className="font-bold text-lg text-neutral-200">
          Daily job opportunities
        </h2>
        <p className="text-sm max-w-sm mt-2 text-neutral-300">Sign in now</p>

        <form className="my-8 flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="px-2 text-sm">
              Email Address
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              onBlur={handleBlur}
              placeholder="projectmayhem@fc.com"
              type="email"
              id="email"
              className="dark:bg-gradient-to-br relative dark:from-zinc-900 dark:to-zinc-900 block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 text-sm p-2 placeholder:text-gray-300 placeholder:text-sm shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              placeholder="******"
              type="password"
              id="password"
              onBlur={handleBlur}
              value={formData.password}
              onChange={handleChange}
              className="shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800 bg-gradient-to-br relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 text-sm p-2 placeholder:text-gray-300 placeholder:text-sm"
            />
          </div>
          <button
            className="mt-2 rounded-md bg-[#644ac0] relative w-full text-white h-10 font-normal shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex gap-2 text-sm my-7 justify-center items-center">
          <span>Don't have an account?</span>
          <Link to="/signup" className="text-[#644ac0]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
