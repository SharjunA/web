import { useEffect, useState } from "react";
import InputField from "components/fields/InputField";

import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');
    const [base64Data, setBase64Image] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        if (profile != "") {
            const reader = new FileReader();

            reader.onloadend = () => {
                // The result attribute contains the base64 data URL
                const base64Data = reader.result;
                setBase64Image(base64Data);
                console.log(base64Data);
            };

            // Read the file as a data URL
            reader.readAsDataURL(profile);
        }
    }, [profile]);

    const handleSignup = async () => {
        if (name !== '' && email !== '' && password !== '' && profile !== '') {

            var formatData = { "profile": base64Data, "email": email, "name": name, "password": password };
            try {
                const response = await fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formatData),
                });
                if (response.ok) {
                    response.json().then((userData) => {
                        navigate('/auth/login');
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
                    Signup
                </h4>
                <p className="mb-4 ml-1 text-base text-gray-600">
                    Enter the details to signup!
                </p>

                <label htmlFor="profile">
                    <div className='flex flex-col justify-center items-center w-full mb-2'>
                        <p className='block mb-2 text-sm font-medium text-gray-900'>Profile Image</p>
                        {profile === "" ?
                            <BsPersonCircle className='w-16 h-16 text-gray-800' /> :
                            <img className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300" src={base64Data} alt="add profile image" />
                        }
                        <input id="profile" type="file" className="hidden" onChange={(event) => setProfile(event.target.files[0])} />
                    </div>
                </label>
                {/* Name */}
                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Name*"
                    value={name}
                    setData={setName}
                    placeholder="username"
                    id="name"
                    type="text"
                />

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

                <button onClick={() => handleSignup()} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Signup
                </button>
                <div className="mt-4">
                    <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already have an account?
                    </span>
                    <a
                        href="/auth/login"
                        className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                    >
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}
