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
  }
]
