"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('PT');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'PT' || saved === 'EN')) {
            setLanguageState(saved);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);

        if (lang === 'PT') {
            // Clear Google Translate cookies to restore original text
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
            // Also try clearing the specific value if it persists
            document.cookie = "googtrans=; path=/;";
            document.cookie = `googtrans=; path=/; domain=.${window.location.hostname}`;
        } else {
            // Set for English
            const translateValue = '/pt/en';
            document.cookie = `googtrans=${translateValue}; path=/`;
            document.cookie = `googtrans=${translateValue}; path=/; domain=.${window.location.hostname}`;
        }

        // Refresh to apply change
        window.location.reload();
    };

    const toggleLanguage = () => {
        const newLang = language === 'PT' ? 'EN' : 'PT';
        setLanguage(newLang);
    };

    const t = (key: string): string => {
        // We keep t function for manual overrides if needed, 
        // but now the whole page is translated by Google
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k as keyof typeof value];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
