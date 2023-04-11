import React, { useState } from "react";
import { connect } from "react-redux";
import { Text, View, Image } from "react-native";
import getImages from "../Shared/getImages";

function ListUploads({ auth }) {
  const [images, setimages] = useState(null);

  const displayImage = (url) => {
    setimages(url);
  };
  getImages(auth.uid, displayImage);
  console.log(images);
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>image</Text>
      </View>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ListUploads);
