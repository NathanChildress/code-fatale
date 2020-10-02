ReactDOM.render(<App />, document.querySelector("main"));
class App extends React.Component {
  state = {
  title: '',
  post: '',
  mood: '',
  img:'',
  blogs:[]
}

componentDidMount = () => {
  axios.get('/blogs').then(response => {
    this.setState({
      blogs: response.data
    })
  })
}
handleChange = event => {
  this.setState({ [event.target.id]: event.target.value})
}

handleSubmit = event => {
  event.preventDefault()
  axios
  .post('/blogs', this.state)
  .then(response =>
    this.setState(
    { title: '',
      blogs: response.data
    })
  )
}

deleteBlog = event => {
  axios.delete('/blogs/' + event.target.value).then(response => {
    this.setState({
      blogs: response.data
    })
  })
}

updateBlog = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios
    .put('/blogs/' + id, this.state)
    .then(response => {
      this.setState({
        blogs: response.data,
        title: '',
      })
    })
}

  render = () => {
    return (
      <div>
        <details>
          <summary>Add Blog</summary>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" onChange={this.handleChange}/>
            <br />
            <label htmlFor="post">Post: </label>
            <input type="text" id="post" onChange={this.handleChange}/>
            <br />
            <label htmlFor="mood">Mood: </label>
            <input type="text" id="mood" onChange={this.handleChange}/>
            <br />
            <label htmlFor="img">Image: </label>
            <input type="text" id="img" onChange={this.handleChange}/>
            <br />
            <input type="submit" value="Create Blog" />
          </form>
          </details>
      <section>
        <div className="container">
            <iframe width="677" height="381" src="https://www.youtube.com/embed/zmPzbZVUp3g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
      </section>
          <h2>List of Blogs</h2>

          <ul>
            {this.state.blogs.map(blog => { return (
            <li key={blog._id}>
            Title:
              {blog.title} <br />
              <img src={blog.img} alt={blog.title}/><br />
               <details>
                  <summary>More info</summary>
                  title: {blog.title}<br />
                  post: {blog.post}<br />
                  mood: {blog.mood}<br />
                  img: {blog.img}<br />
                  <br />
                  <br />
                  <details>
                  <summary>Edit info</summary>
                  <form id= {blog._id} onSubmit= {this.updateBlog}>
                    <label htmlFor="title">title:</label>
                    <input
                      type="text"
                      id="title"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <label htmlFor="post">post:</label>
                    <input
                      type="text"
                      id="post"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <label htmlFor="img">image:</label>
                    <input
                      type="text"
                      id="img"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />

                    <label htmlFor="mood">mood:</label>
                    <input
                      type="text"
                      id="mood"
                      onChange={this.handleChange}
                      value={this.state.name}
                    /> <br />
                    <input type="submit" value="Update Blog" />
                    </form>
                    </details> <br />
                    <button
                     value= {blog._id}
                     onClick= {this.deleteBlog}
                     >This is a bad blog
                     </button>

                </details>
            </li>
          )})}
          </ul>
        </div>
    )
  }
}

ReactDOM.render(
  <App />, document.querySelector('main'))
