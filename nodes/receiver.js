let { Peer, BlockStore } = require("../js-dag-service/dist");
let { setupLibP2PHost } = require("../js-dag-service/dist/setup");
let { MemoryDatastore } = require("interface-datastore");
const MultiAddr = require("multiaddr");
let store = new BlockStore(new MemoryDatastore());

// const { stdinToStream, streamToConsole } = require('./stream')

// Chat protocol
let lite, host;
try {
  (async function () {
    host = await setupLibP2PHost(
      undefined, undefined, [
      "/ip4/0.0.0.0/tcp/4007",
      "/ip4/127.0.0.1/tcp/4008/ws",
    ]
    );
    

    lite = new Peer(store, host);
    await lite.start();
    let cid = "bafkreihw4ivoisgzmydfijpkbq6mcagnt2z7vpvqxd6ocxjp56k7tfuguu"
    let peerID = "Qmaj7msH1hj6T2ynmKRyC16dfbs5KWKBGh5pLsS4yPZjdM"

    console.log(peerID)
    await lite.swarm.connect(MultiAddr("/ip4/127.0.0.1/tcp/4005/p2p/"+peerID))
    let data2 = await lite.getFile(cid);
    console.log("data", data2);
    console.log("recieved", data2.toString());
   
  })();
} catch (error) {
  console.log(error);
}
