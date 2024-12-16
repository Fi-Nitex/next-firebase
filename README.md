# Next.js + Firebase Boilerplate

This project serves as a boilerplate for setting up a Next.js application integrated with Firebase. It includes a basic configuration to get you started with server-side rendering (SSR) and Firebase services.

---

## Prerequisites

Before starting, make sure you have the following installed:

1. **Node.js** (v16 or higher)
2. **Bun** (for package management):
   - Install Bun by running:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     ```


---

## Project Configuration

1. **Firebase Setup:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or use an existing one.
   - In the Project Overview, click on **Add App** to add a web app.
   - Register the app and copy the Firebase configuration.

2. **Environment Variables:**
   - Create a `.env.local` file in the root of the project.
   - Add your Firebase configuration:

3. **Firebase Initialization:**
   - Make sure the `firebaseConfig` in the `lib/firebase.ts` file matches your Firebase configuration.

---

## Running the Application

To start the development server:
```bash
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

- **Start Development Server:**
  ```bash
  bun run dev
  ```

- **Build for Production:**
  ```bash
  bun run build
  ```

- **Start Production Server:**
  ```bash
  bun start
  ```

- **Lint the Code:**
  ```bash
  bun lint
  ```

---

## Firebase Services Included

The boilerplate includes configurations for:

- **Firebase Authentication**
- **Firebase Firestore**
- **Firebase Storage**

You can extend this to include other Firebase services as required.

---

## Troubleshooting

1. **Bun Not Found:**
   - Ensure Bun is installed and added to your `PATH`.
   - Check installation:
     ```bash
     bun -v
     ```

2. **Firebase Errors:**
   - Double-check your `.env.local` file for correct Firebase credentials.
   - Ensure the Firebase project is correctly set up in the Firebase Console.

3. **Port Conflicts:**
   - If port 3000 is already in use, specify a different port:
     ```bash
     bun run dev --port 4000
     ```

---


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.