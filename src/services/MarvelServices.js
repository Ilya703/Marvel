import { useHttp } from '../hooks/http.hook';

const useMarvelServices = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=4178a332d522df72b8ad86f711396faf';
    const _baseOffset = 210;

    const _transformCharacter = (result) => {
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

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    return {loading, error, getCharacter, getAllCharacters, clearError};
}

export default useMarvelServices;