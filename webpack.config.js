module.exports = {
    entry: ['./src/index.js','./src/style.css'],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: require.resolve('babel-loader'),
                    options:{
                        presets: ['@babel/preset-react'],
                        cacheDirectory:true,
                        plugins: ['react-hot-loader/babel']
                    },    
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }

};