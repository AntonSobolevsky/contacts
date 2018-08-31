export function getValue(key: string, data: any) {
  const parts = key.split('.');

  if (parts.length > 1) {
    const parent = parts.shift();

    return getValue(parts.join('.'), data[parent]);
  } else {
    return data[key];
  }
}
