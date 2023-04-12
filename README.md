# Beverages Test Task

- Ionic/React
- Typescript
- Capacitor/Android


## Требования

Необходимо для запуска:
- Node
- Android Studio, Android 7 SDK

## Установка

Установка зависимостей:
```bash
npm install
```

**Запуск Web**

```bash
npm start
```

**Компиляция Android APK**

1. Transpile JS:
```bash
npm build
```

2. Добавить Capacitor/Android:
```bash
npx cap add android
```

3. Cкопировать исходники и родить debug apk:
```bash
npx cap copy android
cd android && ./gradlew assembleDebug && cd ..
```

4. APK живёт по адресу: `android/app/build/outputs/apk/debug/app-debug.apk`: