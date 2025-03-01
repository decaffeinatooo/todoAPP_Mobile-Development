# Project Setup Guide

This guide will walk you through setting up Android Studio, installing Expo Go on the emulator, cloning the repository, and running the project in the emulator.

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Android Studio](https://developer.android.com/studio)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

---

## Step 1: Install Android Studio

Follow these steps to install Android Studio and set up the emulator:

1. **Download Android Studio** from the official [Android Studio website](https://developer.android.com/studio).
2. Follow the installation instructions for your operating system.
3. After installation, open Android Studio and follow the setup wizard to install the necessary SDKs and tools.
4. Once Android Studio is installed, open the **AVD Manager** (Android Virtual Device Manager) to set up the emulator:
   - Go to `Tools` → `AVD Manager` → `Create Virtual Device`.
   - Choose a device model (e.g., `Pixel 3`, `Google Play`, with an image like `x86_64`).
   - Download the required system image.
   - Once the device is created, click `Play` to launch the emulator.

### Optional: Watch the Tutorial

If you need further assistance setting up Android Studio and the emulator, you can follow the instructions in this [video tutorial](https://www.youtube.com/watch?v=dDF0AHClV94) from **2:48-6:03** for a detailed guide on how to properly configure everything.

In the video (timestamp 2:48–6:03), the following steps are covered:

- **Creating a new virtual device** in Android Studio.
- **Choosing the correct system image** for the emulator.
- **Setting up the device and starting the emulator**.

This will ensure that you have the Android emulator set up and ready for use with Expo Go.


---

## Step 2: Install Expo Go on the Emulator

1. Open the **Android Emulator** from Android Studio.
2. In Android Studio, open the **AVD Manager** and launch your emulator.
3. Install **Expo Go** on the emulator:
   - Search for "Expo Go" on the Google Play Store inside the emulator, or follow the [Expo Go Installation guide](https://docs.expo.dev/get-started/installation/) for a manual installation using ADB.
   - Alternatively, you can manually install Expo Go using ADB with this command:
     ```bash
     adb install -r path_to_expo_go.apk
     ```

---

## Step 3: Clone the Repository

1. Open a terminal (or Git Bash on Windows) and navigate to the directory where you want to clone the project.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
3. Navigate into the cloned project directory: 
   ```bash
   cd your-repo-name

---

## Step 4: Install Project Dependencies
1. Make sure you are in the project directory.
2. Install the project dependencies by running the following command:
    ```bash
    npm install
      # OR
    yarn install

---

## Step 5: Start the Project

Once the dependencies are installed, follow these steps to start the project:

1. **Start the Expo development server** by running the following command in your terminal (or in the VSCode terminal):
   ```bash
   npx expo start
   ```
   This command will start the Expo development server, and a QR code along with a URL will be displayed in the terminal.
2. Running the App on a Physical Device:
     - **For Android**:
        - Download **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
  
     - **For iOS**:
        - Download **Expo Go** from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779).

      After installing **Expo Go**, open the app on your device and use your phone's camera to scan the QR code displayed in    your terminal. This will automatically open the app on your physical device.

3. Alternative: Use the Emulator's IP Address:
     - If you're using the Android emulator on your laptop/PC, you can manually enter the URL provided by Expo in the terminal after running npx expo start.
     - Open Expo Go on the emulator and either scan the QR code or manually enter the URL in Expo Go, such as:
         ```bash
         exp://10.0.2.15:19000
      The app should now be running either on your emulator or physical device.
