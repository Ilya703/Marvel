
class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=4178a332d522df72b8ad86f711396faf';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (result) => {
        return {
            id: result.id,
            name: result.name,
            description: result.description,
            thumbnail: result.thumbnail.path + '.' + result.thumbnail.extension,
            homepage: result.urls[0].url,
            wiki: result.urls[1].url,
            comics: result.comics.items
        }
    }
}

export default MarvelServices;