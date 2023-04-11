const initState = {
  authLoginError: null,
  authSignupError: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log(action.err);
      return {
        ...state,
        authLoginError: "Email or password dosn't match",
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authLoginError: null,
      };
    case "LOGOUT_SUCCESS":
      console.log("logout success");
      return state;
    case "LOGOUT_ERROR":
      console.log("logout error", action.err);
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authSignupError: null,
      };

    case "SIGNUP_ERROR":
      console.log("signup error", action.err);
      return {
        ...state,
        authSignupError: action.err.message,
      };

    case "UPLOAD_ERROR":
      console.log("Image upload failed", action.err);
      return state;
    case "UPLOAD_SUCCESS":
      console.log("Image upload success");
      return state;
    case "EDIT_PROFILE_SUCCESS":
      console.log("Edit profile success");
      return state;
    case "EDIT_PROFILE_ERROR":
      console.log("Edit profile error", action.err);
      return state;
    case "NO_PERMISSIONS":
      console.log("Access denied");
      return state;

    default:
      return state;
  }
};
export default AuthReducer;
