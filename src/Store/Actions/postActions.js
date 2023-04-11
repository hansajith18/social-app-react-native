import { UploadImageToFirebase } from "../../Shared/uploadToFirebase";

export const createPost = (post, setLoadingIndicator, blob) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const type = "postImages";
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
        firestore
          .collection("posts")
          .add({
            ...post,
            downloadURL: result,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
          })
          .then(() => {
            setLoadingIndicator(false, "Create Project Success", null);
            dispatch({ type: "CREATE_PROJECT_SUCCESS" });
          })
          .catch((err) => {
            setLoadingIndicator(
              false,
              "Create Project failed, try again",
              null
            );
            dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
          });
      })
      .catch((err) => {
        setLoadingIndicator(false, "Create Project failed, try again", null);
        dispatch({ type: "CREATE_PROJECT_ERROR" }, err);
      });
  };
};

export const editPost = (
  id,
  editedPost,
  blob,
  isImageSelect,
  setLoadingIndicator
) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const type = "postImages";
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
          editFirebasePost(
            firestore,
            id,
            editedPost,
            result,
            profile.firstName,
            profile.lastName,
            authorId,
            setLoadingIndicator,
            dispatch
          );
        })
        .catch((err) => {
          setLoadingIndicator(false, "Edit Project failed, try again", null);
          dispatch({ type: "EDIT_PROJECT_ERROR" }, err);
        });
    } else {
      editFirebasePost(
        firestore,
        id,
        editedPost,
        blob,
        profile.firstName,
        profile.lastName,
        authorId,
        setLoadingIndicator,
        dispatch
      );
    }
  };
};

export const deletePost = (id, navigation) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_POST" });
        navigation.navigate("News Feed");
      })
      .catch((err) => {
        console.error({ type: "DELETE_POST_ERROR", err });
      });
  };
};

// ! this is for post edit
const editFirebasePost = (
  firestore,
  id,
  editedPost,
  downloadURL,
  authorFirstName,
  authorLastName,
  authorId,
  setLoadingIndicator,
  dispatch
) => {
  firestore
    .collection("posts")
    .doc(id)
    .set({
      ...editedPost,
      downloadURL,
      authorFirstName,
      authorLastName,
      authorId,
      createdAt: new Date(),
    })
    .then((docRef) => {
      setLoadingIndicator(false, "Edit Project Success", null);
      dispatch({ type: "EDIT_PROJECT_SUCCESS" });
    })
    .catch((err) => {
      setLoadingIndicator(false, "Edit Project failed, try again", null);
      dispatch({ type: "EDIT_PROJECT_ERROR" }, err);
    });
};
