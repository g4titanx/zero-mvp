import { ethers } from "ethers";
import omid from "./abi/OMID.json";


//// implement verification of credential
const config = useRuntimeConfig();
const abi = omid.abi;

export const mint = async (toAddress: string) => {
  const network = config.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(config.contract, abi, provider);
  const signer = new ethers.Wallet(config.privateKey!, provider);

  
  const data = contract.interface.encodeFunctionData("mint", [toAddress, false]);

  // creating and sending the transaction object
  try {
    const tx = await signer.sendTransaction({
      to: config.contract,
      from: signer.address,
      value: ethers.parseUnits("0.000", "ether"),
      data: data,
    });

    const receipt = await tx.wait();

    let hashData = {
      url: `https://holesky.etherscan.io/tx/${tx.hash}`,
      message: `Mined in block ${receipt!.blockNumber}`,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
    };

    return hashData;
  }
};

export const verify = async (toAddress: string, proof: string) => {
  const network = config.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(config.contract, abi, provider);
  const signer = new ethers.Wallet(config.privateKey!, provider);

  // verify proof saved on irys else throw error
  
  const data = contract.interface.encodeFunctionData("update", [toAddress, true]);

  // creating and sending the transaction object
  try {
    const tx = await signer.sendTransaction({
      to: config.contract,
      from: signer.address,
      value: ethers.parseUnits("0.000", "ether"),
      data: data,
    });

    const receipt = await tx.wait();

    let hashData = {
      url: `https://holesky.etherscan.io/tx/${tx.hash}`,
      message: `Mined in block ${receipt!.blockNumber}`,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
    };

    return hashData;
  }
};

export const hasHuman = async (toAddress: string) => {
  const network = config.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(config.contract, abi, provider);

  

  // creating and sending the transaction object
  try {
    const _hasHuman = await contract.hasHuman(toAddress);
    

    let hashData = {
      pass: _hasHuman,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
      pass: false,
    };

    return hashData;
  }
};

export const isVerified = async (toAddress: string) => {
  const network = config.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(config.contract, abi, provider);

  

  // creating and sending the transaction object
  try {
    const _isVerified = await contract.isVerified(toAddress);
    
    

    let hashData = {
      pass: _isVerified,
    };

    return hashData;
  } catch (error) {
    let hashData = {
      url: "",
      message: `Error: ${error}`,
      pass: false,
    };

    return hashData;
  }
};

export const getHuman = async (toAddress: string) => {
  const network = config.rpc;
  const provider = new ethers.JsonRpcProvider(network);

  const contract = new ethers.Contract(config.contract, abi, provider);

  // creating and sending the transaction object
  try {
    let arr: any[] = [];
    
    return (await contract.getHuman(toAddress)).map((value: any) => value.toString());
  } catch (error) {
    return [];
  }
};