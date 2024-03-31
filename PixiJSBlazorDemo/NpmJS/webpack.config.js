const path = require('path');

module.exports = {
    mode: 'development',
  
    entry: './src/main.ts',
  
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
      ],
    },
    output: {
        path: path.resolve(__dirname, "../wwwroot/js"),
        filename: "[name].bundle.js",
        library: "PixiJS"
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
  };