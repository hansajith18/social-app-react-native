import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput, Card, ActivityIndicator } from "react-native-paper";
import { ChooseImage } from "../Shared/handleImageUpload";
import { editProfile } from "../Store/Actions/authActions";

const EditProfileModal = ({
  editProfile,
  showModal,
  setShowModal,
  uid,
  profile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [isImageSelect, setIsImageSelect] = useState(false);

  const setImageAndBlob = (blob, uri) => {
    setImage(uri);
    setBlob(blob);
    setIsImageSelect(blob ? true : false);
  };

  console.log(isImageSelect);
  const setLoadingIndicator = (loading, message, percentage) => {
    setIsLoading(loading);
    setMessage(message);
    setUploadingImage(percentage);
  };

  return (
    <Modal animationType="slide" visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => setShowModal(!showModal)}
          >
            <Text style={{ color: "red" }}>Close</Text>
          </TouchableOpacity>

          <View style={{ marginVertical: 50 }}>
            <Formik
              initialValues={{
                firstName: profile.firstName,
                lastName: profile.lastName,
              }}
              onSubmit={(values) => {
                setLoadingIndicator(true, "Saving Changes...", "0%");
                editProfile(
                  uid,
                  values,
                  blob ? blob : post.downloadURL,
                  isImageSelect,
                  setLoadingIndicator
                );
                setImageAndBlob(null, null);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{ margin: 1 }}>
                  <TextInput
                    label="First Name"
                    mode="flat"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    style={{ marginBottom: 5, borderRadius: 5 }}
                  />
                  <TextInput
                    label="Last Name"
                    mode="flat"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    style={{ marginBottom: 5, borderRadius: 5 }}
                  />

                  {image || profile.profileImage ? (
                    <Card style={{ marginVertical: 5 }}>
                      <Card.Cover
                        source={
                          image ? { uri: image } : { uri: profile.profileImage }
                        }
                      />
                    </Card>
                  ) : null}
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#cc2200",
                      padding: 10,
                      marginBottom: 5,
                    }}
                    onPress={() => ChooseImage(setImageAndBlob)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Choose Image
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#6a11cb",
                      padding: 10,
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator
                        color="white"
                        animating={isLoading}
                        style={{ padding: 2 }}
                      />
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        Edit Profile
                      </Text>
                    )}
                  </TouchableOpacity>

                  {message ? (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "green",
                        paddingTop: 10,
                      }}
                    >
                      {message} {uploadingImage && uploadingImage}
                    </Text>
                  ) : null}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (
      uid,
      editedProfile,
      blob,
      isImageSelect,
      setLoadingIndicator
    ) =>
      dispatch(
        editProfile(
          uid,
          editedProfile,
          blob,
          isImageSelect,
          setLoadingIndicator
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(EditProfileModal);

const styles = StyleSheet.create({
  modalView: {
    width: "95%",
    // height: "50%",
    backgroundColor: "#a1c4fd",
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeModal: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
