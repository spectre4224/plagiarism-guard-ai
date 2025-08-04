# Plagiarism Detection Backend

Python backend for the PlagiarismGuard AI application using scikit-learn for TF-IDF vectorization and cosine similarity.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Add your text files to this directory (*.txt files)

3. Run the plagiarism detection:
```bash
python app.py
```

## How it works

The backend uses:
- **TF-IDF Vectorization**: Converts text documents into numerical vectors
- **Cosine Similarity**: Measures similarity between document vectors
- **Pairwise Comparison**: Compares all documents against each other

## Output

The script outputs tuples containing:
- File 1 name
- File 2 name  
- Similarity score (0.0 to 1.0)

Higher scores indicate greater similarity and potential plagiarism.