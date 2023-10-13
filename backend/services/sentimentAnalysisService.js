import XLSX from "xlsx";
import { Sentiment } from "../utils/classes.js";
import { ThresholdSentiment } from '../utils/constanst.js';

export default class SentimentAnalysisService {
    constructor() {
        this._corpus = this._loadCorpus();
        this.sentiment = null;
    }

    _loadCorpus() {
        const file = 'assets/kaggleWords.xlsx';
        const workbook = XLSX.readFile(file);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        const corpus = this._preprocess(data);
        return corpus;
    }

    _preprocess(data) {
        for (const item of data) {
            if ('__EMPTY' in item) {
                delete item.__EMPTY;
            }
            if ('Negative Sense Word List' in item) {
                item['negative'] = item['Negative Sense Word List'];
                delete item['Negative Sense Word List'];
            }
            if ('Positive Sense Word List' in item) {
                item['positive'] = item['Positive Sense Word List'];
                delete item['Positive Sense Word List'];
            }
        }
        data.shift();
        return data;
    }

    analyse(text) {
        let tokens = text.split(" ");
        let results = {
            positive: 0,
            negative: 0
        };
        for(const data of this._corpus) {
            for(const token of tokens) {
                if(data['positive'] && data['positive'].toLowerCase() === token.toLowerCase()) {
                    results['positive'] += 1;
                } else if(data['negative'] && data['negative'].toLowerCase() === token.toLowerCase()) {
                    results['negative'] += 1;
                } 
            }
        }
        let sentimentDifference = (results["positive"] / tokens.length - results["negative"] / tokens.length);
        this.sentiment = this._determineSentiment(sentimentDifference);
        return this;
    }

    _determineSentiment(sentimentDifference) {
        if (sentimentDifference > ThresholdSentiment.HIGH) {
            return Sentiment.POSITIVE;
        } else if (sentimentDifference <= ThresholdSentiment.LOW) {
            return Sentiment.NEGATIVE;
        } 
        return Sentiment.NEUTRAL;
    }
}