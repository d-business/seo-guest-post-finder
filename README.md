# SEO Guest Post Finder

An application for finding guest posting opportunities in various niches, with domain authority filtering and contact information extraction.

## Features

- **Niche Identification & Website Discovery**: Find websites relevant to your client's industry.
- **Domain Authority Analysis**: Filter websites by domain authority (0-80).
- **Keyword Research Integration**: Pull keyword data from SEMrush API.
- **Competitor Analysis**: Analyze competitor backlink profiles.
- **Contact Information Extraction**: Scrape websites for contact emails and submission forms.
- **Outreach Management**: Track outreach progress and export data for campaigns.

## Project Structure

```
seo-guest-post-finder/
│
├── backend/               # Python Flask backend
│   ├── app.py             # Main Flask application
│   ├── config.py          # Configuration settings
│   ├── requirements.txt   # Python dependencies
│   ├── services/          # Service modules for API, scraping, etc.
│   ├── models/            # Database models
│   └── utils/             # Helper functions
│
└── frontend/              # React frontend
    ├── public/
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation

### Prerequisites

- Python 3.8+ and pip
- Node.js 14+ and npm
- SEMrush API key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your API keys:
   ```
   SEMRUSH_API_KEY=your_semrush_api_key
   SECRET_KEY=your_secret_key
   ```

5. Run the Flask application:
   ```
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Usage

1. Enter your client's niche/industry in the search form (e.g., "fitness," "digital marketing").
2. Optionally add relevant keywords and competitor domains.
3. Set the desired Domain Authority range (0-80).
4. Click "Find Opportunities" to start the search.
5. View the results in the dashboard and website list tabs.
6. Use the filters to narrow down the results.
7. Export the data or mark websites for outreach.

## SEMrush API Integration

This application uses the SEMrush API for:
- Domain Overview: Authority Score, traffic, backlinks
- Keyword Research: Volume, difficulty, CPC
- Backlink Analysis: Referring domains, anchor text

You need a valid SEMrush API key to use these features. Set it in the `.env` file as shown in the Backend Setup section.

## Development Phases

### Phase 1 (Current)
- Niche input, website discovery, and DA filtering
- Basic SEMrush integration
- Simple UI and database setup

### Phase 2 (Planned)
- Full SEMrush integration with Backlink Analytics
- Contact info extraction improvement
- Outreach tracking and export options

### Phase 3 (Future)
- Social media integration
- Advanced UI features
- Multi-user support

## License

MIT