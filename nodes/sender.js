let { Peer, BlockStore } = require("../js-dag-service/dist");
let { setupLibP2PHost } = require("../js-dag-service/dist/setup");
let { MemoryDatastore } = require("interface-datastore");
const fs = require("fs");

let store = new BlockStore(new MemoryDatastore());
let content = fs.createReadStream('test.txt');
var source = [
  {
    path: "bar",
    content: content,
  },
];
try {
  (async function () {
    let host = await setupLibP2PHost(undefined, undefined, [
      "/ip4/0.0.0.0/tcp/4005",
      "/ip4/127.0.0.1/tcp/4006/ws",
    ]);


    let lite = new Peer(store, host);

    
    await lite.start();
    
    let data = await lite.addFile(source, {codec: "dag-pb", rawLeaves: false });
    console.log(data)


    console.log(lite.host.peerId._idB58String.toString())    
  })();
} catch (error) {
  console.log(error);
}
