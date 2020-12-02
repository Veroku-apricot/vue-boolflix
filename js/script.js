var app = new Vue ({
  el: '#app',
  data: {
    search: '',
    movies: []
  },
  methods: {
    searchMovie: function () {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=da5b0a9b54cbfc601e8917f9f7d3843c&query=back+to+the+future')
      .then(response => {
        this.movies = response.data.results
      });
    }
  }
})
