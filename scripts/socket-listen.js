const { io } = require('socket.io-client');

const url = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io(url);

socket.on('connect', () => {
  console.log('socket connected to', url);
});

socket.on('vehicle_unavailable', (data) => {
  console.log('vehicle_unavailable', data);
});

socket.on('disconnect', () => {
  console.log('socket disconnected');
});

// keep process alive
setInterval(()=>{}, 1000);
