declare module 'index' {
  export const init: (options: {
    token: string;
    baseUrl: string;
  }) => Promise<void>;

  export const setUser: (options: { userId: string }) => Promise<void>;
}
