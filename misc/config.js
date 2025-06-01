import fs from "fs";

// Default config
export let config = {};

// Load from environment variables first
const getEnv = (key, defaultVal) => {
    if (process.env[key] !== undefined) {
        const val = process.env[key];
        if (val === "true") return true;
        if (val === "false") return false;
        if (!isNaN(val)) return Number(val);
        return val;
    }
    return defaultVal;
};

const loadEnvConfig = () => {
    return {
        token: getEnv("DISCORD_TOKEN", ""),
        HDevToken: getEnv("HDEV_TOKEN", ""),
        HDevTokenAlert: getEnv("HDEV_TOKEN_ALERT", true),
        fetchSkinPrices: getEnv("FETCH_SKIN_PRICES", true),
        fetchSkinRarities: getEnv("FETCH_SKIN_RARITIES", true),
        localiseText: getEnv("LOCALISE_TEXT", true),
        localiseSkinNames: getEnv("LOCALISE_SKIN_NAMES", true),
        linkItemImage: getEnv("LINK_ITEM_IMAGE", true),
        videoViewerWithSite: getEnv("VIDEO_VIEWER_WITH_SITE", true),
        imageViewerWithSite: getEnv("IMAGE_VIEWER_WITH_SITE", false),
        useEmojisFromServer: getEnv("USE_EMOJIS_FROM_SERVER", ""),
        refreshSkins: getEnv("REFRESH_SKINS", "10 0 0 * * *"),
        checkGameVersion: getEnv("CHECK_GAME_VERSION", "*/15 * * * *"),
        updateUserAgent: getEnv("UPDATE_USER_AGENT", "*/15 * * * *"),
        delayBetweenAlerts: getEnv("DELAY_BETWEEN_ALERTS", 5000),
        alertsPerPage: getEnv("ALERTS_PER_PAGE", 10),
        careerCacheExpiration: getEnv("CAREER_CACHE_EXPIRATION", 600000),
        emojiCacheExpiration: getEnv("EMOJI_CACHE_EXPIRATION", 10000),
        loadoutCacheExpiration: getEnv("LOADOUT_CACHE_EXPIRATION", 600000),
        useShopCache: getEnv("USE_SHOP_CACHE", true),
        useLoginQueue: getEnv("USE_LOGIN_QUEUE", false),
        loginQueueInterval: getEnv("LOGIN_QUEUE_INTERVAL", 3000),
        loginQueuePollRate: getEnv("LOGIN_QUEUE_POLL_RATE", 2000),
        loginRetryTimeout: getEnv("LOGIN_RETRY_TIMEOUT", 600000),
        authFailureStrikes: getEnv("AUTH_FAILURE_STRIKES", 2),
        maxAccountsPerUser: getEnv("MAX_ACCOUNTS_PER_USER", 5),
        userDataCacheExpiration: getEnv("USER_DATA_CACHE_EXPIRATION", 168),
        rateLimitBackoff: getEnv("RATE_LIMIT_BACKOFF", 60),
        rateLimitCap: getEnv("RATE_LIMIT_CAP", 600),
        useMultiqueue: getEnv("USE_MULTIQUEUE", false),
        storePasswords: getEnv("STORE_PASSWORDS", false),
        trackStoreStats: getEnv("TRACK_STORE_STATS", false),
        statsExpirationDays: getEnv("STATS_EXPIRATION_DAYS", 14),
        statsPerPage: getEnv("STATS_PER_PAGE", 8),
        shardReadyTimeout: getEnv("SHARD_READY_TIMEOUT", 60000),
        autoDeployCommands: getEnv("AUTO_DEPLOY_COMMANDS", true),
        ownerId: getEnv("OWNER_ID", ""),
        ownerName: getEnv("OWNER_NAME", ""),
        status: getEnv("STATUS", "Up and running!"),
        notice: getEnv("NOTICE", ""),
        onlyShowNoticeOnce: getEnv("ONLY_SHOW_NOTICE_ONCE", true),
        maintenanceMode: getEnv("MAINTENANCE_MODE", false),
        githubToken: getEnv("GITHUB_TOKEN", ""),
        logToChannel: getEnv("LOG_TO_CHANNEL", ""),
        logFrequency: getEnv("LOG_FREQUENCY", "*/10 * * * * *"),
        logUrls: getEnv("LOG_URLS", false),
    };
};

// Try to load from config.json (if exists), fallback to env
export const loadConfig = (filename = "config.json") => {
    try {
        const fileData = fs.readFileSync(filename, "utf-8");
        config = JSON.parse(fileData);
        console.log("Loaded config from file.");
    } catch (e) {
        console.warn("Could not load config.json. Falling back to environment variables.");
        config = loadEnvConfig();
    }

    // Simple token validation
    if (!config.token || config.token === "token goes here") {
        console.error("You forgot to put your bot token in config or environment variable!");
    }

    return config;
};

export const saveConfig = (filename = "config.json", configToSave = config) => {
    fs.writeFileSync(filename, JSON.stringify(configToSave, null, 2));
};

export default config;
