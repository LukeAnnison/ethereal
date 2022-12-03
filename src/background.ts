const { ethers } = require("ethers");
const { StreamrClient, StreamPermission } = require("streamr-client");
const createMetaMaskProvider = require("metamask-extension-provider");
const provider = createMetaMaskProvider();
import { format } from "date-fns";

import {badgeStakingOn} from "./utils/extension"
import { savePage } from "./utils/page";

const collectionAbi = require("./abi/collection.json");
const stakingAbi = require("./abi/ERLStaking.json");
const tokenAbi = require("./abi/token.json");

const collectionAddress = "0x83C0B3849F6D1abFF47D1694aA22526E6440B989";
const tokenAddress = "0x9B738D499494fcA7E697a206Fb83778d08bB19fe";
const stakingAddress = "0xbC89B661dA1605E1Cf256A28D6F0F97B305E1bF6";

const ethersProvider = new ethers.providers.Web3Provider(provider);
const signer = ethersProvider.getSigner();

const stakeNFTContract = new ethers.Contract(
  stakingAddress,
  stakingAbi,
  signer
);

const nftContract = new ethers.Contract(
  collectionAddress,
  collectionAbi,
  signer
);

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  chrome.storage.local.get(["toggle"], async (result) => {
  if (result.toggle) {
    console.log('result check', result.toggle)

  if (changeInfo.status === "complete") {

    if (tab.title !== "New Tab") {
      await savePage(
        tab.title,
        tab.url,
        format(new Date(), "MMMM dd, yyyy"),
        format(new Date(), "p")
      );
    }
  }
}
}
);
})


console.log('running background')


async function initialState() {
  console.log('running initial state')
  if (provider.selectedAddress) {
    let tokensOfOwner = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );
    let earningsInfo = await stakeNFTContract.earningsInfo(tokensOfOwner);
    console.log("earningsInfo", earningsInfo);

    let balance = await tokenContract.balanceOf(provider.selectedAddress);

    chrome.storage.local.get("toggle", (result) => {

  if (result.toggle) {

  badgeStakingOn();
  }
  });

    earningsInfo = convertBigNumToNumber(earningsInfo[0])
    console.log("earningsInfo", earningsInfo);

    balance = convertBigNumToNumber(balance);

    chrome.storage.local.set({ ["balance"]: balance, ["earnings"]: earningsInfo});

    chrome.runtime.sendMessage({ message: "balance", balance });
    chrome.runtime.sendMessage({ message: "connection", connected: true});
  } else {
    setTimeout(initialState, 250);
  }
    
}
initialState();

const fetchBalance = async () => {
  if (provider.selectedProvider) {
  }
};
fetchBalance();

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{

    console.log('message request', request.toggle);
    if( request.toggle === "toggleOn" )
    {
      console.log({request})
      streamingToggle(true)
    } else {
      streamingToggle(false)
    }
})

export const streamingToggle = async (streamingToggle) => {
  if (streamingToggle) {
    await subscribeEthereal();

    const tokenId = await aquireUserNFT();
    await stakeNFT(tokenId);
  } else {
    // streaming going from on to off

    await unsubscribeEthereal();

    // unstake nft

    let tokensOfOwner = await stakeNFTContract.tokensOfOwner(
      ethersProvider.provider.selectedAddress
    );

    tokensOfOwner = parseInt(tokensOfOwner, 16);
    // ubsubscribe ethereal from the stream

    await unstakeNFT(tokensOfOwner);
  }
};

const subscribeEthereal = async () => {
  const streamr = new StreamrClient({
    auth: {
      ethereum: provider,
    },
  });
  // check if stream exists
  const stream = await streamr.getOrCreateStream({
    id: `${ethersProvider.provider.selectedAddress}/packet`,
  });

  const subscription = await stream.grantPermissions({
    permissions: [StreamPermission.SUBSCRIBE],
    user: "0x0A7336f2C0fC2f0292F09945Aed2263ed6Dda3c5",
  });
};

const unsubscribeEthereal = async () => {

  const client = new StreamrClient({
    auth: {
      ethereum: provider,
    },
  });
  const stream = await streamr.getOrCreateStream({
    id: `${ethersProvider.provider.selectedAddress}/packet`,
  });
  const unsubscribe = await stream.revokePermissions({
    permissions: [StreamPermission.SUBSCRIBE],
    user: "0x0A7336f2C0fC2f0292F09945Aed2263ed6Dda3c5",
  });
};

async function aquireUserNFT() {
  // check if user already has nft

  // if not, create nft as below
  const mint = await nftContract.mint(
    ethersProvider.provider.selectedAddress,
    1
  );
  const receipt = await ethersProvider.waitForTransaction(mint.hash);
  const tokenId = parseInt(receipt.logs[0].topics[3], 16);
  return tokenId;
}

async function stakeNFT(tokenId) {
  const stake = await stakeNFTContract.stake([tokenId]);

}

const unstakeNFT = async (tokenId) => {
  const unstake = await stakeNFTContract.unstake([tokenId]);
};

const streamr = new StreamrClient({
  auth: {
    ethereum: provider,
  },
});


async function handleClaim() {
  const tokensOfOwner = await stakeNFTContract.tokensOfOwner(
    ethersProvider.provider.selectedAddress
  );

  const claim = await stakeNFTContract.claim(tokensOfOwner);

}

const convertBigNumToNumber = (bigNum) => {
  let num = parseInt(bigNum._hex, 16);
  num /= Math.pow(10, 18);
  // truncate to 2 decimal places
  num = Math.trunc(num * 100) / 100;
  return num;
};

