const initialState = {
  posts: [],
  loading: true,
  error: null,
};

const PostReducer = (state, action) => {
  switch (action.type) {
    case action.type.POST_DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case action.type.CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };

    case action.type.POST_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
  }
};

export { PostReducer, initialState };
