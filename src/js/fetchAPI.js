import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const AUTH_KEY = '31458632-f974c55b2783a3eb2e44be64a';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 40;
    this.page = 1;
    this.totalImages = 0;
  }
  async fetchImages() {
    const options = {
      params: {
        key: AUTH_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page,
      },
    };
    const { data } = await axios(BASE_URL, options);
    return data;
  }
  incrementPage() {
    this.page += 1;
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
  hasPages() {
    return this.page < Math.ceil(this.totalImages / this.perPage);
  }
}
