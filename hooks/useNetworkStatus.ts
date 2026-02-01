"use client";

import { useState, useEffect } from "react";

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const updateStatus = () => setIsOnline(navigator.onLine);

            window.addEventListener("online", updateStatus);
            window.addEventListener("offline", updateStatus);

            // Set initial status
            updateStatus();

            return () => {
                window.removeEventListener("online", updateStatus);
                window.removeEventListener("offline", updateStatus);
            };
        }
    }, []);

    return { isOnline };
}
