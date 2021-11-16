import {
    AUTH,
    END_LOADING_AUTH,
    ERROR_AUTH,
    LOGOUT,
    RETRIEV,
    START_LOADING_AUTH,
} from "../utility/actionTypes";

export const authReducer = (
    authData = { token: null, user: null, isLoading: false, errorMessage: null },
    action
) => {
    switch (action.type) {
        case ERROR_AUTH:
            return { ...authData, errorMessage: action.payload };

        case START_LOADING_AUTH:
            return { ...authData, isLoading: true };

        case END_LOADING_AUTH:
            return { ...authData, isLoading: false };

        case AUTH:
            return { ...authData, ...action.payload };

        case LOGOUT:
            return { ...authData, token: null, user: null };

        case RETRIEV:
            return { ...authData, ...action.payload };
        default:
            return authData;
    }
};
