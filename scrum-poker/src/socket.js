import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const backend_url = "http://localhost:5000";
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// const io = new Server({
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });
  
// io.listen(5000);

// export const socket = io(URL, {
//     autoConnect: false
// });

export const socket = io(backend_url, {
    autoConnect: false,
    withCredentials: false,
});

