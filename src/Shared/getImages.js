import { useFirebase } from "react-redux-firebase";

export default function getImages(uid, displayImage) {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  // Create a storage reference from our storage service
  const firebase = useFirebase();
  const storage = firebase.storage();
  const storageRef = storage.ref();
  // Create a reference under which you want to list
  const listRef = storageRef.child("postImages/" + uid);

  // Find all the prefixes and items.

  listRef
    .listAll()
    .then(function (res) {
      res.prefixes.forEach(function (folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach(function (itemRef, i) {
        // All the items under listRef.
        itemRef
          .getDownloadURL()
          .then(function (url) {
            displayImage(url);
            // // TODO: Display the image on the UI
          })
          .catch(function (error) {
            // Handle any errors
            console.log(error);
          });
      });
    })
    .catch(function (error) {
      // Uh-oh, an error occurred!
    });
}
