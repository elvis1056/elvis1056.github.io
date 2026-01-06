const basePath = ''; // 移除 /5dpapa，部署到根路徑

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
