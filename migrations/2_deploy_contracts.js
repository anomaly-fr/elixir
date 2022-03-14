const Litres = artifacts.require('Litres')
const User = artifacts.require('User')
const Campaigns = artifacts.require('Campaigns')
//const LitresInterface = artifacts.require('LitresInterface')

module.exports = function (deployer) {
  // Don't deploy Interface contract; import them in the contracting implementing them
  // deployer.deploy(LitresInterface)
  // deployer.link(LitresInterface, Litres)
  deployer.deploy(Litres, 10000, 'Litres', 0, 'LIT')
  deployer.deploy(User)
  deployer.deploy(Campaigns)
}
