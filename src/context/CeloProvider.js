// const Moralis = require("moralis").default;
// const {EvmChain} = require("@moralisweb3/common-evm-utils");
//
// const runApp = async () => {
//     await Moralis.start({
//         apiKey: "XlLQkrCRIMM35EqJiRFZMDCWPZDd5qKDDKePiKbwXnGQbNNHrf9jGEYbkb8e9VY1",
//     });
//
//     const address = "0xb3c9647d0a5b6accda8dde363c37f2511ecd57e1";
//     const chain = EvmChain.POLYGON;
//
//     // const result = Moralis.EvmApi.utils.runContractFunction({
//     //     abi:
//     // });
//     const response = await Moralis.EvmApi.transaction.getWalletTransactions({
//         address,
//         chain,
//     });
//     console.log(response.toJSON());
//
// }
//
// runApp()
