/**
 * @todo
 * - [P4] Go through all ESLint options.
 */

/**
 * @type { import ( "eslint" ) .Linter.Config }
 */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: { project: true },
    plugins: ["@typescript-eslint", "drizzle"],
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked"
    ],
    rules: {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
        "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
        "comma-dangle": ["warn", "never"],
        quotes: ["warn", "double", { avoidEscape: true }],
        indent: ["off", 4, { SwitchCase: 1 }],
        "max-len": ["warn", { code: 9999 }],
        "drizzle/enforce-update-with-where": ["error", { drizzleObjectName: ["db", "ctx.db"] }],
        "import/no-anonymous-default-export": ["off"],
        "@typescript-eslint/no-namespace": "off",
        "no-throw-literal": "off",
        "@typescript-eslint/only-throw-error": "off"
    }
}

module.exports = config
