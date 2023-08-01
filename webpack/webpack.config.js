const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, "..", "src", "main.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: ".",
                    to: ".",
                    context: "public"
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
};