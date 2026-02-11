import { defineConfig, globalIgnores } from "eslint/config";
/* eslint-disable import/no-unresolved */
// @ts-ignore
import nextVitals from "eslint-config-next/core-web-vitals.js";
// @ts-ignore
import nextTs from "eslint-config-next/typescript.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prefer-const": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/alt-text": "off"
    }
  }
]);

export default eslintConfig;
