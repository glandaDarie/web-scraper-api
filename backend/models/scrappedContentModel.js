export default class ScrappedContentModel {
    constructor(title, shortDescription, author, profession, 
        href, image, sentiment, words) {
        this._title = title;
        this._shortDescription = shortDescription;
        this._author = author
        this._profession = profession;
        this._href = href;
        this._image = image;
        this._sentiment = sentiment;
        this._words = words;
    }

    get title() {
        return this._title;
    }

    get shortDescription() {
        return this._shortDescription;
    }

    get author() {
        return this._author;
    }

    get profession() {
        return this._profession;
    }

    get href() {
        return this._href;
    }

    get image() {
        return this._image;
    }

    get sentiment() {
        return this._sentiment;
    }

    get words() {
        return this._words;
    }

    set title(_title) {
        this._title = _title;
    }

    set shortDescription(_shortDescription) {
        this._shortDescription = _shortDescription;
    }

    set author(_author) {
        this._author = _author;
    } 

    set profession(_profession) {
        this._profession = _profession;
    }

    set href(_href) {
        this._href = _href;
    }

    set image(_image) {
        this._image = _image;
    }

    set sentiment(_sentiment) {
        this._sentiment = _sentiment;
    }

    set words(_words) {
        this._words = _words;
    }

    static toObject(title, shortDescription, author, profession, href, image, sentiment, words) {
        return {
            title: title,
            short_description: shortDescription,
            author: author,
            profession: profession,
            href: href,
            image: image,
            sentiment: sentiment,
            words: words
        };
    }

    toString() {
        return `title: ${this._title}, 
            shortDescription: ${this._shortDescription}, 
            author: ${this._author}, 
            profession: ${this._profession},
            href: ${this._href},
            image: ${this._image},
            sentiment: ${this._sentiment},
            words: ${this._words}`;
      }
}