import next from "eslint-config-next/core-web-vitals";

const config = [
  ...next,
  { rules: { "react-hooks/set-state-in-effect": "warn" } },
  { ignores: [".next/**", "legacy/**", "tests/**", "node_modules/**"] },
];

export default config;
