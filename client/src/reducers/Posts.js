const initialState = {
  posts: [],
};

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_POSTS':
      return {
        ...state,
        posts: [action.data],
      };
    default:
      return state;
  }
};

export default Posts;
