import header from "./header";

export const getAllStreams = () => {
    return header.get("/stream/all");
  };

  export const getStreamsByBusinessId = (businessId) => {
    return header.get(`/stream/business/${businessId}`);
  };

export const getStream = (id) => {
    return header.get(`/stream/${id}`);
  };

  export const getStreambyToken = (token) => {
    return header.get(`/stream/${token}`);
  };


  export const createNewStream = (businessId,stream) => {
    return header.post(`/stream/newstream/${businessId}`,stream);
  };

  export const updateStream =(id, stream) => {
    return header.put(`/stream/update/${id}`,stream);
  };

  

// import axios from 'axios';

// export default axios.create({
//     baseURL:'http://localhost:3001'
// })