// @flow

import React from 'react';
import { Platform } from 'react-native';
import valid from 'card-validator';

import { FormField, TextInput, View } from '../../index';
import { CardLogo, type CardType } from './CardLogo';

function maskValue(value: string, gaps: Array<number>): string {
  if (gaps.length === 0) {
    return value;
  }

  function take(str: string, start: number, end: number) {
    const x = str.substring(start, end);
    return x;
  }

  return [0, ...gaps]
    .map((start, isx, arr) => take(value, start, arr[isx + 1] || Infinity))
    .join(' ')
    .trim();
}

type ValidationState = {
  card: ?{
    code: {
      name: string,
      size: number,
    },
    gaps: Array<number>,
    lengths: Array<number>,
    type: CardType,
    niceType: ?string,
  },
  isValid: boolean,
  isPotentiallyValid: boolean,
};

type Props = {
  name: string,
  label: string,
  size: number,
};

export class NumberInput extends React.Component<Props> {
  onChangeText = (formik: *) => (value: string) => {
    const sanitizedValue = value.trim().replace(/\s/g, '');
    formik.form.setFieldValue(formik.field.name, sanitizedValue);
    formik.form.setFieldTouched(formik.field.name);
  };

  render(): React$Node {
    const { name, label } = this.props;
    return (
      <FormField
        name={name}
        render={formik => {
          const valueRaw = formik.field.value || '';
          const validation: ValidationState = valid.number(valueRaw);
          return (
            <View flexDirection="row" style={{ alignItems: 'flex-start' }}>
              <View style={{ top: 31, marginRight: 10 }}>
                <CardLogo
                  type={validation.card ? validation.card.type : null}
                />
              </View>
              <View flex={1}>
                <TextInput
                  label={label}
                  error={
                    validation.isPotentiallyValid
                      ? ''
                      : 'Card number is not valid'
                  }
                  onChangeText={this.onChangeText(formik)}
                  value={maskValue(
                    valueRaw,
                    validation.card ? validation.card.gaps : []
                  )}
                  maxLength={this.props.size}
                  keyboardType={Platform.select({
                    ios: 'number-pad',
                    android: 'numeric',
                  })}
                />
              </View>
            </View>
          );
        }}
      />
    );
  }
}
