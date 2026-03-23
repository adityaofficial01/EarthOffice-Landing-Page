import { TYPES } from "../types";
import { store } from '../store';
import axios from "axios";
import { METHODS } from "Constant/variable";
import CustomToast from "utils/CustomToast";

const {  COMMON_CONTENT} = TYPES;
const BaseUrl = process.env.REACT_APP_BASE_URL;

/**
 * Helper function to generate headers
 * @param {string} token - Authorization token
 * @param {boolean} hasFile - Flag indicating if the request contains files
 */
const generateHeaders = (token, hasFile) => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": hasFile ? "multipart/form-data" : "application/json",
});

/**
 * Core function to hit API
 * @param {Object} params - The parameters for the API call
 * @param {string} params.url - The API endpoint
 * @param {string} [params.method="POST"] - The HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {Object|null} [params.myObj=null] - The data to send in the request
 * @param {boolean} [params.hasFile=false] - Whether the request includes files
 * @returns {Promise<Object>} The API response
 */
export const getApiQuery = async ({ url, method = METHODS.POST, myObj = null, hasFile = false }) => {
    const dataAccessToken = store?.getState()?.common?.jwtToken;

    // Check for internet connectivity before making the request

    if (!navigator.onLine) {
        return { internetIssue: true, message: "No Active Internet Connection" };
    }

    try {
        const response = await axios({
            method,
            url: `${BaseUrl}${url}`,
            data: myObj,
            timeout: 300000, // 5 minutes in milliseconds
            headers: generateHeaders(dataAccessToken, hasFile),
        });

        if (response?.status === 400) {
            return { error: response.data };
        }
        return response;

    } catch (error) {
        const status = error?.response?.status;
        console.error("An error occurred:", error);
        if (error?.code === "ERR_NETWORK") {
            CustomToast("e", error?.message)
        }

        // Handle unauthorized errors by clearing localStorage and reloading the page
        if (status === 401) {
            localStorage.clear();
            window.location.reload();
        }

        return error?.response || { error: "An unexpected error occurred" };
    }
};


/**
 * Setting Common Content
 * @param {Object} data - The common content
 */
export const storeCommonContent = (data) => (dispatch) => {
    dispatch({ type: COMMON_CONTENT, payload: data });
};
