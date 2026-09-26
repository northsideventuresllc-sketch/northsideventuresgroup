import nextConfig from "eslint-config-next";

const reactHooksPlugin = nextConfig.find((c) => c.plugins?.["react-hooks"])
  ?.plugins?.["react-hooks"];

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    // eslint-config-next 16 ships eslint-plugin-react-hooks v6, which adds new
    // rules (set-state-in-effect, refs, immutability, preserve-manual-memoization)
    // unrelated to this Next 15->16 security upgrade. Downgraded to warn here so
    // the security PR stays mechanical; fixing these behaviorally is separate work.
    plugins: { "react-hooks": reactHooksPlugin },
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
];

export default eslintConfig;
