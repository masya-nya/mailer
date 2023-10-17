const path = require('path')

module.exports = {
    mode: 'production',
    entry: "./src/index.tsx",
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'widget'),
        libraryTarget: 'amd',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-typescript", "@babel/preset-react"]
                },
                
            },
            {
                test: /^\w+(?!\.module)\.css/,
                use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				],
                
            },
			{
				test: /\.module\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: "reon-yamailer-[local]--[hash:base64:5]"
							}
						}
					}
				],
				
			},
			{
                test: /^\w+(?!\.module)\.scss/,
                use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{loader: 'sass-loader'}
				],
                
            },
            {
                test: /\.module\.scss$/,
                use: [
					{ loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "reon-yamailer-[local]--[hash:base64:5]"
                            }
                        }
                    }, 
                    { loader: 'sass-loader' },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    }
}