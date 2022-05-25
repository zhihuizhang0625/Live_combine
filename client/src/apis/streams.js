import header from "./header";

export const getAllStreams = () => {
    return header.get("/stream/all");
  };

export const getStream = (id) => {
    return header.get(`/stream/${id}`);
  };


  export const createNewStream = stream => {
    return header.post("/stream/newstream",stream);
  };

// import axios from 'axios';

// export default axios.create({
//     baseURL:'http://localhost:3001'
// })