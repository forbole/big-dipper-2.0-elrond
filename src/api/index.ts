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
export const IDENTITY = (identity: string) => `${BASE_URL}/identities/${identity}`;
export const PROVIDERS = `${BASE_URL}/providers`;
export const STAKE = `${BASE_URL}/stake`;
export const ROUNDS = `${BASE_URL}/rounds`;
export const NODE_DETAILS = (node: string) => `${BASE_URL}/nodes/${node}`;

// https://api.elrondscan.com/rounds?size=138&from=0&validator=003ba6237f0f7c269eebfecb6a0a0796076c02593846e1ce89aee9b832b94dd54e93d35b03dc3d5944b1aae916722506faf959a47cabf2d00f567ad50b10f8f1a40ab0316fdf302454f7aea58b23109ccfdce082bd16fb262342a1382b802c10&shard=2&epoch=558
