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
export const TRANSACTIONS = `${BASE_URL}/transactions`;
export const TRANSACTION_DETAILS = (hash: string) => `${BASE_URL}/transactions/${hash}`;
export const STATS = `${BASE_URL}/stats`;
export const PRICE_HISTORY = 'https://data.elrond.com/latestcomplete/quoteshistorical/egld/price';
export const IDENTITIES = `${BASE_URL}/identities`;
export const PROVIDERS = `${BASE_URL}/providers`;
