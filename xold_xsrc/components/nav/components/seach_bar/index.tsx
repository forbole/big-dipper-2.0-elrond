import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Search } from '@components';
import { chainConfig } from '@src/configs';
import { useSearchBar } from './hooks';

const SearchBar: React.FC<{className?: string}> = ({ className }) => {
  const { t } = useTranslation('common');
  const {
    handleOnSubmit,
  } = useSearchBar(t);

  const placeholderText = ('searchBarPlaceholder');

  return (
    <Search
      className={className}
      placeholder={placeholderText}
      callback={handleOnSubmit}
    />
  );
};

export default SearchBar;
