/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
}

export default {
    webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
        config.module.rules.push({
            test: /\.node$/,
            use: [
                {
                    //loader: "nextjs-node-loader",
                    //loader: "node-loader",
                    loader: "native-addon-loader",
                },
            ],
        });
        //config.infrastructureLogging = { debug: /PackFileCache/ }
        return config;
    },
};