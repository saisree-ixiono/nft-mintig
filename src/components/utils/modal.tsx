/* eslint-disable react/jsx-key */
import TraitCard from './traitCard';
import React from 'react';

const Modal = (props: { data: any }) => {
    const { data } = props;
    return (
        <div>
            <label
                htmlFor="my-modal-2"
                className="btn text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
                Traits
            </label>
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="container flex flex-wrap justify-around items-stretch ">
                        {data.map((prop: any) => {
                            return <TraitCard trait={prop.value} name={prop.trait_type} />;
                        })}
                    </div>
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-2"
                            className="btn text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal;
