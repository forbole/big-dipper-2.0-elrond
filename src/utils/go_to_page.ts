export const HOME = '/';
export const BLOCKS = '/blocks';
export const BLOCK_DETAILS = (hash: string) => `/blocks/${hash}`;
export const MINIBLOCK_DETAILS = (hash: string) => `/miniblocks/${hash}`;
export const TRANSACTIONS = '/transactions';
export const TRANSACTION_DETAILS = (hash: string) => `/transactions/${hash}`;
export const NODE_DETAILS = (hash: string) => `/nodes/${hash}`;
export const ACCOUNT_DETAILS = (hash: string) => `/accounts/${hash}`;
export const VALIDATORS = '/validators';
export const VALIDATOR_DETAILS = (hash: string) => `/validators/${hash}`;
export const TOKENS = '/tokens';
export const TOKEN_DETAILS = (token: string) => `/tokens/${token}`;
export const NFTS = '/nfts';
export const NFT_DETAILS = (nft: string) => `/nfts/${nft}`;
