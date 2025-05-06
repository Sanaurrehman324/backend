import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/auth/user-auth",{
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        }
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
        navigate("/auth");
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
