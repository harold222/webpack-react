const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // template del html que va a usar
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // reducir tamaaño del css
const { SourceMapDevToolPlugin } = require('webpack'); // conocer el sourcemap del proyecto

const rules = [ // reglas para los archivos
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
                    [
                        '@babel/preset-react',
                        {
                            runtime: 'automatic' // importa react autamaticamente
                        }
                    ],
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
];

module.exports = (env, args) => {

    const port = process.env.PORT || 3000;
    const { mode } = args;
    const isProduction = mode === 'production';

    let plugins = [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            hash: true,
            minify: {
                removeComments: isProduction,
                collapseWhitespace: isProduction,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? './css/style.[contenthash].css' : './css/style.css'
        }),
    ];

    if (!isProduction) {
        plugins.push(new SourceMapDevToolPlugin({
            filename: '[file].map',
        }));
    }

    return {
        entry: './src/index.tsx', // punto de entrada
        output: {
            path: path.join(__dirname, '/dist'), // carpeta de salida
            filename: isProduction ? '[name].[contenthash].js' : '[name].js' , // nombre del archivo
            assetModuleFilename: isProduction ? "assets/[hash][ext][query]" : "[base]",
            clean: true
        },
        context: path.resolve(__dirname), // carpeta de trabajo
        devServer: {
            port,
            historyApiFallback: true,
            hot: true,
            open: true,
            compress: true,
        },
        devtool: isProduction ? false : 'eval-source-map', // al depurar encuentre el archivo original
        module: {
            rules
        },
        plugins,
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass'], // extensiones que se van a usar
            modules: [
                'node_modules',
            ]
        }
    };
};