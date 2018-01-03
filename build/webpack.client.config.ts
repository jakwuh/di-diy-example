import * as webpack from 'webpack';
import {resolve, join} from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

let root = resolve(__dirname, '../');
let src = join(root, 'src');
let dist = join(root, 'dist');

let isDevelopment = true;

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
            IS_CLIENT: true,
            // CLIENT_ID: JSON.stringify('f10de77025978ee1ed0b') // dev
            CLIENT_ID: JSON.stringify('fe2214b6b6d577b87355')
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: isDevelopment ? 'development' : 'production'
        })
    ]
};

export default config;
