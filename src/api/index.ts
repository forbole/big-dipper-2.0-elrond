// ==================================
// DEFAULTS
// ==================================
export const BASE_URL = 'https://api.elrond.com';
export const POLLING_INTERVAL = 15000;

// ==================================
// APIS
// ==================================
export const LATEST_BLOCK_HEIGHT = `${BASE_URL}/blocks/count`;
export const TRANSACTIONS_COUNT = `${BASE_URL}/transactions/count`;
export const NODES_COUNT = `${BASE_URL}/nodes/count`;
export const ECONOMICS = `${BASE_URL}/economics`;
export const BLOCKS = `${BASE_URL}/blocks`;
export const BLOCK_DETAILS = (hash: string) => `${BASE_URL}/blocks/${hash}`;
export const MINIBLOCK_DETAILS = (hash: string) => `${BASE_URL}/miniblocks/${hash}`;
// export const MINI_BLOCK_TRANSACTIONS = (hash: string) => `${BASE_URL}/transactions/?miniBlockHash=${hash}`;
export const TRANSACTIONS = `${BASE_URL}/transactions`;
export const STATS = `${BASE_URL}/stats`;
export const PRICE_HISTORY = 'https://data.elrond.com/latestcomplete/quoteshistorical/egld/price';

// https://api.elrondscan.com/transactions?miniBlockHash=b9b689d2c28f051214255daeecd2190b31d24748e34d79a0ff9ddb5c167f8bcb
