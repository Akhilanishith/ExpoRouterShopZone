import AuthProvider from "../context/AuthContext";
import Main from "./Main";

export default function Layout() {
  
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}