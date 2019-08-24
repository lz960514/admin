module.exports = {
    // 反向代理
    devServer: {
        open: true,
        host: '192.168.2.129',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            // 配置跨域
            '/api': {
                target: 'https://vuets-api.herokuapp.com/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
};