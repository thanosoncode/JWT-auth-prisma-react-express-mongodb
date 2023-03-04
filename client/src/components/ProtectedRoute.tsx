import { Outlet } from "react-router-dom";
import Auth from "./auth/Auth.component";

const ProtectedRoute = ({
  user,
  setUser,
}: {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return user ? <Outlet /> : <Auth setUser={setUser} />;
};

export default ProtectedRoute;
