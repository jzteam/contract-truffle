var Web3 = require("web3");

var contract = require("@truffle/contract");
// 编译结果中包含 abi 和 部署网络合约信息
// "networks": {
//    "65": {
//      "events": {},
//      "links": {},
//      "address": "0x43AE50c78b4A4Ec141bd449DA662756EfEB2bb75",
//      "transactionHash": "0xb52679ec877e260482295b1ab9796e3bf36a3ffcb6a6fd6490d96471a59f9ec0"
//    }
// },
var data = require("../build/contracts/VRFConsumerExample.json");

// 返回合约抽象
var VRFConsumerExample = contract(data);

// 使用 OKTC 测试网
var provider = new Web3.providers.HttpProvider("https://exchaintestrpc.okex.org");
VRFConsumerExample.setProvider(provider);

// 通过合约抽象与合约交互，deployed 表示已经部署过的合约
VRFConsumerExample.deployed().then(function (instance) {
  // call 方式调用合约
  return instance.getRequestStatus.call(1);

}).then(result => {
  // return 0
  console.info(result.toString());
}).catch(err => {
  // 报错了！在这里处理异常信息
  console.info("try-catch:", err)
});