import React, { useState } from "react";
import "../../styles/GlobalStyles.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NPassword } from "../../helpers/redux/auth";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if ((password, confirmPassword)) {
      if (password !== confirmPassword) {
        toast.error("passwords do not match");
        return;
      }
      const data = {
        token,
        password,
      };
      const response = await NPassword(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        navigate("/", { replace: true });
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
                Enter New Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
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
                        {showPassword ? (
                          <LuEyeOff size={20} />
                        ) : (
                          <LuEye size={20} />
                        )}
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
                        {showPassword ? (
                          <LuEyeOff size={20} />
                        ) : (
                          <LuEye size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="loginBtn" onClick={handleNewPassword}>
                    {loading ? "Loading..." : "Submit"}
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

export default NewPassword;
