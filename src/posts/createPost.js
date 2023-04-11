import React, { Component } from "react";
import {
  TextInput,
  Button,
  ActivityIndicator,
  Card,
  ProgressBar,
} from "react-native-paper";
import { Formik } from "formik";
import { createPost } from "../Store/Actions/postActions";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import Header from "./../Shared/header";
import { ChooseImage } from "../Shared/handleImageUpload";

class CreatePost extends Component {
  state = {
    isLoading: false,
    UploadingImage: null,
    message: null,
    image: null,
    blob: null,
  };

  setImage = (blob, uri) => {
    this.setState({
      ...this.state,
      image: uri,
      blob: blob,
    });
  };

  setLoadingIndicator = (loading, message, percentage) => {
    this.setState({
      ...this.state,
      isLoading: loading,
      UploadingImage: percentage,
      message,
    });
  };
  render() {
    const PostSchema = Yup.object().shape({
      title: Yup.string().min(5).max(50).required(),
      content: Yup.string().min(10).max(250).required(),
    });

    return (
      <>
        <Header
          route={this.props.route}
          navigation={this.props.navigation}
          title="Create Post"
        />
        <Formik
          initialValues={{}}
          validationSchema={PostSchema}
          onSubmit={(values) => {
            this.setLoadingIndicator(true, "Publishing...", "0%");
            this.props.createPost(
              values,
              this.setLoadingIndicator,
              this.state.blob
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ margin: 10 }}>
              <TextInput
                label="Title"
                mode="flat"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                style={{ marginBottom: 5, borderRadius: 5 }}
              />
              {errors.title && touched.title ? (
                <Text style={{ color: "red", marginBottom: 4 }}>
                  {errors.title}
                </Text>
              ) : null}
              <TextInput
                label="Post"
                mode="flat"
                onChangeText={handleChange("content")}
                onBlur={handleBlur("content")}
                multiline={true}
                numberOfLines={5}
                value={values.content}
                style={{ marginBottom: 5, borderRadius: 5 }}
              />
              {errors.content && touched.content ? (
                <Text style={{ color: "red", marginBottom: 4 }}>
                  {errors.content}
                </Text>
              ) : null}

              {this.state.image ? (
                <Card style={{ marginVertical: 5 }}>
                  <Card.Cover source={{ uri: this.state.image }} />
                </Card>
              ) : null}
              <TouchableOpacity
                style={{
                  backgroundColor: "#cc2200",
                  padding: 10,
                  marginBottom: 5,
                }}
                onPress={() => ChooseImage(this.setImage)}
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
                disabled={this.state.isLoading || !this.state.blob}
              >
                {this.state.isLoading ? (
                  <ActivityIndicator
                    color="white"
                    animating={this.state.isLoading}
                    style={{ padding: 2 }}
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    publish
                  </Text>
                )}
              </TouchableOpacity>

              {this.state.message ? (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "green",
                      paddingTop: 10,
                    }}
                  >
                    {this.state.message}
                  </Text>
                  {this.state.UploadingImage && (
                    <>
                      <Text>{this.state.UploadingImage}</Text>
                      <ProgressBar progress={this.state.UploadingImage} />
                    </>
                  )}
                </>
              ) : null}
            </View>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post, setLoadingIndicator, blob) => {
      dispatch(createPost(post, setLoadingIndicator, blob));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
