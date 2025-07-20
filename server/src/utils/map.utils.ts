export function getMapKeysAsArray<K, V>(map: Map<K, V>): K[] {
  return Array.from(map.keys());
}

export function getMapValuesAsArray<K, V>(map: Map<K, V>): V[] {
  return Array.from(map.values());
}
