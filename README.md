# PresenceCV

A full-stack application that automatically generates professional resumes by scraping data from your GitHub, LeetCode, and Boot.dev profiles. The application uses AI to intelligently format and present your coding achievements, projects, and skills in a polished resume format.

## What It Does

PresenceCV aggregates your programming accomplishments from multiple platforms:

- **GitHub**: Extracts repositories, contributions, languages used, and project details
- **LeetCode**: Gathers problem-solving statistics and achievements
- **Boot.dev**: Collects course completions and learning progress

The scraped data is then processed using AI to generate a professionally formatted resume that highlights your technical skills, projects, and coding experience. Resumes are generated in Word document format (.docx) for easy customization and sharing.

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
   - Recommended: Connect Google Gemini API key (free with high limits)

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

2. Install dependencies:

   ```sh
   bun install
   ```

3. Start the development server:
   ```sh
   bun dev
   ```

The frontend will be available at `http://localhost:3000`
