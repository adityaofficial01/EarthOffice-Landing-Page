import { TYPES } from "../types";

const INITIAL_STATE = {

  commonData: null,
};

const {
  COMMON_CONTENT,
} = TYPES;

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
   
    case COMMON_CONTENT:
      return {
        ...state,
        commonData: payload || null, // Optional: default to null if payload is undefined
      };

    default:
      return state; // Explicitly return current state for clarity
  }
};
