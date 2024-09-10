/**
 * @file The one-time password component.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #sign-in
 * #verification
 * #components
 * #otp
 */

"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { OTP as OTPPrimitive, OTPGroup, OTPSeparator, OTPSlot } from "~/components/ui/primitives/inputs"

export function OTP(): JSX.Element {
    return (
        <>
            <OTPPrimitive maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <OTPGroup>
                    <OTPSlot index={0} />
                    <OTPSlot index={1} />
                </OTPGroup>
                <OTPSeparator />
                <OTPGroup>
                    <OTPSlot index={2} />
                    <OTPSlot index={3} />
                </OTPGroup>
            </OTPPrimitive>
        </>
    )
}
