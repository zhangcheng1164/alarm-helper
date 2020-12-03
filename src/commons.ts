// 非空数组
export type NonEmptyArray<T> = [T, ...T[]]

export interface Logger {
  info: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
}
