"use client"

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export const NAVBAR_HEIGHT = 64;

export function getNavbarHeight(scale: number) {
    return NAVBAR_HEIGHT * Math.max(1, scale);
}

const BASE_DESKTOP_WIDTH = 1280;
const BASE_DESKTOP_HEIGHT= 740;
const BASE_TOTAL_HEIGHT = BASE_DESKTOP_HEIGHT+ NAVBAR_HEIGHT;

const MIN_SCALE = 0.85; //stops it from shrinking too much


type DesktopScaleValue = {
    scale: number;
    desktopWidth: number;
    desktopHeight: number;
};

const DesktopScaleContext = createContext<DesktopScaleValue | null>(null);

function getDesktopMeasurements(): DesktopScaleValue {
    const rawScale =  Math.min(
        window.innerWidth / BASE_DESKTOP_WIDTH,
        window.innerHeight / BASE_TOTAL_HEIGHT
    );
    const scale = Math.max(MIN_SCALE, rawScale) //desktop can grow, but it wont shrink past 85%
    const scaledNavbarHeight = getNavbarHeight(scale);

    return {
        scale,

        //when window is too small, keep original size and just clip borders
        desktopWidth: Math.max(BASE_DESKTOP_WIDTH, window.innerWidth / scale),
        desktopHeight: Math.max(BASE_DESKTOP_HEIGHT, (window.innerHeight - scaledNavbarHeight) / scale),
    };
}

export default function DesktopScale({children,} : { children: ReactNode; }) {
    const [desktop, setDesktop ] = useState<DesktopScaleValue>({
        scale: 1,
        desktopWidth: BASE_DESKTOP_WIDTH,
        desktopHeight: BASE_DESKTOP_HEIGHT,
    });

    useEffect(() => {
        function updateScale() {
            setDesktop(getDesktopMeasurements());
        }

        updateScale();
        window.addEventListener("resize", updateScale);
    }, []);

    return (
        <DesktopScaleContext.Provider value={desktop}>
            {children}
        </DesktopScaleContext.Provider>
    );
}

//kun denne delen blir visuelt skalert
export function DesktopCanvas({ children,} : {children: ReactNode; }) {
    const { scale, desktopWidth, desktopHeight } = useDesktopScale();

    return (
        <div className="fixed left-0 right-0 top-0 overflow-hidden"
            style = {{ bottom: getNavbarHeight(scale)}}
        >
            <div className="absolute origin-top-left"
                style = {{
                    width: desktopWidth,
                    height: desktopHeight,
                    left: 0,
                    top: 0,
                    transform: `scale(${scale})`,
                }}
            >
                {children}
            </div>
        </div>
    );
}

export function useDesktopScale() {
    const context = useContext(DesktopScaleContext);

    if (!context) {
        throw new Error(
            "useDesktopScale må brukes inni DesktopScale-komponenten."
        );
    }
    return context;
}
