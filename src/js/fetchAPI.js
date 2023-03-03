const BASE_URL = 'https://pixabay.com/api/';
const AUTH_KEY = '31458632-f974c55b2783a3eb2e44be64a';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    const url = `${BASE_URL}?key=${AUTH_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.page += 1;
        return data;
      });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
