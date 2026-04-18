import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ["**/.next/**", "**/out/**", "**/node_modules/**", "public/**", ".claude/**"],
  },
];

export default config;
