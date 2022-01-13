// import numeral from 'numeral';
// import { chainConfig } from '@configs';
// import { useRouter } from 'next/router';
// import {
//   VALIDATOR_DETAILS,
//   ACCOUNT_DETAILS,
//   BLOCK_DETAILS,
//   TRANSACTION_DETAILS,
//   PROFILE_DETAILS,
// } from '@utils/go_to_page';
// import { readValidator } from '@recoil/validators';
// import { toast } from 'react-toastify';

export const useSearchBar = (_t) => {
  // const router = useRouter();

  const handleOnSubmit = (_value: string, _clear?: () => void) => {
    console.log('search bar place holder');
  };

  return {
    handleOnSubmit,
  };
};
