var Web3 = require("web3");

var contract = require("@truffle/contract");
var data = require("../build/contracts/VRFConsumerExample.json");

// 返回合约抽象
var VRFConsumerExample = contract(data);

// 使用 OKTC 测试网
var provider = new Web3.providers.HttpProvider("https://exchaintestrpc.okex.org");
VRFConsumerExample.setProvider(provider);


var contractInstance;
// 通过合约抽象与合约交互，deployed 表示已经部署过的合约。因为truffle部署过的合约，在 build/*.json中保留有网络和合约地址信息
VRFConsumerExample.deployed().then(function (instance) {
  contractInstance = instance;

  // 以 transaction 方式与合约交互
  return contractInstance.requestRandomWords();

  // 也可以添加一个参数，它不是合约中的，而是合约抽象API中的，用于指定交易细节
  // 比如写入 from，保证交易的 from 是来自 web3.eth.accounts[0]
  // return contractInstance.requestRandomWords({ from: VRFConsumerExample.web3.eth.accounts[0] });

}).then(result => {
  // result 是上一个 then 返回的对象
  console.info("上链完毕 result=", result);
  return result;
  
}).then((requestId) => {
  // 调用 contract 的 get 方法
  console.info("回调验证 requestId=", requestId);
  return contractInstance.getRequestStatus.call(requestId);
}).then(result => {
  // 正常返回，说明我们之前的调用成功了！
  console.info(result.toString());
}).catch(err => {
  // 报错了！在这里处理异常信息
  console.info("try-catch:", err);
});