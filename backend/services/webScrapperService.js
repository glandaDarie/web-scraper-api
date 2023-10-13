import puppeteer from 'puppeteer';
import validateUrl from '../utils/urlValidator.js';
import { XPaths } from '../utils/constanst.js';
import ScrappedContentModel from '../models/scrappedContentModel.js';
import SentimentAnalysisService from './sentimentAnalysisService.js';

export default class WebScrapperService {
    async getApiResponse(req, res) {
        try {
            const webScrapperUrl = req.query.url;
            const validatorResponse = validateUrl(webScrapperUrl);
        
            if (validatorResponse.isValid === false) {
                return res.status(400).json({
                    error: validatorResponse.error
                });
            }
            const scrapedData = await this._scrape(webScrapperUrl);
            
            return Array.isArray(scrapedData) ? 
            res.status(200).json(scrapedData) : 
            res.status(500).json({
                error: "We couldn't retrieve the content from the webpage. Please try again later or check the URL."
            });

        } catch (error) {
            return res.status(500).json({
                error: `Error occurred while scraping the webpage: ${error}`
            });
        }
    }

    async _scrape(url) {
        let scrapedData = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        let scraperResponse = null;
        try {
            const sentimentAnalysisService = new SentimentAnalysisService();
            let divElements = await page.$x(XPaths.MAIN_DIV_ELEMENTS_XPATH);
            for (let index = 0; index < divElements.length; ++index) {
                const divElement = divElements[index];
                const href = await this._scrapeElementHref(page, divElement);
                scraperResponse = await this._scrapeTextForSentimentAnalysis(page);
                if(scraperResponse.body === undefined) {
                    return scraperResponse;
                }
                const scrapedSentimentAnalysisText = scraperResponse.body;
                const words = this._wordCountblogPostContent(scrapedSentimentAnalysisText);

                const sentimentText = scrapedSentimentAnalysisText.join(" ---- ")
                const sentiment = sentimentAnalysisService.analyse(sentimentText).sentiment;
                
                scraperResponse = await this._scrapeBottomDivPart(page, divElement);
                if (scraperResponse.body === undefined) {
                    return scraperResponse;
                }
                const [title, shortDescription] = scraperResponse.body;
                scraperResponse = await this._scrapeBottomDivPart(page, divElement, "author-profession");
                if (scraperResponse.body === undefined) {
                    return scraperResponse;
                }
                const [author, profession] = scraperResponse.body;
                const url = new URL(href);
                scraperResponse = await this._scrapeTopDivPart(page, divElement, `${url.protocol}//${url.host}`);
                if(scraperResponse.body === undefined) {
                    return scraperResponse;
                }
                const image = scraperResponse.body;
                scrapedData.push(ScrappedContentModel.toObject(title, shortDescription, author, profession, 
                                                               href, image, sentiment, words));
                await Promise.all([
                    page.goBack(),
                    page.waitForNavigation({ waitUntil: 'domcontentloaded' })
                ]);
                divElements = await page.$x(XPaths.MAIN_DIV_ELEMENTS_XPATH);
            }
        } catch (error) {
            return {
                error: error
            }
        }
        await browser.close();
        return scrapedData;
    }

    _wordCountblogPostContent(text) {
        const wordCount = text.reduce((count, sentence) => {
            const words = sentence.split(" ");
            return count + words.length;
        }, 0);
        return wordCount;
    }

    async _scrapeElementHref(page, element) {
        let href;
        await element.click();
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        href = page.url();
        return href;
    }

    async _scrapeBottomDivPart(page, divElement, toScrap = "title-short_description") {
        let divElements = null;
        let elementContent = null;
        try {
            divElements = await divElement.$$('xpath' + XPaths.DIV_BOTTOM_ELEMENTS_XPATH);
            if (toScrap === "title-short_description") {
                elementContent = await page.evaluate(element => element.textContent, divElements[1]);
            } else if (toScrap === "author-profession") {
                elementContent = await page.evaluate(element => element.textContent, divElements[2]);
            } else {
                return { 
                    error: "Invalid 'toScrap' parameter" 
                };
            }
        } catch (error) {
            return { 
                error: `Error occurred while scraping: ${error.message}`
            };
        }
        return {
            body: elementContent.split(/(?<=[a-z])(?=[A-Z])/)
        };
    }

    async _scrapeTopDivPart(page, divElement, imageUrl) {
        let images = null;
        try {   
            divElement = await divElement.$$('xpath' + XPaths.IMG_TOP_SRCSET_XPATH);
            const srcset = await page.evaluate(element => element.getAttribute("srcset"), divElement[0]);
            let srcsetParts = srcset.split(', ');
            images = srcsetParts.map((srcsetPart) => imageUrl + srcsetPart.split(' ')[0]);
        } catch (error) {
            return { 
                error: `Error occurred while scraping: ${error.message}`
            };
        } 
        return {
            body: images[1]
        };
    }

    async _scrapeTextForSentimentAnalysis(page) {
        try {
            const divElements = await page.$x(XPaths.DIV_SENTIMENT_ANALYSIS_XPATH);
            const sentimentAnalysisText = await Promise.all(
                divElements.map(async (divElement) => {
                    return await page.evaluate((element) => element.textContent, divElement);
                })
            );
            return {
                body: sentimentAnalysisText
            };
        } catch (error) {
            return {
                error: error
            };
        }
    }
}