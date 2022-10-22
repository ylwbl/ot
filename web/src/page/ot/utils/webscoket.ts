import io from 'socket.io-client';


const createClient = () => {
    const client = io('http://localhost:9000', {
        transports: ['websocket']
    })
    client.on('connect', () => {
        console.log(1111)
    })
    client.on('message', () => {

    })
    return client;
}
export default createClient;