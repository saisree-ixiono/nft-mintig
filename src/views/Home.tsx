import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Stats from './Stats';
import Footer from './Footer';
import Carousel from './carousel';
// import * as panda from '../views/panda.png';
import { HomeProps } from '../interfaces';
import { navbar, mainHero } from '../content';
import * as anchor from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import NftCard from '../components/NftCard';

import {
    awaitTransactionSignatureConfirmation,
    getCandyMachineState,
    mintOneToken,
    shortenAddress,
    CandyMachineAccount,
} from '../functions/candyMachine';
import Alert from '../components/Alert';

function Home({ data }: HomeProps) {
    const [isUserMinting, setIsUserMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [itemsRedeemed, setItemsRedeemed] = useState(0);
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [itemPrice, setitemPrice] = useState(0);

    const metadata = [
        {
            title: 'Token Name',
            value: 'MEYE',
        },
    ];

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: '',
    });
    // TODO:Timer

    const rpcUrl = data.rpcHost;
    const wallet = useWallet();

    const anchorWallet = useMemo(() => {
        if (!wallet || !wallet.publicKey || !wallet.sendTransaction || !wallet.signAllTransactions) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.sendTransaction,
        } as unknown as typeof anchor.Wallet;
    }, [wallet]);

    const refreshCandyMachine = useCallback(async () => {
        if (!anchorWallet) return;

        if (data.id) {
            try {
                const cndy = await getCandyMachineState(anchorWallet, data.id, data.connection);

                const {
                    state: { itemsAvailable, itemsRedeemed, itemsRemaining, price },
                } = await getCandyMachineState(anchorWallet, data.id, data.connection);
                setItemsAvailable(itemsAvailable);
                setItemsRedeemed(itemsRedeemed);
                setItemsRemaining(itemsRemaining);
                setitemPrice(price.toNumber() / 10 ** 9);
                setCandyMachine(cndy);
            } catch (error) {
                console.log('Error fetching candy machine state');
                console.error(error);
            }
        }
    }, [anchorWallet, data.id, data.connection]);

    const onMint = async () => {
        try {
            setIsUserMinting(true);
            document.getElementById('#identity')?.click();
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                const mintTxId = (await mintOneToken(candyMachine, wallet.publicKey))[0];
                let status: any = { err: true };
                if (mintTxId) {
                    status = await awaitTransactionSignatureConfirmation(
                        mintTxId,
                        data.txTimeoutInMilliseconds,
                        data.connection,
                        true
                    );
                }

                if (status && !status.err) {
                    setAlert({
                        open: true,
                        message: 'Congratulations! Mint successful!',
                        severity: 'alert-success',
                    });
                } else {
                    setAlert({
                        open: true,
                        message: 'Mint Failed! Please try again.',
                        severity: 'alert-error',
                    });
                }
            }
        } catch (error: any) {
            let message = error.msg || 'Minting failed! Please try again!';
            if (!error.msg) {
                if (!error.message) {
                    message = 'Transaction Timeout! Please try again.';
                } else if (error.message.indexOf('0x137')) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf('0x135')) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    window.location.reload();
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlert({
                open: true,
                message,
                severity: 'alert-warning',
            });
        } finally {
            setIsUserMinting(false);
        }
    };

    useEffect(() => {
        refreshCandyMachine();
    }, [anchorWallet, data.id, data.connection, refreshCandyMachine]);

    return (
        <div className="bg-gray-900">
            <Navbar
                data={navbar}
                address={(anchorWallet && shortenAddress(wallet.publicKey?.toBase58())) || 'Connect Wallet'}
            />

            <Hero data={mainHero} />
            {/* <Carousel /> */}

            {alert.open ? (
                <Alert
                    msg={alert.message}
                    serv={alert.severity}
                    onClick={() => {
                        setAlert({ ...alert, open: false });
                    }}
                />
            ) : (
                ''
            )}
            <div className="flex shadow-slate-500 justify-evenly">
                <div className="w-1/2 align-text-bottom">
                    <div className="container align-text-bottom">
                        <h1
                            id="Overview"
                            className="text-2xl mt-10 underline decoration-double align-text-bottom text-justify"
                        >
                            Overview
                        </h1>
                        <h4>
                            NFT stands for "non-fungible token," which is a type of digital certificate built on a
                            blockchain — usually Ethereum (CRYPTO:ETH) — that guarantees ownership of a unique digital
                            asset. Minting digital assets (everything from art to music to articles) as an NFT is a way
                            for artists to monetize their work. Of course, selling digital files isn't new. But one of
                            the more innovative uses for NFTs is the ability to guarantee yourself as the original
                            creator. Because NFTs are recorded on a blockchain, the creator of the NFT is recorded in
                            the public ledger. Therefore, you can set a fee for whenever that digital asset is sold in
                            the future (known in the business world as a royalty) and earn passive income over time if
                            your work is sold on the secondary market.
                        </h4>
                    </div>
                </div>
                {/* <NftCard /> */}
                <NftCard />
            </div>
            <Stats
                nftData={{ itemsRemaining, itemsAvailable, itemsRedeemed, itemPrice }}
                mintData={{ candyMachine, isUserMinting, onMint }}
            />
            <Footer />
        </div>
    );
}

export default Home;
