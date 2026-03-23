// src/hooks/useNavigate.js
import { useNavigate } from 'react-router-dom';

const useAppNavigate = () => {
    const navigate = useNavigate();

    const navigateTo = (path, options = {}) => {
        // You can add custom logic here, like logging or conditions
        console.log(`Navigating to: ${path}`);
        navigate(path, options);
    };

    return navigateTo;
};

export default useAppNavigate;