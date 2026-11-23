
# PDF RAG Question Answering System

An AI-powered PDF Question Answering System built using
Retrieval-Augmented Generation (RAG).

## Overview

This project allows users to ask questions about a PDF document.
It retrieves relevant information from the PDF using Pinecone
and generates context-based answers using Google Gemini.

The system is designed to answer questions using only the
provided PDF context.

## Technologies Used

- JavaScript
- Node.js
- LangChain
- Pinecone Vector Database
- llama-text-embed-v2
- Google Gemini API
- PDF Loader
- dotenv
- readline-sync

## How It Works

1. Load PDF documents.
2. Split PDF content into smaller chunks.
3. Store document chunks in Pinecone.
4. Convert user questions into embeddings using Pinecone's
   integrated embedding model.
5. Retrieve the top 5 relevant PDF chunks.
6. Pass retrieved context to Google Gemini.
7. Generate answers based only on the PDF context.

## Features

- PDF-based Question Answering
- Semantic Search
- Vector Database Integration
- RAG Architecture
- Context-based AI Responses
- System Instructions

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/pdf-rag-question-answering-system.git
```

Install dependencies:

```bash
npm install
```

Configure your environment variables in `.env`:

```env
PINECONE_API_KEY=
PINECONE_HOST=
GEMINI_API_KEY=
```

Run the project:

```bash
node index.js
```

## Note

You must configure your own Pinecone and Gemini API keys
before running this project.

## Author

Ankita Garathe
