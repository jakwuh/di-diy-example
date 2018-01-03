import * as webpack from 'webpack';
import {resolve, join} from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

let root = resolve(__dirname, '../');
let src = join(root, 'src');
let dist = join(root, 'dist');

let isDevelopment = process.env.NODE_ENV !== 'production';

let config: webpack.Configuration = {
    entry: {
        index: join(src, 'entries/client.ts'),
        styles: join(src, 'entries/client.css')
    },

    target: 'web',

    devtool: isDevelopment ? 'inline-source-map' : false,

    output: {
        filename: '[name].js',
        path: join(dist, 'client')
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
        modules: [
            src,
            join(root, 'node_modules')
        ]
    },

    module: {
        rules: [{
            test: /\.[jt]sx?$/,
            loader: 'ts-loader',
            include: [
                src,
                /typedi/,
                /quantum-router/
            ],
            options: {
                transpileOnly: true,
                compilerOptions: {
                    sourceMap: isDevelopment
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            IS_SERVER: false,
            IS_CLIENT: true
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: isDevelopment ? 'development' : 'production'
        }),
        ...(isDevelopment ? [] : [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: true
            })
        ])
    ]
};

export default config;
