export const UploadImageToFirebase = (
  type,
  blob,
  dispatch,
  getState,
  getFirebase,
  setState
) =>
  new Promise((resolve, reject) => {
    const firebase = getFirebase();
    const authorId = getState().firebase.auth.uid;
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef
      .child(type + "/" + authorId + "/" + new Date() + ".jpg")
      .put(blob, {
        contentType: "image/jpeg",
      });

    // Register three observers:
    // ? 1. 'state_changed' observer, called any time the state changes
    // ! 2. Error observer, called on failure
    // * 3. Completion observer, called on successful completion

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // ? Observe state change events such as progress, pause, and resume
        // ? Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState(true, "Image Uploading", Math.round(progress) + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            setState(true, "Upload is paused", Math.round(progress) + "% done");
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            setState(true, "Uploading", Math.round(progress) + "% done");
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // ! Handle unsuccessful uploads
        setState(false, "Upload is unsuccessful", null);
        dispatch({ type: "UPLOAD_ERROR", error });
        reject(error);
      },
      function () {
        // * Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          resolve(downloadURL);
          dispatch({ type: "UPLOAD_SUCCESS" });
        });
      }
    );
  });
