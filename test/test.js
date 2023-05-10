// 硬件钱包
const HDWalletProvider = require('@truffle/hdwallet-provider');
// 配置钱包私钥/助记词
const { mnemonic } = require('../env.json');
// 合约抽象模块
var contract = require("@truffle/contract");
// 加载abi，这里使用 truffle compile 得到的文件即可
var data = require("../build/contracts/VRFConsumerExample.json");

// 返回合约抽象
var VRFConsumerExample = contract(data);

// 为合约抽象设置钱包和网络
VRFConsumerExample.setProvider(new HDWalletProvider(mnemonic, "https://exchainrpc.okex.org"))

// 为合约抽象模块指定已有的一个合约地址，返回合约抽象实例
VRFConsumerExample.at("0x2c55dd0ce6ee1015116c4fbf6a95a42dc85c67b5").then((instance) => {

  // 以 方法调用 的方式与合约交互，必须指定 from。合约抽象实例会根据 abi 封装 tx，用 HDWalletProvider 钱包签名发到网络。
  return instance.requestRandomWords({ from: "0x232e1E0801288049ac68F06Fd25da781d1362871"});

}).then((result) => {
  console.log(result);
}).catch(err => {
  // 报错了！在这里处理异常信息
  console.info("try-catch:", err);
});


