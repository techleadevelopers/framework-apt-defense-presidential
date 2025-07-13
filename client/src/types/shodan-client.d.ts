// src/types/shodan-client.d.ts
declare module 'shodan-client' {
  interface ShodanOptions {
    timeout?: number;
    // Adicione outras opções que você usa para todos os métodos, se houver
  }

  interface SearchOptions extends ShodanOptions {
    facets?: string;
    page?: number;
    minify?: boolean;
  }

  interface HostOptions extends ShodanOptions {
    history?: boolean;
    minify?: boolean;
  }

  // Adicione interfaces para os tipos de retorno se você souber a estrutura
  interface ShodanSearchResponse {
    matches: any[]; // Defina um tipo mais específico se souber a estrutura
    total: number;
    facets?: any;
  }

  interface ShodanHostResponse {
    // Estrutura de dados de host
    ip_str: string;
    ports: number[];
    // ... outras propriedades de host do Shodan
  }

  interface ShodanAccountProfileResponse {
    member: boolean;
    credits: number;
    query_credits: number;
    scan_credits: number;
    // ... outras propriedades
  }

  class Shodan {
    constructor(apiKey: string);
    search(query: string, apiKey: string, opts?: SearchOptions): Promise<ShodanSearchResponse>;
    host(ip: string, apiKey: string, opts?: HostOptions): Promise<ShodanHostResponse>;
    count(query: string, apiKey: string, opts?: SearchOptions): Promise<any>; // Ou um tipo mais específico
    accountProfile(apiKey: string, opts?: ShodanOptions): Promise<ShodanAccountProfileResponse>;
    // ... adicione outros métodos que você usará da API
  }

  export default Shodan;
}