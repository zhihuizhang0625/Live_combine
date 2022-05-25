import history from '../history'
import {
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
} from './types'
import * as streamsApi from '../apis/streams'


export const createStream = (title, description) => async (dispatch,getState) =>{
    // const {userId } = getState().auth
    const response = await streamsApi.createNewStream({title, description})
    dispatch({ type: CREATE_STREAM, payload: response.data})
    history.push('/')
}
export const fetchStreams =() => async dispatch =>{
    const response = await streamsApi.getAllStreams();
    dispatch({ type:FETCH_STREAMS, payload: response.data })
}
export const fetchStream= (id) => async dispatch => {
    const response = await streamsApi.getStream(id)
    dispatch({ type:FETCH_STREAM, payload: response.data})
}

// export const createTutorial = (title, description) => async (dispatch) => {
    // try {
    //   const res = await TutorialDataService.create({ title, description });
  
    //   dispatch({
    //     type: CREATE_TUTORIAL,
    //     payload: res.data,
    //   });
  
    //   return Promise.resolve(res.data);
    // } catch (err) {
    //   return Promise.reject(err);
    // }
//   };
  
//   export const retrieveTutorials = () => async (dispatch) => {
//     try {
//       const res = await TutorialDataService.getAll();
  
//       dispatch({
//         type: RETRIEVE_TUTORIALS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };