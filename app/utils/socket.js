const ioServer = require('socket.io');
const redisAdapter = require('socket.io-redis');
const ioEmmiter = require('socket.io-emitter');
const redis = require('redis');
const {promisify} = require('util');

const configure = (server, options) => {

    let io = new ioServer(server);

    let { pub, sub } = startRedis(options);

    io.adapter(redisAdapter({ pubClient: pub, subClient: sub }));

    startEvents(io, pub, sub);
};

const getAsync = async (client, get) => {
    const getAsync = promisify(client.get).bind(client);
    const res = await getAsync(get);

    return res;
};

const startRedis = (options) => {
    const pub = redis.createClient(options.port, options.host, { auth_pass: "" });
    const sub = redis.createClient(options.port, options.host, { auth_pass: "" });

    pub.on("error", function (err) {
        console.log("[REDIS] error pub" + err);
    });

    sub.on("error", function (err) {
        console.log("[REDIS] error sub" + err);
    });

    return { pub, sub };
};

const startEvents = (io, pub, sub) => {
    io.on('connection', async (socket) => {
    	let id = socket.id;
        console.log('[SOCKET] on.connection');

        io.emit('status', id+' is online');

        io.of('/').adapter.remoteJoin(id, id, function (err) {
            if(err){
                console.log("[SOCKET] remoteJoin err",err);
            }
        });

        pub.set(id, "online");

        // console.log("[REDIS] ", await getAsync(pub, id));
        // console.log("[REDIS] ", await getAsync(pub, "asd"));

        socket.on('disconnect',  () => {
            console.log('[SOCKET] on.disconnect');
            io.emit('status', id+' is offline');
            pub.set(id, "offline");
        });

        socket.on('message', function(message) {
            io.emit('message', message);
        });

    });
};

module.exports = {
    configure: configure
};