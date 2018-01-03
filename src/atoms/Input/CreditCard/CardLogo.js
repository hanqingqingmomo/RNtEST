// @flow

import React from 'react';
import { Image } from 'react-native';

const AMERICAN_EXPRESS = 'american-express';
const DINERS_CLUB = 'diners-club';
const DISCOVER = 'discover';
const JCB = 'jcb';
const MAESTRO = 'maestro';
const MASTERCARD = 'master-card';
const UNIONPAY = 'unionpay';
const VISA = 'visa';

export const types = {
  default: require('./logos/card.png'),
  [AMERICAN_EXPRESS]: require('./logos/amex.png'),
  [DINERS_CLUB]: require('./logos/diners.png'),
  [DISCOVER]: require('./logos/discover.png'),
  [JCB]: require('./logos/jcb.png'),
  [MAESTRO]: require('./logos/maestro.png'),
  [MASTERCARD]: require('./logos/mastercard.png'),
  [UNIONPAY]: require('./logos/union.png'),
  [VISA]: require('./logos/visa.png'),
};

export type CardType = $Keys<typeof types>;

type Props = {
  type: ?CardType,
};

export function CardLogo(props: Props) {
  const source = props.type === null ? types.default : types[props.type];
  return <Image source={source} width={32} height={20} />;
}
