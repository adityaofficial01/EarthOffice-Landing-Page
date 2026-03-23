// src/hooks/useAppDispatch.js
import { useDispatch } from 'react-redux';

const useAppDispatch = () => {
    const dispatch = useDispatch();

    // Here, you can add any custom logic you want to apply to the dispatch,
    // or just return `dispatch` directly for simplicity.
    return dispatch;
};

export default useAppDispatch;
