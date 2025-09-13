"use client";

import DarkVeil from './dark-veil';

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <DarkVeil 
                hueShift={280}
                noiseIntensity={0.03}
                scanlineIntensity={0.05}
                speed={0.2}
                scanlineFrequency={200}
                warpAmount={1}
                resolutionScale={1}
            />
        </div>
    )
}