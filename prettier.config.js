/**
 * @see [Prettier Options](https://prettier.io/docs/en/options.html)
 */

/**
 * @type { import ( "prettier" ) .Config & import ( "prettier-plugin-tailwindcss" ) .PluginOptions }
 */
export default {
    arrowParens: "avoid",
    plugins: ["prettier-plugin-tailwindcss"],
    printWidth: 128,
    semi: false,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none",
    tailwindFunctions: ["cva"]
}
