import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Formik } from "formik";
import { Appbar, TextInput, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import * as Yup from "yup";
import { CreateUser } from "../Store/Actions/authActions";

class SignUp extends Component {
  state = {
    isLoading: false,
  };

  setLoadingIndicator = (loading) => {
    this.setState({
      isLoading: loading,
    });
  };

  render() {
    const SignUpSchema = Yup.object().shape({
      firstName: Yup.string().min(5).max(15).label("First Name").required(),
      lastName: Yup.string().min(5).max(15).label("Last Name").required(),
      email: Yup.string().email().label("Email").required(),
      password: Yup.string().min(6).label("Password").required(),
      confirmPassword: Yup.string()
        .required()
        .label("Confirm password")
        .test("password-match", "Password dosn't match", function (value) {
          return this.parent.password === value;
        }),
    });

    return (
      <>
        <Appbar.Header>
          <Appbar.Action icon="wechat" />
          <Appbar.Content title="Sign Up" />
        </Appbar.Header>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#a1c4fd",
          }}
        >
          <View>
            <Formik
              initialValues={{}}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                this.setLoadingIndicator(true);
                this.props.CreateUser(values, this.setLoadingIndicator);
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
                <View
                  style={{
                    margin: 10,
                    justifyContent: "center",
                    backgroundColor: "#c2e9fb",
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 20,
                      height: 1,
                    },
                    shadowOpacity: 2,
                    shadowRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 20,
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up with Email
                  </Text>
                  <View style={{ marginBottom: 5 }}>
                    <TextInput
                      mode="outlined"
                      label="First Name"
                      placeholder="Enter your First Name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                      textContentType="name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <Text style={{ color: "red", marginBottom: 4 }}>
                        {errors.firstName}
                      </Text>
                    ) : null}
                    <TextInput
                      mode="outlined"
                      label="Last Name"
                      placeholder="Enter your Last Name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                      textContentType="name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <Text style={{ color: "red", marginBottom: 4 }}>
                        {errors.lastName}
                      </Text>
                    ) : null}
                    <TextInput
                      mode="outlined"
                      label="Email or UserName"
                      placeholder="Enter Email Address or user name"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      textContentType="emailAddress"
                    />
                    {errors.email && touched.email ? (
                      <Text style={{ color: "red", marginBottom: 4 }}>
                        {errors.email}
                      </Text>
                    ) : null}
                    <TextInput
                      mode="outlined"
                      label="Password"
                      placeholder="Enter your Password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      textContentType="password"
                      secureTextEntry={true}
                      autoCorrect={false}
                    />
                    {errors.password && touched.password ? (
                      <Text style={{ color: "red", marginBottom: 4 }}>
                        {errors.password}
                      </Text>
                    ) : null}
                    <TextInput
                      mode="outlined"
                      label="Confirm Password"
                      placeholder="Enter Password again"
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      textContentType="password"
                      secureTextEntry={true}
                      autoCorrect={false}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Text style={{ color: "red", marginBottom: 4 }}>
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#6a11cb",
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                    disabled={this.state.isLoading}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={
                      this.props.authError || this.state.isLoading
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    {this.props.authError && !this.state.isLoading ? (
                      <Text
                        style={{
                          textAlign: "center",
                          color: "red",
                          paddingTop: 10,
                        }}
                      >
                        {this.props.authError}
                      </Text>
                    ) : (
                      <ActivityIndicator
                        animating={this.state.isLoading}
                        style={{ paddingTop: 10 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "#6a11cb" }}>
                      Already Have an Account ?{"  "}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("user-login")
                      }
                    >
                      <Text
                        style={{
                          borderBottomColor: "blue",
                          borderBottomWidth: 1,
                        }}
                      >
                        Log In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.Auth.authSignupError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateUser: (NewUser, setLoadingIndicator) =>
      dispatch(CreateUser(NewUser, setLoadingIndicator)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
