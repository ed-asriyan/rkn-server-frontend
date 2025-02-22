export interface Config {
    supabaseUrl: string;
    supabaseKey: string;
    origin: string;
}

export async function fetchConfig(): Promise<Config> {
    const response = await fetch('config.json');
    return response.json();
};
