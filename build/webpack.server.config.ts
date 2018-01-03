import * as webpack from 'webpack';
import {resolve, join} from 'path';
import * as nodeExternals from 'webpack-node-externals';

let root = resolve(__dirname, '../');
let src = join(root, 'src');
let dist = join(root, 'dist');

let config: webpack.Configuration = {
    entry: join(src, 'entries/server.ts'),

    devtool: 'inline-source-map',
    target: 'node',
    externals: [nodeExternals({
        whitelist: [/quantum-router/, /typedi/]
    })],

    output: {
        filename: 'server.js',
        path: join(dist, 'server')
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
            options: {
                transpileOnly: true
            }
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_SERVER: true,
            IS_CLIENT: false,
            ASSETS_ROOT: JSON.stringify(join(dist, 'client')),
            // CLIENT_ID: JSON.stringify('f10de77025978ee1ed0b'), //dev
            CLIENT_ID: JSON.stringify('fe2214b6b6d577b87355'),
            // CLIENT_SECRET: JSON.stringify('55b29302d04d21f8fc9af8be0e1d4d2af9fd0d6d') dev
            CLIENT_SECRET: JSON.stringify('38e5d546fc26d3ffe7dab29f28cd80213afc4b38'),
            UPLOADCARE_PUBLIC_KEY: JSON.stringify('eb5849c2a9d3f73d3c05')
        })
    ]
};

export default config;
