// import React, {useContext} from 'react';
//
// import css from './Wallet.module.css';
// const Input = ({placeholder, name, type, value, handleChange}) => (
//     <input
//         placeholder={placeholder}
//         type={type}
//         step="0.0001"
//         value={value}
//         onChange={(e) => handleChange(e, name)}
//         className={css.wallet__input}
//     />
// );
//
//
// const Wallet = () => {
//
//     const handleSubmit = (e) => {
//         // const {addressTo, amount, keyword, message} = formData;
//
//         e.preventDefault();
//
//         // if (!addressTo || !amount || !keyword || !message) return;
//
//         // sendTransaction();
//     };
//
//     const shortAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
//
//     return (
//         <>
//         </>
//         // <div className={css.wallet__block}>
//         //     <div className={css.wallet__transactions}>
//         //         <div>All transactions</div>
//         //         <div>
//         //             {transactions && transactions.map(transaction => <div key={transaction.timestamp}
//         //                                                                   className={css.wallet__transaction}>
//         //                 <a href={`https://goerli.etherscan.io/address/${transaction.addressFrom}`} target={"_blank"}
//         //                    rel={"noreferrer"}
//         //                    className={css.wallet__transaction__href}>From
//         //                     : {shortAddress(transaction.addressFrom)}</a>
//         //                 <a href={`https://goerli.etherscan.io/address/${transaction.addressTo}`} target={"_blank"}
//         //                    rel={"noreferrer"}
//         //                    className={css.wallet__transaction__href}>To
//         //                     : {shortAddress(transaction.addressTo)}</a>
//         //             </div>)}
//         //         </div>
//         //     </div>
//         //
//         //     <div className={css.wallet__card__and__form}>
//         //         <div className={css.wallet__card}>
//         //             {currentAccount && <span>Address : {shortAddress(currentAccount)};</span>}
//         //         </div>
//         //         <div className={css.wallet__form}>
//         //             <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
//         //             <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
//         //             <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange}/>
//         //             <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>
//         //             <button
//         //                 type="button"
//         //                 onClick={handleSubmit}
//         //                 className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
//         //             >
//         //                 Send now
//         // {/*            </button>*/}
//         // {/*        </div>*/}
//         // {/*    </div>*/}
//         // {/*</div>*/}
//     );
// };
//
// export {Wallet};
