import React from "react";
import { loginWithGoogle } from "../services/firebase";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null);

  const login = async () => {
    const user = await loginWithGoogle();

    console.log(user);

    if (!user) {
      console.log("Error");
    }

    setUser(user);
  };

  const value = { user, login };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };
// Referenced from: https://blog.logrocket.com/how-to-build-chatroom-app-react-firebase/