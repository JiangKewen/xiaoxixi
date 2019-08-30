const path = require("path")

function resolve(dir) {
  return path.join(__dirname, "./", dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", // 根域上下文目录(变量可用于index.html)
  outputDir: "dist", // 构建输出目录
  assetsDir: "static", // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：true | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: {
    // webpack 简单的配置
    devServer: {
      overlay: { warnings: true, errors: true }
    },
    name: "vue-admin-template",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: []
  },
  chainWebpack: config => {
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  },
  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      // css预设器配置项
      sass: {
        data: "" // `@import "@/assets/scss/mixin.scss";`
      },
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },
  parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: {
    // 第三方插件配置
  },
  devServer: {}
}
