import React from 'react';
import { ConnectWallet } from '../components/buttons';
import { NavbarInterface } from '../interfaces';

const NavbarComponent = (props: NavbarInterface) => {
    const { data } = props;
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-teal-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex">
                    <svg className="mr-3 h-10" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
                            fill="#76A9FA"
                        />
                        <path
                            d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
                            fill="#A4CAFE"
                        />
                        <path
                            d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
                            fill="#1C64F2"
                        />
                    </svg>
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-grey-400">
                        Dragon's Den
                    </span>
                </a>
                <div className="flex md:order-2">
                    <div className="flex-none">
                        <ConnectWallet address={props.address} />
                    </div>
                </div>
                <div
                    className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                    id="mobile-menu-4"
                >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#Overview"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Overview
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                {' '}
                                Feautures
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
