module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: "./",
          alias: {
            "@/": "./",
            "@/helpers": "./helpers",
            "@/data": "./data",
            "@/screens": "./screens",
            "@/components": "./components",
            "@/images": "./assets/images",
            "@/types": "./types",
          },
        },
      ],
      [
        "import",
        {
          libraryName: "@ant-design/react-native"
        }
      ],
    ],
  }
}