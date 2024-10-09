/**
 * 
 */

export async function verifyEmail({ using: { token } }: { using: { token: string } }) {
    const tokenEntry = await getVerifyEmailToken(token)

    if (!tokenEntry) {
        throw new AuthenticationError()
    }

    const userId = tokenEntry.userId

    await updateUser(userId, { emailVerified: new Date() })
    await deleteVerifyEmailToken(token)
    return userId
}
