/**
 *
 */

import { Starter } from "~/components/ui/compositions/templates"

export default function Start(): JSX.Element {
    return (
        <>
            <Starter className="gap-8">
                {Array.from({ length: 100 }, (_, index) => (
                    <p key={index}>{"This product is going to change the world."}</p>
                ))}
            </Starter>
        </>
    )
}
