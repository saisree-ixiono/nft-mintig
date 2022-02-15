import React from 'react';
import { MintButton } from '../components/buttons';
import Card from '../components/Card';

interface StatsProps {
    nftData: {
        itemsRemaining: number;
        itemsAvailable: number;
        itemsRedeemed: number;
        itemPrice: any;
    };
    mintData: {
        candyMachine: any;
        isUserMinting: any;
        onMint: any;
    };
}

const Stats = (props: StatsProps) => {
    return (
        <div className=" bg-teal-800 px-10 py-10">
            {/* Left */}

            {/* Right */}
            <div className="conatiner flex flex-wrap justify-center items-center ">
                <div className="container flex flex-col items-center">
                    <MintButton
                        candyMachine={props.mintData.candyMachine}
                        isMinting={props.mintData.isUserMinting}
                        onMint={props.mintData.onMint}
                    />
                </div>
            </div>
            <div className="container  flex flex-wrap justify-center items-center ">
                <div className="container text-center flex flex-wrap ">
                    {
                        // eslint-disable-next-line no-constant-condition
                        props.nftData.itemsAvailable == 0 ? (
                            <div style={{ marginLeft: '33%', marginTop: '60px', width: '100%' }}>
                                <Card value={'Login with your wallet to see'} />
                            </div>
                        ) : (
                            <>
                                <Card title={'Token Name'} value={'DWAR'} />
                                <Card title={'Token Price'} value={` ${props.nftData.itemPrice} sol`} />
                                <Card title={'Total Eyes'} value={props.nftData.itemsAvailable} />
                                <Card title={'Total Minted'} value={props.nftData.itemsRedeemed} />
                                <Card title={'Remaining'} value={props.nftData.itemsRemaining} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Stats;
