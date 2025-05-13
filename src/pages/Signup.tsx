
import React from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
      }}
    >
        <SignUp 
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"

        />
    </div>
  );
};

export default Signup;