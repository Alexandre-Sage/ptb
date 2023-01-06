const curryPatternAsync =
  <T1, T2, T3>(functionToCur: (p1: T1, p2: T2) => Promise<T3>) =>
  (p1: T1) =>
  async (p2: T2) =>
    await functionToCur(p1, p2);
const curryPattern =
  <T1, T2, T3>(functionToCur: (p1: T1, p2: T2) => T3) =>
  (p1: T1) =>
  (p2: T2) =>
    functionToCur(p1, p2);
export { curryPattern, curryPatternAsync };
