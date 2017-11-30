// @flow

import React from 'react';

import { Picker, TextInput, FormField } from '../index';

type Props = {
  name: string,
  label: string,
};

export class USStateSelector extends React.Component<Props> {
  onChange = (formik: *) => (states: Array<string>) => {
    formik.form.setFieldValue(formik.field.name, states[0]);
    formik.form.setFieldTouched(formik.field.name, true);
  };

  render(): React$Node {
    return (
      <FormField
        name={this.props.name}
        label={this.props.label}
        render={formik => {
          const state = DATA.find(row => row.code === formik.field.value);
          return (
            <Picker
              title={this.props.label}
              trigger={
                <TextInput
                  label={this.props.label}
                  value={state ? state.name : ''}
                  error={
                    formik.form.touched[formik.field.name]
                      ? formik.form.errors[formik.field.name]
                      : undefined
                  }
                />
              }
              data={DATA}
              optionKeyExtractor={(item: *) => item.code}
              extractOption={(item: *) => ({
                label: item.name,
                value: item.code,
              })}
              selectedValues={[formik.field.value]}
              onValuesChange={this.onChange(formik)}
            />
          );
        }}
      />
    );
  }
}

const DATA = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'District Of Columbia', code: 'DC' },
  { name: 'Federated States Of Micronesia', code: 'FM' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Guam', code: 'GU' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Palau', code: 'PW' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virgin Islands', code: 'VI' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' },
];
