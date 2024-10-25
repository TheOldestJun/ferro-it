import axios from "axios";
import decodeToken from "./decodeToken";
import { login } from "@/store/reducers/userSlice";
import { useDispatch } from "react-redux";

export default async function loginUser(email, password) {
    const dispatch = useDispatch();
    try {
        const response = await axios.post("/api/auth/login", {
            email,
            password
        })
        const { token } = response.data;
        localStorage.setItem("token", token);
        const decodedToken = decodeToken(token);
        if (decodedToken) {
            dispatch(login({
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                email: decodedToken.email,
                role: decodedToken.role}));
        }
    } catch (error) {
        console.error(error);
    }
}