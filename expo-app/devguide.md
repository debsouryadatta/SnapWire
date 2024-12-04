### Steps of dev
1. Changing the app.json -> web -> "output": "static" -> "output": "single"
2. Error in babel -> `pnpm add @babel/runtime`
3. Installing nativewind following the docs, don't change the new tailwind related files to typescript, `pnpm add react-native-css-interop` -> to remove an error
4. Creating the welcome screen, using expo-fonts
5. Inplementing clerk auth just the frontend part