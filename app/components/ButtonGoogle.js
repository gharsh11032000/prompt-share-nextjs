import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { API_URL } from "../config";

function ButtonGoogle({ children }) {
  return (
    <Link href={`${API_URL}/connect/google`}>
      <button className="btn btn-primary">
        <FaGoogle className="mr-2" />
        {children}
      </button>
    </Link>
  );
}

export default ButtonGoogle;
