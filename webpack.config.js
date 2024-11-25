const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    esModule: false
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(ico|png|jp?g|svg)$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new copyWebpackPlugin({
            patterns: [
                { from: "res", to: "res" }
            ]
        })
    ]
};
