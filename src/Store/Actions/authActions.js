import { UploadImageToFirebase } from "../../Shared/uploadToFirebase";

export const SignIn = (credentials, setLoadingIndicator) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        setLoadingIndicator(false);
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const SignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .logout()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_ERROR", err });
      });
  };
};

export const CreateUser = (newUser, setLoadingIndicator) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            profileImage:
              "https://firebasestorage.googleapis.com/v0/b/social-app-7427d.appspot.com/o/userProfile%2Fuser.jpg?alt=media&token=711e2b12-012a-480c-88fb-0aac49cb6723",
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        setLoadingIndicator(false);
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const editProfile = (
  id,
  editedProfile,
  blob,
  isImageSelect,
  setLoadingIndicator
) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const type = "userProfile";
    if (id === uid) {
      if (isImageSelect) {
        UploadImageToFirebase(
          type,
          blob,
          dispatch,
          getState,
          getFirebase,
          setLoadingIndicator
        )
          .then((result) => {
            setLoadingIndicator(true, "Upload Complete finishing up", null);
            editFirebaseProfile(
              firestore,
              uid,
              editedProfile,
              result,
              setLoadingIndicator,
              dispatch
            );
          })
          .catch((err) => {
            setLoadingIndicator(false, "Edit profile failed, try again", null);
            dispatch({ type: "EDIT_PROFILE_ERROR" }, err);
          });
      } else {
        editFirebaseProfile(
          firestore,
          uid,
          editedProfile,
          downloadURL,
          setLoadingIndicator,
          dispatch
        );
      }
    } else {
      setLoadingIndicator(false, "You have no permissions", null);
      dispatch({ type: "NO_PERMISSIONS" });
    }
  };
};

// ! this is for post edit
const editFirebaseProfile = (
  firestore,
  uid,
  editedProfile,
  downloadURL,
  setLoadingIndicator,
  dispatch
) => {
  firestore
    .collection("users")
    .doc(uid)
    .set({
      ...editedProfile,
      profileImage: downloadURL,
    })
    .then((docRef) => {
      setLoadingIndicator(false, "Edit profile Success", null);
      dispatch({ type: "EDIT_PROFILE_SUCCESS" });
    })
    .catch((err) => {
      setLoadingIndicator(false, "Edit profile failed, try again", null);
      dispatch({ type: "EDIT_PROFILE_ERROR" }, err);
    });
};
