const initState = {};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT_SUCCESS":
      console.log("create project success");
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("create project error", action.err);
      return state;
    case "UPLOAD_ERROR":
      console.log("Image upload failed", action.err);
      return state;
    case "UPLOAD_SUCCESS":
      console.log("Image upload success");
      return state;
    case "EDIT_PROJECT_SUCCESS":
      console.log("Edit project success");
      return state;
    case "EDIT_PROJECT_ERROR":
      console.log("Edit project error", action.err);
      return state;
    case "DELETE_POST":
      console.log("Delete Post Success");
      return state;
    case "DELETE_POST_ERROR":
      console.log("Delete Post error", action.err);
      return state;
    default:
      return state;
  }
};

export default PostReducer;
