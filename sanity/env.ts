export const apiVersion = '2026-01-26'

export const dataset = 'production'

export const projectId = 'b505vpsi'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
