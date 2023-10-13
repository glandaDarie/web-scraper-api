export default class WebScrapperController {
    constructor(webScrapperService) {
        this.webScrapperService = webScrapperService;
    }
    async getApiResponse(req, res) {
        return await this.webScrapperService.getApiResponse(req, res);
    }
}