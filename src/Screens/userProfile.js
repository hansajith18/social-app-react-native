import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "./../Shared/header";
import { connect } from "react-redux";
import PostSummery from "../posts/postSummery";
import { Avatar } from "react-native-paper";
import { ChooseImage } from "../Shared/handleImageUpload";
import EditProfileModal from "../posts/editProfileModal";

const UserProfile = ({ navigation, route, profile, userPosts, uid }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header
        route={route}
        navigation={navigation}
        title={route.params.authorName}
      />
      <ScrollView>
        <Text>
          {route.params.authorId === uid
            ? "User Id : " + route.params.authorId
            : null}
        </Text>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            disabled={route.params.authorId !== uid}
          >
            <Avatar.Image size={200} source={{ uri: profile.profileImage }} />
          </TouchableOpacity>
          <Text
            style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}
          >
            {route.params.authorName}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("listUpload")}>
          <Text>List Image</Text>
        </TouchableOpacity>
        {userPosts &&
          userPosts.map((userPost) => (
            <PostSummery
              item={userPost}
              navigation={navigation}
              key={userPost.id}
            />
          ))}
      </ScrollView>

      {/* edit Profile Modal */}
      {uid === route.params.authorId ? (
        <EditProfileModal
          showModal={showModal}
          setShowModal={setShowModal}
          uid={uid}
          navigation={navigation}
          profile={profile}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const authorId = ownProps.route.params.authorId;
  const uid = state.firebase.auth.uid;
  const posts = state.firestore.ordered.posts;
  const userPosts = posts.filter((post) => {
    return post.authorId === authorId;
  });
  return {
    profile: state.firebase.profile,
    userPosts,
    uid,
  };
};

export default connect(mapStateToProps)(UserProfile);
