export function validateRequired(value: string | number):'Field is not filled' | '' {
  return !value && value !== 0 ? 'Field is not filled' : '';
}

export default null;
