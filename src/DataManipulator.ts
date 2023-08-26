import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): (string | number | Date)[] {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upper_bound = 1 + 0.01;
    const lower_bound = 1 - 0.01;
    const timestamp = serverResponds[0].timestamp > serverResponds[1].timestamp ?
      serverResponds[0].timestamp : serverResponds[1].timestamp;
    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : ''; // Default to an empty string if undefined

    return [
      priceABC,
      priceDEF,
      ratio,
      timestamp,
      upper_bound,
      lower_bound,
      trigger_alert,
    ];
  }
}


