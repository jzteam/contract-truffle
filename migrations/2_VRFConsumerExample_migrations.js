// 告诉 truffle 要与哪个合约交互，artifacts.require(合约类名) 返回的是合约抽象
var consumer = artifacts.require("VRFConsumerExample");
module.exports = function (deployer) {
  deployer.deploy(consumer, 3, "0xCC5169D5484eEc4Bf3a0caF388773aC4c3e1eD7a", "0x042158abfa1748a71524546afea06756f6e290f3a3122bacf2ca8f6d2f1e6955", 100000, 1, 1);
};