import axios from 'axios';

export function fetchFiles() {
  return async function (dispatch) {
    try {
      // setLoading();
      const res = await axios.get('/files/all');
      // console.log(res.data);
      return dispatch({
        type: 'FETCH_FILES_FULFILLED',
        payload: res.data,
      });
    } catch (err) {
      // console.log(err);
      dispatch({
        type: 'FETCH_FILES_REJECTED',
        payload: err.message,
      });
    }
  };
}

export function fetchFilesInFolder({folderId}) {
  return async function (dispatch) {
    try {
      // setLoading();
      const res = await axios.get(`/folders/allFiles/${folderId}/files`);
      // console.log("FOLDERFILES::: ", res.data);
      return dispatch({
        type: 'FETCH_FILES_FULFILLED',
        payload: res.data,
      });
    } catch (err) {
      // console.log(err);
      dispatch({
        type: 'FETCH_FILES_REJECTED',
        payload: err.message,
      });
    }
  };
}

export function setLoading() {
  return {
    type: 'FETCH_FILES_PENDING' || 'ADD_FILE_PENDING' || 'DELETE_FILE_PENDING' || 'UPDATE_FILE_PENDING',
  };
}

export const checkRecentlyViewed = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/files/preview/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const fileDetails = (id) => async (dispatch) => {
  console.log(file._id);
  try {
    const response = await axios.get(`/files/read/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = (file) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_FILE_FULFILLED', payload: file._id });
    await axios.put(`/files/deleteToBin/${file._id}`);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'DELETE_FILE_REJECTED', payload: error.message });
  }
};

export const starFile = (file) => async (dispatch) => {
  const newFile = {
    ...file,
    isStarred: true,
  };

  try {
    dispatch({ type: 'STAR_FILE_FULFILLED', payload: newFile });
    const response = await axios.put(`/files/starFile/${file._id}`, { isStarred: true });
  } catch (error) {
    console.log(error);
  }
};
