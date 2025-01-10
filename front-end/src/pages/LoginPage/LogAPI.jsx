// services/api.ts
import axios from "axios";

const BASE_URL = "https://opendata.hauts-de-seine.fr"; // Replace with the actual base URL.

// check login
export const checkUserLogin = (payload) => {
    try {
        console.log(payload)
        return true
    } catch (error) {
        console.error("Error login", error);
        throw error;
    }
};

// get all haut-de-seine communes
export const fetchCommunes = async (limit = 36) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/explore/v2.1/catalog/datasets/communes/records`,
            { params: { limit } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching communes:", error);
        throw error;
    }
};
