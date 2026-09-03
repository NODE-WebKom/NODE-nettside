"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useDesktopStack } from "./DesktopStackContext";

export type PostItData = {
  id: string;
  title: string;
  background?: string;
  content: ReactNode;
  x: number;
  y: number;
  width?: number;
  height?: number;
  zIndex: number;
  cascadeGeneration?: number;
};

type OpenPostItOptions = {
  id: string;
  title: string;
  background?: string;
  content: ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type PostItManagerContextType = {
  postIts: PostItData[];
  openPostIt: (opts: OpenPostItOptions) => void;
  closePostIt: (id: string) => void;
  closeAllPostIts: () => void;
  focusPostIt: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
};

const PostItManagerContext = createContext<PostItManagerContextType | null>(
  null,
);

const SECOND_POSTIT_OFFSET = 280;
const CASCADE_X_OFFSET = 40;
const CASCADE_Y_OFFSET = 20;
const ARRANGEMENTER_POSTIT_ID = "arrangementer";

export function PostItManagerProvider({ children }: { children: ReactNode }) {
  const [postIts, setPostIts] = useState<PostItData[]>([]);
  const cascadeGenerationRef = useRef(0);

  const { getNextZ } = useDesktopStack();

  const openPostIt = useCallback(
    (opts: OpenPostItOptions) => {
      const newZ = getNextZ();
      const cascadeGeneration = cascadeGenerationRef.current;

      setPostIts((prev) => {
        const exists = prev.find((p) => p.id === opts.id);

        if (exists) {
          return prev.map((p) =>
            p.id === opts.id ? { ...p, zIndex: newZ } : p,
          );
        }

        let x: number;
        let y: number;
        let postItCascadeGeneration: number | undefined;
        const arrangementer = prev.find(
          (postIt) => postIt.id === ARRANGEMENTER_POSTIT_ID,
        );

        // First Post-it
        if (prev.length === 0) {
          x = opts.x ?? 0;
          y = opts.y ?? 0;
        }

        // Event Post-its use the latest Arrangementer position as their anchor.
        else if (arrangementer && opts.id !== ARRANGEMENTER_POSTIT_ID) {
          let previousPostIt: PostItData | undefined;

          for (let index = prev.length - 1; index >= 0; index -= 1) {
            if (prev[index].cascadeGeneration === cascadeGeneration) {
              previousPostIt = prev[index];
              break;
            }
          }

          postItCascadeGeneration = cascadeGeneration;
          x =
            opts.x ??
            (previousPostIt
              ? previousPostIt.x + CASCADE_X_OFFSET
              : arrangementer.x + SECOND_POSTIT_OFFSET);
          y =
            opts.y ??
            (previousPostIt
              ? previousPostIt.y + CASCADE_Y_OFFSET
              : arrangementer.y);
        }

        // Fallback for Post-its opened without Arrangementer.
        else {
          const previousPostIt = prev[prev.length - 1];

          x = opts.x ?? previousPostIt.x + CASCADE_X_OFFSET;
          y = opts.y ?? previousPostIt.y + CASCADE_Y_OFFSET;
        }

        return [
          ...prev,
          {
            id: opts.id,
            title: opts.title,
            background: opts.background,
            content: opts.content,
            x,
            y,
            width: opts.width,
            height: opts.height,
            zIndex: newZ,
            cascadeGeneration: postItCascadeGeneration,
          },
        ];
      });
    },
    [getNextZ],
  );

  const closePostIt = useCallback((id: string) => {
    setPostIts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const closeAllPostIts = useCallback(() => {
    setPostIts([]);
  }, []);

  const focusPostIt = useCallback(
    (id: string) => {
      const newZ = getNextZ();

      setPostIts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, zIndex: newZ } : p)),
      );
    },
    [getNextZ],
  );

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    if (id === ARRANGEMENTER_POSTIT_ID) {
      cascadeGenerationRef.current += 1;
    }

    setPostIts((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
  }, []);

  return (
    <PostItManagerContext.Provider
      value={{
        postIts,
        openPostIt,
        closePostIt,
        closeAllPostIts,
        focusPostIt,
        updatePosition,
      }}
    >
      {children}
    </PostItManagerContext.Provider>
  );
}

export function usePostItManager() {
  const ctx = useContext(PostItManagerContext);

  if (!ctx) {
    throw new Error("usePostItManager må brukes inni en PostItManagerProvider");
  }

  return ctx;
}
