"use client";

export function GoogleTranslate() {
    return (
        <div
            id="google_translate_element"
            style={{ display: 'none' }}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: '' }}
        />
    );
}
