import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "../../redux/authSlice";
import { addToken } from "../../redux/authSlice";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      var formatData = { "email": email, "password": password };
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formatData),
        });
        if (response.ok) {
          response.json().then((userData) => {
            navigate('/home');
            // Store the token in local storage
            sessionStorage.setItem('token', userData.token);
            sessionStorage.setItem('userData', JSON.stringify(userData.user));
            console.log(userData);
            dispatch(addToken(userData.token));
            dispatch(addUserData(userData.user))
            console.log('Request sent successfully');
          });
        } else {
          response.json().then((msg) => alert(msg.msg));
        }
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      alert("Please enter all the details");
    }
  }
  return (
    <div className=" mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <div className="flex flex-row items-center mt-1 ml-1 h-2.5 font-poppins text-[24px] font-bold uppercase text-navy-700 dark:text-white">
          Avalanche <span class="font-medium ml-2"> Detector</span>
        </div>
        <p className="mt-4 ml-1 text-base text-gray-600">Unleashing the power of innovation to conquer the unpredictable: Avalanche detection for a safer mountain experience.</p>
        <h4 className="mb-2.5 mt-8 text-2xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        <p className="mb-4 ml-1 text-base text-gray-600">
          Enter your email and password to login!
        </p>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          value={email}
          setData={setEmail}
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          value={password}
          setData={setPassword}
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />

        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button onClick={() => handleLogin()} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Login
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href="/auth/signup"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
