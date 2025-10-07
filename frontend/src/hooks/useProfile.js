import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";

export const useUserProfile = () => {
  const { token } = useContext(TokenContext);
  const { autoProfile } = useContext(UserContext);

  const [user, setUser] = useState({});
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await autoProfile();

      if (!response.error) {
        setUser(response);
        //console.log("USER EN HOOK: ", response);
      }
    };
    fetchProfile();
  }, [autoProfile, token]);

  useEffect(() => {
    if (user.type === "superuser") {
      setUserValidated(true);
    } else {
      setUserValidated(false);
    }
    if (!token) {
      setUserValidated(false);
    }
  }, [user.type, token]);

  return { token, userValidated };
};
