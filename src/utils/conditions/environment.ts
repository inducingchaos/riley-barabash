/**
 *
 */

export const onServer = typeof window === "undefined"
export const onClient = typeof window !== "undefined"
export const onVercel = <ConfigType extends { settings: { flags: { vercel?: string | undefined } } }>(
    application: ConfigType
): boolean => !!application.settings.flags.vercel
