// src/hooks/useAppSelector.js
import { useSelector, shallowEqual } from 'react-redux';

const useAppSelector = (selector, equalityFn = shallowEqual) => {
    return useSelector(selector, equalityFn);
};

export default useAppSelector;
