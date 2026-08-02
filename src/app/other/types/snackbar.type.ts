export type SnackBarTypes = 'info' | 'success' | 'error';

export type MethodType = 'POST' | 'PATCH' | 'DELETE';

export type SnackbarComponentData<T = unknown> = {
  title: SnackBarTypes;
  data?: T;
  i18nKeyOrMessage?: string;
  errorStatus?: number;
  methodType?: MethodType;
  plural?: boolean;
};

export type SnackBarData = Omit<SnackbarComponentData, 'title'>;
