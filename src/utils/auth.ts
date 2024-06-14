import { DecodedToken } from '../interfaces/model/auth';
import { useJwt } from "react-jwt";

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const d = useJwt<DecodedToken>(token)
        return d.decodedToken
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded) {
        return true;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};
