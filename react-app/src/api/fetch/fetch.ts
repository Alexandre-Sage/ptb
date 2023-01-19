import { NewBoardData } from "../../types/board/NewBoard.type";

const curryPatternAsync =
  <T1, T2, T3>(functionToCur: (p1: T1, p2: T2) => Promise<T3>) =>
  (p1: T1) =>
  async (p2: T2) =>
    await functionToCur(p1, p2);

class HttpHeaders {
  private readonly contentType: string[] = ["Content-Type", "application/json"];
  constructor(private readonly token: string) {}
  getHeaders = (): HeadersInit => ({
    [this.contentType[0]]: this.contentType[1],
    Authorization: `Bearer ${this.token}`,
  });
}
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";
class HttpFetch {
  public response: any = {} as any;
  constructor(
    private readonly headers: HttpHeaders, //= new HttpHeaders(sessionStorage.jwt),
    private readonly url: string,
    private readonly method: FetchMethod,
    private readonly body?: any
  ) {}
  fetch = async () => {
    const { method, url, headers, body } = this;
    const request = await fetch(`http://localhost:5000${url}`, {
      method,
      headers: headers.getHeaders(),
      body: JSON.stringify(structuredClone(body)),
    });
    this.response = await request.json();
    return this.response;
  };
}
const initFetch = async (
  headers: HttpHeaders,
  { body, method, url }: { url: string; body?: any; method: FetchMethod }
) => {
  return new HttpFetch(headers, url, method, body).fetch();
};

const curryedFetch = curryPatternAsync(initFetch);
const functionalFetch = curryedFetch(new HttpHeaders(sessionStorage.jwt));

export { HttpFetch, HttpHeaders, functionalFetch, type FetchMethod };
