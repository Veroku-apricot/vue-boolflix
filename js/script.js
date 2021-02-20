const movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const tvApi = 'https://api.themoviedb.org/3/search/tv?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const trendingMovieApi ='https://api.themoviedb.org/3/trending/movie/week?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const trendingTvApi = 'https://api.themoviedb.org/3/trending/tv/week?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';

var app = new Vue ({
  el: '#app',
  data: {
    mainText: '',
    search: '',
    moviesTv: []
  },
  // Popular shows
  mounted : function () {
    let requestOne = axios.get(trendingMovieApi);
    let requestTwo = axios.get(trendingTvApi);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      let movies = responses[0].data.results;
      let tvs = responses[1].data.results;
      this.moviesTv = [...movies, ...tvs];
    }));

    this.mainText = 'POPULAR THIS WEEK';
  },
  // Search Results
  methods: {
    searchMovie: function () {
      let callApi = api => axios.get(api, {params: {query: this.search}});

      let requestOne = callApi(movieApi);
      let requestTwo = callApi(tvApi);

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        let movies = responses[0].data.results;
        let tvs = responses[1].data.results;
        this.moviesTv = [...movies, ...tvs];
      }));

      this.mainText = 'SEARCH RESULT FOR ' + '"' + this.search + '"';
    }
  }
})
