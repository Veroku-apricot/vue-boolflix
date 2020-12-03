var app = new Vue ({
  el: '#app',
  data: {
    search: '',
    movies: []
  },
  methods: {
    searchMovie: function () {
      axios.get('https://api.themoviedb.org/3/search/multi?api_key=da5b0a9b54cbfc601e8917f9f7d3843c', {
        params: {
          query: this.search
        }
      })
      .then(response => {
        this.movies = response.data.results;
      });
    }
  }
})
