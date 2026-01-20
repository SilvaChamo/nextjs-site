"use client";

import LoginPage from "../login/page";

export default function RegisterUserPage() {
    // Reutilizamos o componente de login/registro para consistência
    return <LoginPage initialMode="register" />;
}
