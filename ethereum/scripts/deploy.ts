import { ethers } from "hardhat";

async function main() {
  const LiveNFT = await ethers.getContractFactory("LiveNFT");
  const nft = await LiveNFT.deploy();

  await nft.deployed();

  console.log(
    `NFT contract deployed at ${nft.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
