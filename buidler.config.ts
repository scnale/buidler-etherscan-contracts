import { usePlugin, task } from "@nomiclabs/buidler/config";
// import { TASK_COMPILE_GET_COMPILER_INPUT } from "@nomiclabs/buidler/builtin-tasks/task-names";

usePlugin("@nomiclabs/buidler-ethers");

const solcVersion = {
  major: 0,
  minor: 7,
  patch: 0,
  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

// Useful to generate bytecode with specific characteristics.
// task(TASK_COMPILE_GET_COMPILER_INPUT).setAction(async (_, __, runSuper) => {
//   const input = await runSuper();
//   input.settings.metadata.bytecodeHash = "none";
//   return input;
// })

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
