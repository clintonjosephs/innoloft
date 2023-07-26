import React from 'react';
import { useRouter } from 'next/router';

const NavBar: React.FC<{ offer_title: string; edit: boolean }> = ({
  offer_title,
  edit,
}) => {
  const router = useRouter();
  const editOffer = () => {
    router.push('/products/edit');
  };

  const viewOffer = () => {
    router.back();
  }
  return (
    <div className="flex flex-row justify-between">
      <ul className="md:ml-5 mb-4 flex items-center text-sm">
        <li>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_10890_762)">
              <path
                d="M13 16H1.3335C1.20089 16 1.07371 15.9473 0.979943 15.8536C0.886175 15.7598 0.833496 15.6326 0.833496 15.5V7.16652C0.833472 7.10085 0.846399 7.03583 0.871538 6.97517C0.896676 6.91452 0.933533 6.85941 0.979996 6.81302L7.6465 0.146515C7.74026 0.0527798 7.86741 0.00012207 8 0.00012207C8.13258 0.00012207 8.25973 0.0527798 8.3535 0.146515L15.02 6.81302C15.0665 6.85941 15.1033 6.91452 15.1285 6.97517C15.1536 7.03583 15.1665 7.10085 15.1665 7.16652V13.8335C15.1665 13.9661 15.1138 14.0933 15.0201 14.1871C14.9263 14.2808 14.7991 14.3335 14.6665 14.3335C14.5339 14.3335 14.4067 14.2808 14.3129 14.1871C14.2192 14.0933 14.1665 13.9661 14.1665 13.8335V7.37352L8 1.20702L1.8335 7.37352V15H13C13.1326 15 13.2598 15.0527 13.3535 15.1465C13.4473 15.2402 13.5 15.3674 13.5 15.5C13.5 15.6326 13.4473 15.7598 13.3535 15.8536C13.2598 15.9473 13.1326 16 13 16Z"
                fill="#374151"
              />
            </g>
            <defs>
              <clipPath id="clip0_10890_762">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
              fill="#9CA3AF"
            />
          </svg>
        </li>
        <li>Offers</li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
              fill="#9CA3AF"
            />
          </svg>
        </li>
        <li>{offer_title}</li>
      </ul>
      {edit ? (
        <button
          className="bg-[#272E71] hover:bg-[#272E71] text-white font-bold px-2 py-1.5 rounded mb-4 text-xs"
          onClick={viewOffer}
        >
          View Offer
        </button>
      ) : (
        <button
          className="bg-[#272E71] hover:bg-[#272E71] text-white font-bold px-2 py-1.5 rounded mb-4 text-xs"
          onClick={editOffer}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default NavBar;
