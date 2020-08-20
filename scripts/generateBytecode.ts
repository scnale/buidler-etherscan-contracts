import fs from "fs/promises";
import { config, ethers } from "@nomiclabs/buidler";

import util from "util";

const contractName = "TestContractLib";
const constructorArguments: any[] = [ 50 ];
const libraryAddress = "0xa2d917811698d92D7FF80ed988775F274a51b435";

async function main() {
  const wallets = await ethers.getSigners();
  const deployer = wallets[0];

  const compilerOutput = require("../cache/solc-output.json") as CompilerOutput;
  const [major, minor] = config.solc.version.split(".").map((number) => parseInt(number, 10));
  const contractArtifact = compilerOutput.contracts[`contracts/solc-${major}.${minor}/${contractName}.sol`][contractName];

  const librarySlices = generateLibrarySlices(libraryAddress, contractArtifact.evm.bytecode.linkReferences);
  const linkedBytecode = "0x" + linkLibraries(contractArtifact.evm.bytecode.object, librarySlices);

  const contractFactory = new ethers.ContractFactory(contractArtifact.abi, linkedBytecode, deployer);
  const contract = await contractFactory.deploy(...constructorArguments/*, { gasLimit: 6 * (10 ** 6) }*/);
  const deployedBytecode = await ethers.provider.getCode(contract.address);
  const bytecodes = {
    contractName,
    runtimeBytecode: "0x" + contractArtifact.evm.deployedBytecode.object,
    deployedBytecode,
    solcVersion: config.solc.version,
    linkReferences: contractArtifact.evm.deployedBytecode.linkReferences,
    immutableReferences: contractArtifact.evm.deployedBytecode.immutableReferences,
  };

  await fs.mkdir(`./output/solc-${config.solc.version}`, { recursive: true });
  await fs.writeFile(`./output/solc-${config.solc.version}/${contractName}.json`, JSON.stringify(bytecodes));
}

// Generate slices for linking.
// Assumes there's only one library for this contract.
export function generateLibrarySlices(address: string, linkReferences: CompilerOutputBytecode['linkReferences']) {
  const [files] = Object.values(linkReferences);
  const [slices] = files ? Object.values(files) : [[]];
  const resolvedLinks = slices.map(({ start }) => {
    return { start, address };
  });

  return resolvedLinks;
}

export function linkLibraries(
  code: string,
  slices: Array<{ start: number; address: string }>
): string {
  for (const { start, address } of slices) {
    if (!ethers.utils.isAddress(address)) throw new Error("Not an address!");
    const addressSlice = address.slice(2);
    code = [
      code.slice(0, start * 2),
      addressSlice,
      code.slice(start * 2 + addressSlice.length),
    ].join("");
  }

  return code;
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


export interface CompilerOutput {
  contracts: {
    [globalName: string]: {
      [contractName: string]: {
        abi: any;
        evm: {
          bytecode: CompilerOutputBytecode;
          deployedBytecode: CompilerOutputBytecode;
        };
      };
    };
  };
}

export interface CompilerOutputBytecode {
  object: string;
  linkReferences: {
    [libraryFileGlobalName: string]: {
      [libraryName: string]: Array<{ start: 0; length: 20 }>;
    };
  };
  immutableReferences?: {
    [key: string]: Array<{ start: number; length: number }>;
  };
}