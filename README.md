# PresenceCV

<p align="center">
  <img src="https://i.ibb.co/qFhycrB9/image.png" />
</p>

## Boot.dev 2025 Hackathon Entry

This project was created for the Boot.dev 2025 Hackathon.

## LIVE PREVIEW

[View Live Application](https://presence-cv.vercel.app/)

A full-stack application that automatically generates professional resumes for you by scraping data from your Github, LeetCode, and Boot.dev profiles. This app uses AI to format and present your coding achievements, projects
and skills in a polished resume format.

## What It Does

PresenceCV aggregates your programming accomplishments from multiple platforms:

- **GitHub**: Extracts repositories, contributions, languages used, and project details
- **LeetCode**: Gathers problem-solving statistics and achievements
- **Boot.dev**: Collects course completions and learning progress

The scraped data is then processed using AI to generate a professional formatted resume that highlights your technical skills, projects, and coding experience. Resumes are generated in both Word document format (.docx) and PDF format.

## Tech Stack

### Backend

- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.11+**: Core backend language
- **LiteLLM**: AI model integration for resume generation
- **python-docx**: DOCX document generation
- **ReportLab**: PDF document generation
- **Pydantic**: Data validation and settings management
- **aiohttp**: Async HTTP client for web scraping

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Bun**: Fast JavaScript runtime and package manager

### AI & APIs

- **OpenRouter**: AI model routing and management
- **Google Gemini**: Primary AI model for content generation
- **GitHub API**: Repository and profile data extraction
- **LeetCode API**: Problem-solving statistics
- **Boot.dev API**: Learning progress tracking

## Quick Start

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Bun (for frontend package management)

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install uv package manager:

   ```sh
   pip install uv
   ```

3. Create virtual environment and install dependencies:

   ```sh
   uv venv
   uv pip install .
   ```

4. Create a `.env` file with your API keys:

   ```sh
   OPENROUTER_API_KEY=your_api_key_here
   OPENROUTER_MODEL=google/gemini-2.5-flash
   ```

   **Getting API Keys:**

   - Get OpenRouter API key: https://openrouter.ai/settings/keys
   - For free usage, use integrations (BYOK): https://openrouter.ai/settings/integrations
   - Recommended: Connect Google Gemini API key (free with high limits): https://aistudio.google.com/app/apikey

   **Model Selection:**

   You can use any AI model available through OpenRouter (provided you have credits or have linked an API key through BYOK). Simply change the `OPENROUTER_MODEL` value to your preferred model. Options include:

   - `google/gemini-2.5-pro`
   - `anthropic/claude-sonnet-4-20250514`
   - `x-ai/grok-4`
   - `moonshotai/kimi-k2`

   Browse all available models at: https://openrouter.ai/models

5. Start the development server:
   ```sh
   uv run fastapi dev
   ```

The API will be available at `http://127.0.0.1:8000` and `http://127.0.0.1:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. If you don't have Bun installed, install it first:

   ```sh
   npm install -g bun
   ```

3. Install dependencies:

   ```sh
   bun install
   ```

4. Start the development server:
   ```sh
   bun dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Resume Generation

- `POST /api/v1/resume/generate` - Generate resume from profile data

**Request Body:**

```json
{
  "github_user": "username",
  "leetcode_user": "username",
  "bootdev_user": "username",
  "personal": {
    "name": "Your Name",
    "email": "email@example.com",
    "phone": "123-456-7890",
    "location": "City, State"
  },
  "format": "pdf", // or "docx"
  "summarize": true
}
```

## Features

### Data Extraction

- GitHub repository analysis and README parsing
- LeetCode problem-solving statistics
- Boot.dev course completion tracking
- Automatic skill categorization
- Project description generation

### Resume Generation

- AI-powered content summarization
- Professional formatting in DOCX and PDF
- Customizable personal information
- Rate limiting and caching
- Token usage tracking

### Technical Features

- Async web scraping for performance
- TTL-based rate limiting
- Error handling and retry logic
- CORS configuration for frontend integration
- Environment-based configuration

## Project Structure

```
PresenceCV/
├── backend/
│   ├── api/v1/endpoints/     # API route handlers
│   ├── core/                 # Configuration and settings
│   ├── models/               # Pydantic data models
│   ├── services/             # Business logic and scrapers
│   └── main.py               # FastAPI application entry
├── frontend/
│   ├── src/app/             # Next.js app directory
│   ├── src/components/      # React components
│   ├── src/services/        # API client functions
│   └── src/types/           # TypeScript type definitions
└── README.md
```
