const webpack = require("webpack");
const AureliaWebpackPlugin = require("aurelia-webpack2-plugin");

module.exports = {
    "entry": {
        "app": [
            "./src/main"
        ],
        "aurelia": [
            "aurelia-bootstrapper-webpack",
            "aurelia-binding",
            "aurelia-dependency-injection",
            "aurelia-event-aggregator",
            "aurelia-framework",
            "aurelia-history",
            "aurelia-history-browser",
            "aurelia-loader",
            "aurelia-loader-webpack",
            "aurelia-logging",
            "aurelia-logging-console",
            "aurelia-metadata",
            "aurelia-pal",
            "aurelia-pal-browser",
            "aurelia-path",
            "aurelia-polyfills",
            "aurelia-route-recognizer",
            "aurelia-router",
            "aurelia-task-queue",
            "aurelia-templating",
            "aurelia-templating-binding",
            "aurelia-templating-router",
            "aurelia-templating-resources",
        ]
    },
    "output": {
        "filename": "[name].bundle.js"
    },
    "resolve": {
        "extensions": [
            ".ts",
            ".js",
        ]
    },
    // devServer: {
    //     historyApiFallback: {
    //       index: '/dist/'
    //     }
    //   },
    devtool: "source-map",
    "module": {
        "rules": [
            {
                "test": /\.ts$/,
                "use": [
                    {
                        "loader": "ts-loader"
                    }
                ]
            },
            {
                "test": /\.html$/,
                "use": [
                    {
                        "loader": "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            }
        ]
    },
    "plugins": [
        new AureliaWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ "name": ["aurelia"] })

        // UglifyJSPlugin throws error - unexpected token???
        // Possible
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
