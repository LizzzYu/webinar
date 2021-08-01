import { useSelector } from 'react-redux';
import { formValueSelector, getFormNames } from 'redux-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormValues(...fields: string[]): any {
  const [formName] = useSelector((state) => getFormNames()(state).reverse());

  const values = useSelector((state) => {
    if (!formName) return undefined;

    return formValueSelector(formName)(state, ...fields);
  });

  return values;
}
