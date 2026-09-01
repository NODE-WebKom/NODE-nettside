"use client"

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";


const BASE_DESKTOP_WIDTH = 1366;
const BASE_DESKTOP_HEIGTH = 768;
const NAVBAR_HEIGHT = 64;

type DesktopScaleValue = {
    scale: number;
    desktopWidth: number;
    desktopHeight: number;
};

const DesktopScaleContext = createContext<DesktopScaleValue | null>(null);

function getDesktopMeasurements(): DesktopScaleValue {
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight;

    const scale =  Math.min(
        availableWidth / BASE_DESKTOP_WIDTH,
        availableHeight / BASE_DESKTOP_HEIGTH
    );

    return {
        scale,
        desktopWidth: availableWidth / scale,
        desktopHeight: availableHeight / scale,
    };
}

export default function DesktopScale({children,} : { children: ReactNode; }) {
    const [desktop, setDesktop ] = useState<DesktopScaleValue>({
        scale: 1,
        desktopWidth: BASE_DESKTOP_WIDTH,
        desktopHeight: BASE_DESKTOP_HEIGTH,
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
            style = {{ bottom: NAVBAR_HEIGHT}}
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
