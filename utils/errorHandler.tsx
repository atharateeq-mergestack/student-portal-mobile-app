import { router } from "expo-router";

export const errorHandler = async (error: any) => {
    if (error.message === 'Forbidden resources.')
        router.push('/authScreen')
    console.log(error);
    
    // throw error.response?.data || { message: 'An error occurred during login.' };
}