import { io } from 'socket.io-client'

const socket = io('http://localhost:8000', {
    query: {},
    transports: ['websocket', 'polling'],
    autoConnect: false,
})

export default socket;