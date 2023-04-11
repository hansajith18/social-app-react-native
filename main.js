import React from "react";
import { connect } from "react-redux";
import HomeTabNav from "./src/Routes/homeTab";
import AuthStack from "./src/Routes/authStack";

const Main = (props) => (props.auth.isEmpty ? <AuthStack /> : <HomeTabNav />);

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Main);
