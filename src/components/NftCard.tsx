import React from 'react';
import Modal from './utils/modal';
import pand from '../views/panda1.jpeg';

import { nft } from '../content';

const NftCard = () => {
    return (
        <div className="card bg-teal-900 max-w-lg card-bordered card-compact flex items-center lg:card-normal shadow-2xl mb-5">
            <figure className="px-10 pt-10" style={{ width: '300px', height: '250px' }}>
                <img src={pand} alt="" className="rounded-xl w-full h-full" />
            </figure>
            <div className="card-body">
                <Modal data={nft.attributes} />
                <h2 className="pt-5 card-title text-secondary font-extrabold">{nft.name}</h2>
                <p>{nft.description}</p>
            </div>
        </div>
    );
};

export default NftCard;
