
function parseBoolean(value) {
  if (typeof value === 'undefined') return undefined;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    if (v === 'true') return true;
    if (v === 'false') return false;
    return undefined;
  }
  if (typeof value === 'boolean') return value;
  return undefined;
}

export function parseFilterParams(query) {
  const { isFavourite } = query;
  return { isFavourite: parseBoolean(isFavourite) };
}