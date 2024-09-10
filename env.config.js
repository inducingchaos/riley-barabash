/**
 * @typedef {Object.<string, string>} EnvMap
 */

/**
 * @param {{ config: EnvMap }} param0
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mapEnv({ config }) {
    Object.entries(config).forEach(([targetEnv, customEnv]) => {
        if (process.env[customEnv]) {
            process.env[targetEnv] = process.env[customEnv]
        }
    })
}

mapEnv({
    config: {
        NEXT_PUBLIC_ENVIRONMENT: "ENVIRONMENT",

        CLERK_SECRET_KEY: "CLERK_SECRET",
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "CLERK_PUBLIC"
    }
})
