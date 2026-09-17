const config = {
    BACKEND_URL: 'https://moviemint-8ml5.vercel.app',
    EXCLUDED_SHOW_IDS: ['6840199a7ad3bd0434113db0'],
};

export const isExcludedShow = (id) => config.EXCLUDED_SHOW_IDS.includes(String(id));

export default config;
