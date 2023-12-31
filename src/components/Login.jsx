import React, { useState, useContext, useEffect } from "react";
import "../styles/GlobalStyles.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../helpers/redux/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if ((email, password, confirmPassword)) {
      if (password !== confirmPassword) {
        toast.error("passwords do not match");
        return;
      }
      const data = {
        email,
        password,
      };
      const response = await userLogin(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        navigate("/dashboard", { replace: true });
        return;
      }
    } else {
      toast.error("all fields are requied");
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <span className="textPrimary">OUT</span>
            <span className="textSecondary">SHINE</span>
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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

            <div>
              <div className="mt-2 customInputDiv">
                <div className="customInputIcon">
                  <RiLockPasswordLine size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autocomplete="current-password"
                  className="customInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="customInputIconRight"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </div>
              </div>
            </div>

            <div>
              <div className="mt-2 customInputDiv">
                <div className="customInputIcon">
                  <RiLockPasswordLine size={20} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  autocomplete="current-password"
                  className="customInput"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="customInputIconRight"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </div>
              </div>
            </div>
            <div className="text-sm">
              <a href="/forgot-password" className="textPrimary">
                Forgot password?
              </a>
            </div>
            <div>
              <button className="loginBtn" onClick={handleLogin}>
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
