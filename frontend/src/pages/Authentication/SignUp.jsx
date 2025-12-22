import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Footer';

function SignUp() {

   const [signInName, setSignInName] = useState('');
   const [signInEmail, setSignInEmail] = useState('');
   const [signInPassword, setSignInPassword] = useState('');
   const [signInMessage, setSignInMessage] = useState('');
   const [loding, setLoding] = useState(false)
   const navigate = useNavigate();
   const handleSignUp = async (e) => {
      e.preventDefault();
      try {
         setLoding(true);
         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`, {
            method: "POST",
            body: JSON.stringify({ name: signInName, email: signInEmail, password: signInPassword }),
            headers: {
               "Content-Type": "application/json",
            }
         });

         const data = await response.json();

         if (response.ok) {
            setLoding(false);
            setSignInMessage(data.message);
            localStorage.setItem('token', data.data.token);
            setTimeout(() => {
               if (data.data.user.email === 'admin@gmail.com') {
                  navigate('/admin/cafeteria');
               } else {
                  navigate('/cafeteria');
               }
            }, 1000)
         } else {
            setLoding(false);
            setSignInMessage(data.errorMessage);
         }

         setTimeout(() => {
            setSignInName('');
            setSignInEmail('');
            setSignInPassword('');
         }, 1000);
      } catch (error) {
         console.log('ERROR:', error);
      }
   }
   useEffect(() => {
      if (signInMessage) {
         setTimeout(() => {
            setSignInMessage('');
         }, 1500);
      }
   })

   return (
      <>
         <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-800 p-6">
            <div className="flex flex-col md:flex-row bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">

               {/* Left Side: Illustration / Branding */}
               <div className="hidden md:flex flex-col justify-center items-center bg-gray-200/80 w-1/2 p-1">
                  <img
                     src="/foodImages/leftpanel-signup.png"
                     alt="Food Illustration"
                     className="h-full w-full object-cover rounded-xl"
                  />
               </div>

               {/* Right Side: SignUp Form */}
               <div className="w-full md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold text-purple-950 tracking-tight text-center mb-1">Create a new Account</h2>
                  <p className='text-sm text-white/100 italic text-center mb-4'>"Because hunger waits for no one."</p>
                  <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                     <div className="flex flex-col">
                        <label className="text-md font-semibold text-white">Name</label>
                        <input
                           type="text"
                           placeholder="e.g-Devansh"
                           className="border-2 border-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                           value={signInName}
                           onChange={(e) => setSignInName(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-md font-semibold text-white">Email</label>
                        <input
                           type="email"
                           placeholder="e.g-devansh@gmail.com"
                           className="border-2 border-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                           value={signInEmail}
                           onChange={(e) => setSignInEmail(e.target.value)}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-md font-semibold text-white">Password</label>
                        <input
                           type="password"
                           placeholder="e.g-Devansh@123"
                           className="border-2 border-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                           value={signInPassword}
                           onChange={(e) => setSignInPassword(e.target.value)}
                        />
                     </div>
                     <button
                        type="submit"
                        className="mt-4 bg-purple-700 text-white py-2 rounded-md hover:scale-105 hover:bg-purple-800 transition-transform duration-300"
                     >
                        Sign Up
                     </button>
                     <div className="mt-3 text-[13px] text-white/90 bg-white/20 rounded-md p-3 leading-tight">
                        Try logging with demo account <span className="font-medium">(details in signin page)</span>.
                     </div>
                  </form>
                  <div className="text-sm text-center pt-3">
                     Already have an <Link to={'/'} className="underline font-semibold">account</Link>?
                  </div>
                  {loding && (
                     <p className="text-white mt-4 text-center text-xs tracking-wide">Loading...</p>
                  )}
                  {signInMessage && (
                     <p className="text-red-700 mt-4 text-center text-xs">{signInMessage}</p>
                  )}
               </div>

            </div>
         </div>
         <Footer />
      </>

   )
}

export default SignUp