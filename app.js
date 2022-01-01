const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/protobuf/hello.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,

});

let helloProto = grpc.loadPackageDefinition(packageDefinition).com.rminhas.generated.proto;

function main() {
    const client = new helloProto.Greeter('127.0.0.1:9000', grpc.credentials.createInsecure());
    client.SayHello({"name":"rizwan"}, (err, response) => {
        console.dir(response)
        console.log('err:' + err)
    })
}
main();