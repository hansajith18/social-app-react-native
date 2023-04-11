import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar, Card, Button, Title, Paragraph } from "react-native-paper";
import { connect } from "react-redux";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account-circle" />;

const PostSummery = ({ item, navigation, uid }) => {
  return (
    <>
      <View style={{ margin: 5 }}>
        <Card>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("user profile", {
                uid,
                authorId: item.authorId,
                authorName: item.authorFirstName + " " + item.authorLastName,
              })
            }
          >
            <Card.Title
              title={item.authorFirstName + " " + item.authorLastName}
              subtitle={uid === item.authorId ? "Post Id: " + item.id : null}
              left={LeftContent}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ViewPost", { id: item.id })}
          >
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.content}</Paragraph>
            </Card.Content>
          </TouchableOpacity>
          <Card.Actions>
            <Button
              onPress={() => navigation.navigate("ViewPost", { id: item.id })}
            >
              View Post
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(PostSummery);
