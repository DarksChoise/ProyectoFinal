import axios from 'axios';

const useRegister = () => {
    const register = async (email: string, password: string, username: string, first_name: string, last_name: string) => {
        try {
        const response = await axios.post('https://backend-tu3j.onrender.com/users/', {
            email,
            password,
            username,
            first_name,
            last_name,
        });
        return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.detail || 'Register failed');
        }

    }
    return { register };
}

export default useRegister;