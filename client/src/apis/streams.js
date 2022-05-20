// import header from "./header";

// export const getAllRooms = () => {
//     return header.get("/room/all");
//   };


//   export const createNewRoom = room => {
//     return header.post("/room/newroom",room);
//   };

import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:3001'
})