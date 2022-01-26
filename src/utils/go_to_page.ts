export const HOME = '/';
export const BLOCKS = '/blocks';
export const BLOCK_DETAILS = (hash: string) => `/blocks/${hash}`;
export const MINIBLOCK_DETAILS = (hash: string) => `/miniblocks/${hash}`;
export const TRANSACTIONS = '/transactions';
export const TRANSACTION_DETAILS = (hash: string) => `/transactions/${hash}`;
export const NODE_DETAILS = (hash: string) => `/nodes/${hash}`;
export const ACCOUNT_DETAILS = (hash: string) => `/accounts/${hash}`;
