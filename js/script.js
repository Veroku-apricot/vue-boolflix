const movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';
const tvApi = 'https://api.themoviedb.org/3/search/tv?api_key=da5b0a9b54cbfc601e8917f9f7d3843c';

var app = new Vue ({
  el: '#app',
  data: {
    search: '',
    moviesTv: []
  },
  methods: {
    searchMovie: function () {
      // let requestOne = axios.get(movieApi, {
      //   params: {
      //     query: this.search
      //   }
      // });
      // let requestTwo = axios.get(tvApi, {
      //   params: {
      //     query: this.search
      //   }
      // });
      let callApi = api => axios.get(api, {params: {query: this.search}});

      let requestOne = callApi(movieApi);
      let requestTwo = callApi(tvApi);

      axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        let movies = responses[0].data.results;
        let tvs = responses[1].data.results;
        this.moviesTv = [...movies, ...tvs];
      }));

   }
  }
})
