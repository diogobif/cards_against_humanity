export function checkIsEmpty<T>(value: T[]): boolean {
  return value.length === 0;
}

export function getLastElementFromArray<T>(value: T[]): T | undefined {
  if (checkIsEmpty(value)) {
    return undefined;
  }

  return value[value.length - 1];
}

export function getFirstElementFromArray<T>(value: T[]): T | undefined {
  if (checkIsEmpty(value)) {
    return undefined;
  }

  return value[0];
}
