import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PostList from "../posts/postList";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons, FontAwesome } from "react-native-vector-icons/Ionicons";
import Header from "./../Shared/header";

class HomeScreen extends Component {
  render() {
    const { posts, navigation, auth, route } = this.props;

    return (
      <>
        <Header route={route} navigation={navigation} title="WeChat" />

        {!posts && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator animating={true} color="blue" />
          </View>
        )}
        {posts && <PostList posts={posts} navigation={navigation} />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    posts: state.firestore.ordered.posts,
  };

  // ! if you not return an object
  // ***  mapStateToProps() in Connect(FirestoreConnect(Home)) must return a plain object. Instead received undefined.
  // ? this error will occure
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "posts" }])
)(HomeScreen);
