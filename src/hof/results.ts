export type Result<T, E extends Error> = [T, null] | [null, E];

export async function intoResultAsync<T extends (...args: any[]) => Promise<any>, E extends Error = Error>(
  cb: T,
  ...args: Parameters<T>
): Promise<Result<Awaited<ReturnType<T>>, E>> {
  try {
    const res = (await cb(...args)) as Awaited<ReturnType<T>>;
    return [res, null];
  } catch (e) {
    const err = e as E;
    return [null, err];
  }
}

export function intoResult<T extends (...args: any[]) => any, E extends Error = Error>(
  cb: T,
  ...args: Parameters<T>
): Result<ReturnType<T>, E> {
  try {
    const res = cb(...args) as ReturnType<T>;
    return [res, null];
  } catch (e) {
    const err = e as E;
    return [null, err];
  }
}
