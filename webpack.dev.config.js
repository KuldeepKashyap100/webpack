const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: "./src/index.js",
    entry: {
        "button": "./src/buttonRender.js",
        "image": "./src/imageRender.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.join(__dirname, "./dist"),
        publicPath: "/static/"
    },
    // development mode enables source map which allow us to debug
    mode: "development",
    // by default webpack extract common dependencies 
    // only if size if more than 30kb before minification
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 10000,
            automaticNameDelimiter: "_"
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        index: "index.html",
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg)$/, 
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // css-loader will read css content from the css file 
                    // style-loader will add them in style block in html page
                    // "style-loader", "css-loader"
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // webpack process the loaders from right to left
                    // "style-loader", "css-loader", "sass-loader"
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"],
                        plugins: ["transform-class-properties"]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: ["handlebars-loader"]
            }
        ]
    },
    plugins: [
        new TerserPlugin(), 
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                // all patterns are relative to the webpack output.path directory(which currently is dist)
                // below pattern means remove all the files with subdirectories
                "**/*",
                // we can form our own paths to clean
                path.join(process.cwd(), "build/**/*")
            ]
        }),
        new HtmlWebpackPlugin({
            filename: "image.html",
            title: "Image template",
            description: "some description",
            template: "src/page-template.hbs",
            chunks: ["image", "vendors-node_modules_lodash_lodash_js"]
        }),
        new HtmlWebpackPlugin({
            filename: "button.html",
            title: "Button template",
            description: "some description",
            template: "src/page-template.hbs",
            chunks: ["button"]
        })
    ]
}