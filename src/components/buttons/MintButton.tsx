import React, { useEffect, useState } from 'react';
import { CandyMachineAccount } from '../../functions/candyMachine';
import { GatewayStatus, useGateway } from '@civic/solana-gateway-react';

const MintButton = ({
    onMint,
    candyMachine,
    isMinting,
}: {
    onMint: () => Promise<void>;
    candyMachine?: CandyMachineAccount;
    isMinting: boolean;
}) => {
    const { requestGatewayToken, gatewayStatus } = useGateway();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (gatewayStatus === GatewayStatus.ACTIVE && clicked) {
            onMint();
            setClicked(false);
        }
    }, [gatewayStatus, clicked, setClicked, onMint]);

    const getMintButtonContent = () => {
        if (candyMachine?.state.isSoldOut) {
            return 'SOLD OUT';
        } else if (candyMachine?.state.isPresale) {
            return 'PRESALE MINT';
        } else if (isMinting) {
            return 'MINTING';
        }

        return 'MINT';
    };
    const handleClick = async () => {
        setClicked(true);
        if (candyMachine?.state.isActive && candyMachine?.state.gatekeeper) {
            if (gatewayStatus === GatewayStatus.ACTIVE) {
                setClicked(true);
            } else {
                await requestGatewayToken();
            }
        } else {
            await onMint();
            setClicked(false);
        }
    };

    return (
        <button className={`btn text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 btn-lg btn-wide ${isMinting ? 'loading' : ''}`} onClick={handleClick}>
            {getMintButtonContent()}
        </button>
    );
};

export default MintButton;
