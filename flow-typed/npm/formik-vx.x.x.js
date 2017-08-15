declare module 'formik' {
  // prettier-ignore
  declare type StatelessComponent<P> = (props: P) => ?React$Element<any>;

  // prettier-ignore
  declare class ConnectedComponent<OP, P, Def, St> extends React$Component<Def, OP, St> {
    props: OP;
  }

  // prettier-ignore
  declare type ConnectedComponentClass<OP, V, Def, St> = Class<ConnectedComponent<OP, V, Def, St>>;

  // prettier-ignore
  declare type Connector<P, V> = {
    (component: StatelessComponent<P>): *;
    (component: Class<React.Component<void, V, void>>): *;
    <Def, St>(component: Class<React.Component<Def, V, St>>): *;
  };

  // prettier-ignore
  declare type FormikValues<Values, T> = {
    [key: $Keys<Values>]: T,
  };

  // prettier-ignore
  declare type FormikErrors<Values> = FormikValues<Values, string | void>;

  // prettier-ignore
  declare type FormikTouched<Values> = FormikValues<Values, boolean | boid>;

  // prettier-ignore
  declare interface FormikState<Values> {
    values: Values,
    errors: FormikErrors<Values>,
    touched: {
      [key: $Keys<Values>]: boolean | void,
    },
    isSubmitting: boolean,
  }

  // prettier-ignore
  declare interface FormikConfig<Props, Values> {
    displayName?: string,
    mapPropsToValues?: (props: Props) => Values,
    validate?: (
      values: Values,
      props: Props
    ) => void | FormikErrors<Values> | Promise<any>,
    validationSchema?: any,
    handleSubmit: (values: Values, formikBag: FormikBag<Props, Values>) => void,
    validateOnChange?: boolean,
    validateOnBlur?: boolean,
  }

  // prettier-ignore
  declare type FormikProps<Props, Values> = Props & {
    // State
    values: Values,
    errors: FormikErrors<Values>,
    touched: FormikTouched<Values>,
    isSubmitting: boolean,
    // Actions
    setErrors: (errors: FormikErrors<Values>) => void,
    setSubmitting: (isSubmitting: boolean) => void,
    setTouched: (touched: FormikTouched<Values>) => void,
    setValues: (values: Values) => void,
    setFieldValue: (field: $Keys<Values>, value: string) => void,
    setFieldError: (field: $Keys<Values>, message: string) => void,
    setFieldTouched: (field: $Keys<Values>, isTouched?: boolean) => void,
    resetForm: (nextProps?: Props) => void,
    submitForm: () => void,
    // Handlers
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    handleChange: (e: React.ChangeEvent<any>) => void,
    handleBlur: (e: any) => void,
    handleChangeValue: (name: $Keys<Values>, value: any) => void,
    handleReset: () => void,
    // Computed props
    dirty: boolean,
  };

  // prettier-ignore
  declare type FormikBag<Props, Values> = {
    props: Props,
    setErrors: (errors: FormikErrors<Values>) => void,
    setSubmitting: (isSubmitting: boolean) => void,
    setTouched: (touched: FormikTouched<Values>) => void,
    setValues: (values: Values) => void,
    setFieldValue: (field: $Keys<Values>, value: string) => void,
    setFieldError: (field: $Keys<Values>, message: string) => void,
    setFieldTouched: (field: $Keys<Values>, isTouched?: boolean) => void,
    resetForm: (nextProps?: Props) => void,
    submitForm: () => void,
  };

  // prettier-ignore
  declare function Formik<Props, Values>(config: FormikConfig<Props, Values>): Connector<Props, Values>;

  // prettier-ignore
  declare function yupToFormErrors<Values>(yupError: any): FormikErrors<Values>;

  // prettier-ignore
  declare function validateYupSchema<T>(data: T, schema: any): Promise<void>;

  // prettier-ignore
  declare function touchAllFields<T>(fields: T): FormikTouched<T>;
}
