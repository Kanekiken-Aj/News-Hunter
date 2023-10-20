import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }

  constructor() {
    super();
    // console.log("Hello I m A constructor form news component");
    this.state = {
      articles: [],
      loading: false,
      page:1,
      
    };
  }
  // achintyakumarjaiswal api 9de2fa9b60034499914c74126278541a
  async componentDidMount(){
    try{
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=1&pageSize=${this.props.pageSize}`;
        // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8fc83305d2c4605ac69e1575c4e8eec&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        
        console.log(parsedData);
        this.setState({
          articles: parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading: false,
        });
      }catch(error){
        console.error("Error fetching data:", error);
        this.setState({loading: false });
      }
  }

  handlePrevClick = async ()=>{
    console.log('prev clicked');
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    
    // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8fc83305d2c4605ac69e1575c4e8eec&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    })
  }

  handleNextClick = async () =>{
    console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      
      // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8fc83305d2c4605ac69e1575c4e8eec&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json()
        // console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      })
    }
  }


  render() {
    return (
  
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}> NewsHunter - Top Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                />
              </div>
        
          })}
        </div>
    
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
      
    )
  }
}

export default News;











// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=9de2fa9b60034499914c74126278541a&page=1&pageSize=6