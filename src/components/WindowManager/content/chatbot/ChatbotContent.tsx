"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import type { ChatMessage } from "./lib/types";

export default function ChatbotContent() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
        setMessages([...nextMessages, { role: "assistant", content: "" }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: nextMessages }),
            });

            if (!res.ok || !res.body) throw new Error("request failed");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    updated[updated.length - 1] = { ...last, content: last.content + chunk };
                    return updated;
                });
            }
        } catch {
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "assistant",
                    content: "Noe gikk galt. Prøv igjen om litt.",
                };
                return updated;
            });
        } finally {
            setLoading(false);
        }
    };

    return (
    // blå boks
    <div className =" relative bg-white w-full h-[420px] p-[8px] flex flex-col gap-2
      border-2
      border-t-win-dark-shadow border-l-win-dark-shadow
      border-b-white border-r-white"
    >
        <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pr-1"
        >
            {messages.length === 0 && !loading && (
                <p className="text-win-bg-dark-gray text-sm">
                    Hei! Jeg er Nevrale Nils. Spør meg om studiet eller NODE.
                </p>
            )}

            {messages.map((msg, i) => {
                const isPending = msg.role === "assistant" && msg.content === "" && loading && i === messages.length - 1;
                return (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-[85%] px-2 py-1 text-sm whitespace-pre-wrap border-2 ${isPending ? "italic" : ""} ${
                                msg.role === "user"
                                    ? "bg-win-blue text-white border-t-win-dark-blue border-l-win-dark-blue border-b-item-blue-light border-r-item-blue-light"
                                    : "bg-win-bg-gray text-black border-t-white border-l-white border-b-win-dark-shadow border-r-win-dark-shadow"
                            }`}
                        >
                            {isPending ? "Nils skriver..." : msg.content}
                        </div>
                    </div>
                );
            })}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2 shrink-0">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Skriv en melding ..."
                className="flex-1 bg-white h-[50px] p-[8px] text-sm text-black
                border-2
                border-t-win-dark-shadow border-l-win-dark-shadow
                border-b-white border-r-white
                focus:outline-none"
            />

            <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex flex-col items-center justify-center bg-win-bg-gray shrink-0 w-20 h-[50px] p-[4px]
                border-2
                border-t-white border-l-white
                border-b-win-dark-shadow border-r-win-dark-shadow
                disabled:opacity-60"
            >
                <Image
                    src="/window-elements/paperplane.png"
                    alt="paperplane"
                    width={28}
                    height={28}
                    unoptimized
                    className="image-pixelated shrink-0"
                />
                <p className="text-xs">send</p>
            </button>
        </form>
    </div>

    )
}
