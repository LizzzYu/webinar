export function validateEmail(value: string | undefined):'Field is not filled' | 'Wrong Email Format' | '' {
  if (!value) return 'Field is not filled';

  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return value && reg.test(String(value).toLowerCase()) ? '' : 'Wrong Email Format';
}

export default null;
