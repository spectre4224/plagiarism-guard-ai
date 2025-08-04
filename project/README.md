# PlagiarismGuard AI

An AI-powered plagiarism detection tool designed to help authors and news organizations quickly detect copied content and safeguard original work.

## 🚀 Features

- **AI-Powered Detection**: Advanced algorithms for accurate plagiarism detection
- **Multiple File Support**: Upload and compare multiple text documents
- **Real-time Analysis**: Instant similarity scoring and risk assessment
- **Beautiful Interface**: Modern, responsive design with intuitive user experience
- **Drag & Drop**: Easy file upload with visual feedback
- **Detailed Reports**: Comprehensive analysis results with export functionality

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Python with scikit-learn (TF-IDF vectorization)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/plagiarism-guard-ai.git
cd plagiarism-guard-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For the Python backend (optional):
```bash
cd server
pip install scikit-learn
python app.py
```

## 🎯 Usage

1. **Upload Files**: Drag and drop or select multiple text files (.txt format)
2. **Analyze**: Click the "Analyze for Plagiarism" button
3. **Review Results**: View similarity scores and risk assessments
4. **Export**: Download detailed reports for your records

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # Vite type definitions
├── server/
│   └── app.py           # Python backend for plagiarism detection
├── public/              # Static assets
└── dist/                # Production build
```

## 🎨 Design Philosophy

The application follows modern design principles with:
- Clean, professional interface
- Intuitive user experience
- Responsive design for all devices
- Accessibility considerations
- Trust-building visual elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with modern web technologies
- Designed for authors and news organizations
- Focused on protecting original content

---

**Don't let plagiarism go unnoticed; empower yourself with our plagiarism detection software.**