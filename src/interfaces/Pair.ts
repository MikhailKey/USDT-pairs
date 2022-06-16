export interface Pair {
  base: string;
  baseAddress: string;
  counter: string;
  counterAddress: string;
  fee: string;
  lpAddress: string;
  poolAddress: string;
}

export interface PairFull {
  fee7d: string;
  fee24h: string;
  feeAllTime: string;
  leftLocked: string;
  leftPrice: string;
  lpLocked: string;
  meta: {
    base: string;
    baseAddress: string;
    counter: string;
    counterAddress: string;
    fee: string;
    lpAddress: string;
    poolAddress: string;
  };
  rightLocked: string;
  rightPrice: string;
  tvl: string;
  tvlChange: string;
  volume7d: string;
  volume24h: string;
  volumeChange24h: string;
}
