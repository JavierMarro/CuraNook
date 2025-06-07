import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tanstackRouter from "@tanstack/eslint-plugin-router";

export default tseslint.config(
  { ignores: ["dist", "*.gen.ts", "routeTree.gen.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/query": tanstackQuery,
      "@tanstack/router": tanstackRouter,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/stable-query-client": "error",
      "@tanstack/router/create-route-property-order": "warn",
    },
  }
);
