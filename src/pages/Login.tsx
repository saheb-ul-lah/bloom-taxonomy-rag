
import React from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const signIn = () => {
  return (
    <div
    className="flex justify-center items-center min-h-screen p-4"
    style={{
      backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    }}
  >
        <SignIn signUpUrl="/sign-up" />     
    </div>
  );
};

export default signIn;