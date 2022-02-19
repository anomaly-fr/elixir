const DonaCoin = artifacts.require('DonaCoin')
//const DonaCoinInterface = artifacts.require('DonaCoinInterface')

module.exports = function (deployer) {
  // Don't deploy Interface contract; import them in the contracting implementing them
  // deployer.deploy(DonaCoinInterface)
  // deployer.link(DonaCoinInterface, DonaCoin)
  deployer.deploy(DonaCoin, 100, 'DonaCoin', 2, 'DC')
}
