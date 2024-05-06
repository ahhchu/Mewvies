// ConfigManager.js
class ConfigManager {
    constructor() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = this;
            this.settings = {
                enableAnalytics: true,
            };
        }
        return ConfigManager.instance;
    }

    get(key) {
        return this.settings[key];
    }

    set(key, value) {
        this.settings[key] = value;
    }
}

const configManager = new ConfigManager();
Object.freeze(configManager);
export default configManager;
