import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}
export default function Signup() {
  const [formData, setFormData] = useState<FormData>({});
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password
    ) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <div className="bg-black h-screen items-center flex">
      <div className="border border-[#262626] max-w-md w-full mx-auto  rounded-2xl p-8 bg-black">
        <h2 className="font-bold text-lg text-neutral-200">
          Daily job opportunities
        </h2>
        <p className="text-sm max-w-sm mt-2  text-neutral-300">signup now</p>

        <form className="my-8 flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-1 flex-col">
              <label htmlFor="firstname" className="text-sm">
                First name
              </label>
              <input
                onChange={handleChange}
                placeholder="tyler"
                type="text"
                id="firstname"
                className="bg-gradient-to-br relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10   p-2 placeholder:text-gray-300 placeholder:text-sm shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800 text-sm"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="lastname" className="text-sm">
                Last name
              </label>
              <input
                onChange={handleChange}
                placeholder="reeds"
                type="text"
                id="lastname"
                className="bg-gradient-to-br relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 text-sm  p-2 placeholder:text-gray-300 placeholder:text-sm shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="px-2 text-sm">
              Email Address
            </label>
            <input
              onChange={handleChange}
              placeholder="projectmayhem@fc.com"
              type="email"
              id="email"
              className="bg-gradient-to-br relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 text-sm  p-2 placeholder:text-gray-300 placeholder:text-sm  shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800"
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
              onChange={handleChange}
              className="shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800 bg-gradient-to-br relative from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 text-sm  p-2 placeholder:text-gray-300 placeholder:text-sm"
            />
          </div>
          <button
            className="mt-2 rounded-md bg-[#644ac0] relative w-full text-white  h-10 font-normal shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] shadow-zinc-800
            "
            type="submit"
          >
            Sign up
          </button>
        </form>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex gap-2 text-sm my-7 justify-center items-center">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
        {errorMessage && <h1>{errorMessage}</h1>}
      </div>
    </div>
  );
}
