# 🎨 Innovas AI Background Remover

A modern, responsive web application for automatically removing backgrounds from images using the Remove.bg API. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🖼️ **Easy Image Upload** - Drag and drop or click to upload images
- ⚡ **Automatic Background Removal** - Powered by Remove.bg API
- 👁️ **Live Preview** - See your original and processed images side by side
- 💾 **Download Processed Images** - Save your images with transparent backgrounds
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚠️ **Error Handling** - Clear error messages and retry functionality
- 🔄 **Loading States** - Visual feedback during image processing

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Dropzone** - Drag and drop file uploads
- **Remove.bg API** - Background removal service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Remove.bg API Key** - Get one for free at [remove.bg](https://www.remove.bg/api)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mo-Shakib/bg-remover
   cd bg-remover
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_REMOVE_BG_API_KEY=your_api_key_here
   ```
   
   Replace `your_api_key_here` with your actual Remove.bg API key.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎯 Usage

1. **Get an API Key**
   - Sign up at [remove.bg](https://www.remove.bg/api)
   - Copy your API key
   - Add it to your `.env` file as `VITE_REMOVE_BG_API_KEY`

2. **Upload an Image**
   - Click the upload area or drag and drop an image
   - Supported formats: JPG, PNG, WebP
   - Maximum file size: 12MB (Remove.bg API limit)

3. **Process the Image**
   - The app automatically processes your image
   - Wait for the background removal to complete

4. **Download the Result**
   - Preview the processed image
   - Click the download button to save your image
   - The downloaded file will be named `[original-name]_nobg.png`

## 📁 Project Structure

```
bg-remover/
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── api/               # API integration
│   │   └── removeBgApi.ts
│   ├── components/        # React components
│   │   ├── ApiKeyInput.tsx
│   │   ├── Button.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── ImageProcessor.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ProcessingOverlay.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/           # React context providers
│   │   └── ThemeContext.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Configuration

### API Key Setup

The application requires a Remove.bg API key to function. You can get a free API key that provides:
- 50 free API calls per month
- Additional calls available with paid plans

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_REMOVE_BG_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## 🎨 Customization

### Theme Colors

You can customize the theme colors by editing `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'primary-light': '#your-color',
      'primary-dark': '#your-color',
    }
  }
}
```

### Styling

The project uses Tailwind CSS for styling. You can modify:
- `src/index.css` - Global styles and CSS variables
- Component files - Individual component styles using Tailwind classes

## 🐛 Troubleshooting

### API Key Issues

- **Error: "API key is missing"**
  - Ensure your `.env` file exists in the root directory
  - Verify the variable name is `VITE_REMOVE_BG_API_KEY`
  - Restart the dev server after adding the API key

### Image Upload Issues

- **File too large**
  - Remove.bg API has a 12MB file size limit
  - Compress your image before uploading

- **Unsupported format**
  - Supported formats: JPG, PNG, WebP
  - Convert your image to a supported format

### Build Issues

- **Build fails**
  - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
  - Check Node.js version compatibility

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

## 📞 Support

For issues related to:
- **Remove.bg API**: Visit [remove.bg support](https://www.remove.bg/support)
- **Application bugs**: Contact the project maintainer

---

Made with ❤️ using React, TypeScript, and Vite
