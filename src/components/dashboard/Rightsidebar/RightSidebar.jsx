import React, { useState, useContext, useEffect } from "react";
import Cards from "../../Cards";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { userLogout } from "../../../helpers/redux/auth";
import {
  uploadProfileImage,
  getVendorDetails,
} from "../../../helpers/redux/vendors";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cashoutRequest } from "../../../helpers/redux/withdrawals";
import { useDropzone } from "react-dropzone";

const FormStyle = {
  width: "100%",
  border: "1px solid #ccc",
  background: "#f0efef",
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
  outline: "none",
};
const BtnStyle = {
  color: "#fff",
  background: "black",
  width: "100%",
  padding: 5,
  fontWeight: "bold",
  marginTop: 15,
  borderRadius: 5,
};
const navItems = [
  {
    title: "Home",
    link: "/dashboard",
  },
  {
    title: "Schools/Exams",
    link: "/exams",
  },
  {
    title: "Faculties",
    link: "/faculties",
  },
  {
    title: "Departments",
    link: "/departments",
  },
  {
    title: "Vendors",
    link: "/vendors",
  },
  {
    title: "Cashout Requests",
    link: "/requests",
  },
];
const RightSidebar = () => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({ title: "Home" });
  const { setAuthenticated, role, userId, email, setEmail, image, setImage } =
    useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
    setAuthenticated(false);
  };

  const handleCashoutRequest = async (e) => {
    e.preventDefault();
    if ((amount, password)) {
      const data = {
        userId,
        amount,
        password,
      };
      const response = await cashoutRequest(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        setAmount("");
        setPassword("");
        return;
      }
    } else {
      toast.error("all fields are required");
    }
  };

  const getUserInfo = async () => {
    const response = await getVendorDetails(userId, dispatch, setLoading);
    const user = response.message.payload;
    // console.log(user);
    setImage(user?.avatar?.doc);
    setEmail(user?.email);
    setUsername(user?.username);
  };

  const { getRootProps: getProfileImage, getInputProps: getProfileImageInput } =
    useDropzone({
      onDrop: async (acceptedFiles) => {
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setImage(objectUrl);

        const data = new FormData();
        data.append("profileImage", acceptedFiles[0]);

        const newData = {
          id: userId,
          data,
        };
        const response = await uploadProfileImage(
          newData,
          dispatch,
          setLoading
        );
        if (response.status === "error") {
          toast.error(response.res.payload);
          return;
        } else {
          const vendor = response.message.payload.vendor;
          const url = vendor.avatar.doc;
          setImage(url);
          toast.success(response.message.payload.message);
          // free memory when ever this component is unmounted
          return () => URL.revokeObjectURL(objectUrl);
        }
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  useEffect(() => {
    if (role === "vendor") {
      getUserInfo();
    }
  }, [userId]);

  return (
    <div>
      {role === "vendor" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            {...getProfileImage()}
          >
            <input {...getProfileImageInput()} />
            <img
              src={image || "/assets/images/placeholder.jpeg"}
              alt="Profile"
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: 200,
                padding: 6,
                background:
                  "linear-gradient(45deg, rgba(73,152,153,1) 0%, rgba(192,253,45,1) 100%)",
              }}
            />
          </div>
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>
            {username}
          </p>
          <p style={{ textAlign: "center", marginTop: 10 }}>{email}</p>
          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontWeight: "bold" }}>Your Account</h4>
            <div style={{ marginTop: 10 }}>
              <Cards
                title={"Gains"}
                value={3671}
                desc={"CFA"}
                color={"#dcecf2"}
              />
            </div>
            {showForm && (
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  style={FormStyle}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="**********"
                  style={FormStyle}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            {!showForm && (
              <button style={BtnStyle} onClick={() => setShowForm(!showForm)}>
                CASHOUT
              </button>
            )}
            {showForm ? (
              <button style={BtnStyle} onClick={handleCashoutRequest}>
                {loading ? "Processing..." : "SUBMIT"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {role === "admin" && (
        <div>
          <h4 style={{ fontWeight: "bold" }}>MENU</h4>
          <ul className="rightsidebarNav">
            {navItems.map((item, index) => (
              <Link
                key={index}
                onClick={() => setSelected(item)}
                to={item.link}
                className="rightsidebarNavItems"
              >
                {item.title}
              </Link>
            ))}
            <Link onClick={handleLogout} className="rightsidebarNavItems">
              Logout
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
