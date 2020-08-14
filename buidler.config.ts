import { usePlugin } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-ethers");

const solcVersion = {
  major: 0,
  minor: 6,
  patch: 5,
  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

module.exports = {
  solc: {
    version: solcVersion.toString(),
  },
  paths: {
    sources: `contracts/solc-${solcVersion.major}.${solcVersion.minor}`,
    artifacts: `artifacts/solc-${solcVersion}`,
  },
  networks: {
    ganacheStandalone: {
      url: "http://localhost:9000"
    }
  },
};
