"use client"

/*
https://tympanus.net/codrops/2020/12/17/recreating-a-dave-whyte-animation-in-react-three-fiber/
*/

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Test(): JSX.Element {
    return (
        <Canvas orthographic camera={{ zoom: 20 }} style={{ width: "100vw", height: "100vh" }}>
            <color attach="background" args={["black"]} />
            <Dots />
        </Canvas>
    )
}

function Dots(): JSX.Element {
    const ref = useRef<THREE.InstancedMesh>(null)

    const { vec, transform, positions } = useMemo(() => {
        const vec = new THREE.Vector3()
        const transform = new THREE.Matrix4()
        const positions = Array(10000)
            .fill(null)
            .map((_, i) => {
                const position = new THREE.Vector3()

                // Place in a grid

                position.x = (i % 100) - 50
                position.y = Math.floor(i / 100) - 50

                // Offset every other column (hexagonal pattern)

                position.y += (i % 2) * 0.5

                // Add some noise

                position.x += Math.random() * 0.3
                position.y += Math.random() * 0.3
                return position
            })
        return { vec, transform, positions }
    }, [])

    useFrame(({ clock }) => {
        if (!ref.current) throw new Error("No ref.current")
        const scale = 1 + Math.sin(clock.elapsedTime) * 0.3
        for (let i = 0; i < 10000; ++i) {
            vec.copy(positions[i]!).multiplyScalar(scale)
            transform.setPosition(vec)
            ref.current.setMatrixAt(i, transform)
        }
        ref.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, 10000]}>
            <circleGeometry args={[0.15]} />
            <meshBasicMaterial />
        </instancedMesh>
    )
}
