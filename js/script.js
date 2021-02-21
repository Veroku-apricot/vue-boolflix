const movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const tvApi = 'https://api.themoviedb.org/3/search/tv?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const trendingMovieApi ='https://api.themoviedb.org/3/trending/movie/week?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const trendingTvApi = 'https://api.themoviedb.org/3/trending/tv/week?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';

var app = new Vue ({
  el: '#app',
  data: {
    mainText: '',
    search: '',
    showLang: false,
    showGenre: false,
    moviesTv: [],
    languages: [
      {"english_name": "English"},
      {"english_name": "French"},
      {"english_name": "German"},
      {"english_name": "Italian"},
      {"english_name": "Japanese"},
      {"english_name": "Korean"},
      {"english_name": "Portuguese"},
      {"english_name": "Spanish"},
      {"english_name": "Swedish"}
    ],
    genres: []
  },

  mounted : function () {
    this.popularShows();

    // Language list
    // axios.get('https://api.themoviedb.org/3/configuration/languages?api_key=da5b0a9b54cbfc601e8917f9f7d3843c')
    //         .then(response => {
    //           this.languages = response.data;
    //         });
  
    // Genre list
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=da5b0a9b54cbfc601e8917f9f7d3843c')
          .then(response => {
            this.genres = response.data.genres;
          });

  },

  methods: {
    // Popular shows
    popularShows: function () {
      let requestOne = axios.get(trendingMovieApi);
      let requestTwo = axios.get(trendingTvApi);

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        let movies = responses[0].data.results;
        let tvs = responses[1].data.results;
        this.moviesTv = [...movies, ...tvs];
      }));

      this.mainText = 'POPULAR THIS WEEK';
      this.search = '';
      },
    // Search Results
    searchMovie: function () {
      let callApi = api => axios.get(api, {params: {query: this.search}});

      let requestOne = callApi(movieApi);
      let requestTwo = callApi(tvApi);

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        let movies = responses[0].data.results;
        let tvs = responses[1].data.results;
        this.moviesTv = [...movies, ...tvs];
      }));

      this.mainText = 'SEARCH RESULTS FOR ' + '"' + this.search + '"';
    },
    // Filters
    // Filter tv shows
    filterTv: function () {
      axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=da5b0a9b54cbfc601e8917f9f7d3843c')
            .then(response => {
              this.moviesTv = response.data.results;
            });
      this.mainText = 'POPULAR TV SHOWS';
    },
    // Filter movies
    filterMovie: function () {
      axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=da5b0a9b54cbfc601e8917f9f7d3843c')
            .then(response => {
              this.moviesTv = response.data.results;
            });
      this.mainText = 'POPULAR MOVIES';
    }
  }
})
