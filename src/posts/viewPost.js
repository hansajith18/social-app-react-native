import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { deletePost } from "../Store/Actions/postActions";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "./../Shared/header";
import EditPostModal from "./editPostModal";

const LeftContent = (props) => <Avatar.Icon {...props} icon="rss-box" />;

const ViewPost = ({ post, route, deletePost, navigation, uid }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header
        route={route}
        navigation={navigation}
        title={post && post.authorFirstName + "'s post"}
      />
      {!post && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#c2e9fb",
          }}
        >
          <ActivityIndicator
            animating={true}
            style={{ paddingTop: 10 }}
            size="large"
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              paddingTop: 10,
            }}
          >
            Please Wait...
          </Text>
        </View>
      )}
      {post && (
        <ScrollView>
          <Card>
            <Card.Title
              title={
                <Text
                  onPress={() =>
                    navigation.navigate("user profile", {
                      uid,
                      authorId: post.authorId,
                      authorName:
                        post.authorFirstName + " " + post.authorLastName,
                    })
                  }
                >
                  {post.authorFirstName + " " + post.authorLastName}
                </Text>
              }
              subtitle="Card Subtitle"
              left={LeftContent}
            />

            <Card.Content>
              <Title>{post.title}</Title>
              <Paragraph>{post.content}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: post.downloadURL }} />
            {uid === post.authorId ? (
              <Card.Actions>
                <Button onPress={() => deletePost(route.params.id, navigation)}>
                  Delete
                </Button>
                <Button onPress={() => setShowModal(!showModal)}>Edit</Button>
              </Card.Actions>
            ) : null}
          </Card>

          {/* edit Post Modal */}
          {uid === post.authorId ? (
            <EditPostModal
              showModal={showModal}
              setShowModal={setShowModal}
              route={route}
              navigation={navigation}
              post={post}
            />
          ) : null}
        </ScrollView>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.route.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null;
  return {
    post: post,
    uid: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id, navigation) => dispatch(deletePost(id, navigation)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "posts" }])
)(ViewPost);
