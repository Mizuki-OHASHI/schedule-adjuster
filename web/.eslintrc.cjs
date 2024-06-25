module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "airbnb",
    // "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: [
    "import",
    "unused-imports",
    "jsx-a11y",
    "@typescript-eslint",
    "tailwindcss",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2015,
  },
  rules: {
    /* eslint */
    "arrow-body-style": "off",
    /* typescript */
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    /* react */
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", "ts", "tsx"] },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",

    "no-shadow": "off",
    "react-hooks/rules-of-hooks": "warn",
    "import/no-extraneous-dependencies": "warn",
    "react/no-array-index-key": "off",
    /* import */
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/app/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/components/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/stores/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/providers/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/hooks/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/constants/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/libs/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/utils/**",
            group: "parent",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["./*", "../*", "~/*", "~~/*"],
      },
    ],
    /* tailwindcss */
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        config: "tailwind.config.cjs",
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
