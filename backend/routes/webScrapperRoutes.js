import express from 'express';
import WebScrapperController from '../controllers/webScrapperController.js';
import WebScrapperService from '../services/webScrapperService.js';

const router = express.Router();
const webScrapperService = new WebScrapperService();
const webScrapperController = new WebScrapperController(webScrapperService);

router.get('/', async (req, res) => {
    return await webScrapperController.getApiResponse(req, res);
});

export default router;