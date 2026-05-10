"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export const NeonCursor = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return

        const container = containerRef.current
        const width = window.innerWidth
        const height = window.innerHeight

        // Configuration optimized for performance
        const config = {
            shaderPoints: 8, // Reduced from 16 to halve shader loops
            curvePoints: 40, // Reduced from 60 for faster curve interpolation
            curveLerp: 0.95, // Increased from 0.85 to make tail snap faster
            radius1: 2,
            radius2: 15,
            velocityThreshold: 10,
            sleepRadiusX: 100,
            sleepRadiusY: 100,
            sleepTimeCoefX: 0.0025,
            sleepTimeCoefY: 0.0025,
            // Deep Cyan to make it more subtle: #0088aa
            color: new THREE.Color("#0088aa")
        }

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false, // Disabled for performance
            powerPreference: "high-performance"
        })
        // Cap pixel ratio to 0.5x to reduce pixel calculations by 4x for massive performance boost
        // The blurriness fits the neon style anyway.
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5))
        renderer.setSize(width, height)
        renderer.setClearColor(0x000000, 0) // Transparent background
        container.appendChild(renderer.domElement)

        // Points and Curve
        const points = new Array(config.curvePoints).fill(0).map(() => new THREE.Vector2())
        const spline = new THREE.SplineCurve(points)
        
        // Mouse tracking
        const mouse = new THREE.Vector2()
        const nMouse = new THREE.Vector2()
        const lastMouse = new THREE.Vector2()
        const mouseVel = new THREE.Vector3()
        let isMoving = false
        let idleTimer: ReturnType<typeof setTimeout> | undefined

        // Uniforms
        const uniforms = {
            uRatio: { value: new THREE.Vector2(1, 1) },
            uSize: { value: new THREE.Vector2(config.radius1, config.radius2) },
            uPoints: { value: new Array(config.shaderPoints).fill(0).map(() => new THREE.Vector2()) },
            uColor: { value: config.color }
        }

        const updateRatio = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            renderer.setSize(w, h)
            if (w >= h) {
                uniforms.uRatio.value.set(1, h / w)
                uniforms.uSize.value.set(config.radius1, config.radius2).multiplyScalar(1 / w)
            } else {
                uniforms.uRatio.value.set(w / h, 1)
                uniforms.uSize.value.set(config.radius1, config.radius2).multiplyScalar(1 / h)
            }
        }
        updateRatio()

        // Shaders
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `

        const fragmentShader = `
            precision highp float;
            uniform vec2 uRatio;
            uniform vec2 uSize;
            uniform vec2 uPoints[${config.shaderPoints}];
            uniform vec3 uColor;
            varying vec2 vUv;

            float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C) {
                vec2 a = B - A;
                vec2 b = A - 2.0*B + C;
                vec2 c = a * 2.0;
                vec2 d = A - pos;
                float kk = 1.0 / dot(b,b);
                float kx = kk * dot(a,b);
                float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
                float kz = kk * dot(d,a);
                float res = 0.0;
                float p = ky - kx*kx;
                float p3 = p*p*p;
                float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
                float h = q*q + 4.0*p3;
                if(h >= 0.0){
                    h = sqrt(h);
                    vec2 x = (vec2(h, -h) - q) / 2.0;
                    vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
                    float t = uv.x + uv.y - kx;
                    t = clamp( t, 0.0, 1.0 );
                    vec2 qos = d + (c + b*t)*t;
                    res = length(qos);
                } else {
                    float z = sqrt(-p);
                    float v = acos( q/(p*z*2.0) ) / 3.0;
                    float m = cos(v);
                    float n = sin(v)*1.732050808;
                    vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
                    t = clamp( t, 0.0, 1.0 );
                    vec2 qos = d + (c + b*t.x)*t.x;
                    float dis = dot(qos,qos);
                    res = dis;
                    qos = d + (c + b*t.y)*t.y;
                    dis = dot(qos,qos);
                    res = min(res,dis);
                    qos = d + (c + b*t.z)*t.z;
                    dis = dot(qos,qos);
                    res = min(res,dis);
                    res = sqrt( res );
                }
                return res;
            }

            void main() {
                vec2 pos = (vUv - 0.5) * uRatio;
                vec2 c = (uPoints[0] + uPoints[1]) / 2.0;
                vec2 c_prev;
                float dist = 10000.0;
                for(int i = 0; i < ${config.shaderPoints - 1}; i++){
                    c_prev = c;
                    c = (uPoints[i] + uPoints[i+1]) / 2.0;
                    dist = min(dist, sdBezier(pos, c_prev, uPoints[i], c));
                }
                dist = max(0.0, dist);
                float glow = pow(uSize.y / dist, 1.4); // Increased exponent for faster falloff
                vec3 col = vec3(0.0);
                col += 2.0 * vec3(smoothstep(uSize.x, 0.0, dist)); // Reduced from 10.0 for a less "white" core
                col += glow * uColor;
                
                // Tone mapping and alpha
                vec3 finalCol = 1.0 - exp(-col);
                finalCol = pow(finalCol, vec3(0.4545));
                
                float alpha = max(finalCol.r, max(finalCol.g, finalCol.b)) * 0.4; // Reduced from default to 0.4 for subtlety
                gl_FragColor = vec4(finalCol, alpha);
            }
        `

        const geometry = new THREE.PlaneGeometry(2, 2)
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Events
        const handleMouseMove = (e: MouseEvent) => {
            isMoving = true
            clearTimeout(idleTimer)
            
            nMouse.x = (e.clientX / window.innerWidth) * 2 - 1
            nMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
            
            const dx = nMouse.x - lastMouse.x
            const dy = nMouse.y - lastMouse.y
            mouseVel.x = Math.min(mouseVel.x + Math.abs(dx) / config.velocityThreshold, 1)
            mouseVel.y = Math.min(mouseVel.y + Math.abs(dy) / config.velocityThreshold, 1)
            lastMouse.copy(nMouse)

            idleTimer = setTimeout(() => {
                isMoving = false
            }, 2000)
        }

        const handleMouseLeave = () => {
            isMoving = false
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', updateRatio)

        // Animation loop
        let rafId: number
        const startTime = performance.now()

        const animate = () => {
            const time = (performance.now() - startTime) / 1000

            if (!isMoving) {
                // Large elliptical orbit around the center content
                const rx = 0.8 * uniforms.uRatio.value.x
                const ry = 0.4 * uniforms.uRatio.value.y
                const dx = rx * Math.cos(time * 0.6)
                const dy = ry * Math.sin(time * 0.6)
                mouse.lerp(new THREE.Vector2(dx, dy), 0.05)
            } else {
                mouse.lerp(new THREE.Vector2(nMouse.x * uniforms.uRatio.value.x * 0.5, nMouse.y * uniforms.uRatio.value.y * 0.5), 0.4)
            }

            points[0].copy(mouse)
            for (let i = 1; i < config.curvePoints; i++) {
                points[i].lerp(points[i - 1], config.curveLerp)
            }

            for (let i = 0; i < config.shaderPoints; i++) {
                spline.getPoint(i / (config.shaderPoints - 1), uniforms.uPoints.value[i])
            }

            renderer.render(scene, camera)
            rafId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('resize', updateRatio)
            cancelAnimationFrame(rafId)
            renderer.dispose()
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[5]"
            id="neon-cursor"
        />
    )
}
