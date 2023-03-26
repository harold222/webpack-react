const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // template del html que va a usar
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // reducir tamaaño del css
const { SourceMapDevToolPlugin } = require('webpack'); // conocer el sourcemap del proyecto

//config del puerto
const port = process.env.PORT || 3000;
const development = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

module.exports = {
    entry: './src/index.tsx', // punto de entrada
    output: {
        path: path.join(__dirname, '/dist'), // carpeta de salida
        filename: development ? '[name].js' : 'bundle.[hash].js', // nombre del archivo
        assetModuleFilename: development ? "[base]" : "assets/[hash][ext][query]",
        clean: true
    },
    context: path.resolve(__dirname), // carpeta de trabajo
    devServer: {
        port,
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    devtool: 'eval-source-map', // al depurar encuentre el archivo original
    module: {
        rules: [ // reglas para los archivos
            {
                enforce: "pre", // antes de que se ejecute el loader
                test: /\.(js|jsx|ts|tsx)$/, // se ejecute primero el lint para que se genere el build
                exclude: /node_modules/,
                use: [ // previamente pase por estos loaders
                    "source-map-loader"
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            },
            { //reglas de babel ES Y JSX
                test: /\.(js|jsx)$/, // archivos que se van a transformar
                exclude: /node_modules/, // no se van a transformar los archivos de node_modules
                use: {
                    loader: "babel-loader", // loader que se va a usar
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                            '@babel/typescript'
                        ],
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets',
                            useRelativePath: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            hash: true,
            minify: {
                removeComments: !development,
                collapseWhitespace: !development,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: development ? './css/style.css' : './css/styles.[hash].css'
        }),
        new SourceMapDevToolPlugin({
            filename: '[file].map',
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'], // extensiones que se van a usar
        modules: [
            'node_modules',
        ]
    }
}