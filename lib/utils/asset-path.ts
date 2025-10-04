const basePath = process.env.NODE_ENV === 'production' ? '/5dpapa' : '';

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
