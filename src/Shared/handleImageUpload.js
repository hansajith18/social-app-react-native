import * as ImagePicker from "expo-image-picker";
import uriToBlob from "./uriToBlob";

export function ChooseImage(setImage) {
  try {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          return uriToBlob(uri);
        }
        return [null, null];
      })
      .then(([blob, uri]) => {
        // * get promice from uriToBlob()
        return setImage(blob, uri);
      })
      .then((snapshot) => {
        console.log("done");
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return setImage(null, null);
  }
}
