import React from "react";
import { View, FlatList } from "react-native";
import PostSummery from "./postSummery";

const PostList = (props) => {
  return (
    <>
      <FlatList
        data={props.posts}
        renderItem={({ item }) => (
          <PostSummery item={item} navigation={props.navigation} />
        )}
      />
    </>
  );
};

export default PostList;
