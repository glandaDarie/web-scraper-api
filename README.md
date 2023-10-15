# Web Scrapper API Documentation

This repository provides an API for web scraping and sentiment analysis of web content.

## Endpoints

### Get Scrapped Content

- **URL**: `/scrape`
- **Method**: GET
- **Query Parameters**:
  - `url` (string, required): The URL of the web page to be scraped.
- **Description**: Scrapes web content, performs sentiment analysis, and returns the scrapped data.

#### Example Request

GET /scrape?url=https://example.com

#### Example Response

```json
[
  {
    "title": "Sample Title",
    "short_description": "Short description of the content.",
    "author": "John Doe",
    "profession": "Author",
    "href": "https://example.com/page1",
    "image": "https://example.com/image.jpg",
    "sentiment": "positive",
    "words": 250
  },
  {
    "title": "Sample Title 2",
    "short_description": "Some other short description of the content.",
    "author": "Michael Jordan",
    "profession": "Teacher",
    "href": "https://example.com/page2",
    "image": "https://example.com/image2.jpg",
    "sentiment": "neutral",
    "words": 138
  }
]
