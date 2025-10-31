// 允許 TypeScript 辨識 .md 檔案的 import
declare module '*.md' {
  const content: string;
  export default content;
}
