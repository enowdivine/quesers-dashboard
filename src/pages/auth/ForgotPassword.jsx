import React, { useState } from "react";
import "../../styles/GlobalStyles.css";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FPassword } from "../../helpers/redux/auth";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email) {
      const data = {
        email,
      };
      const response = await FPassword(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      toast.error("all fields are requied");
    }
  };

  return (
    <div className="authWrapper">
      <div className="loginForm">
        <div>
          <div className="flex min-h-full flex-col justify-center py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <span className="textPrimary">OUT</span>
                <span className="textSecondary">SHINE</span>
              </h1>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter Email
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <div className="mt-2 customInputDiv">
                    <div className="customInputIcon">
                      <AiOutlineMail size={20} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      autocomplete="email"
                      className="customInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-sm">
                  <a href="/" className="textPrimary">
                    Login
                  </a>
                </div>
                <div>
                  <button className="loginBtn" onClick={handleForgotPassword}>
                    {loading ? "Loading..." : "Send Email"}
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
