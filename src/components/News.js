import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("Hello I m A constructor form news component");
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults: 0,
      
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHunter`;
  }

  
  
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log('Initial data:', parsedData);
    
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false, 
    });
    this.props.setProgress(100);

}



// handlePrevClick = async () => {
//   this.setState({ page: this.state.page - 1 });
//   this.updateNews();
// }

// handleNextClick = async () => {
//   this.setState({ page: this.state.page + 1 });
//   this.updateNews()
// }

// async componentDidMount(){
//   let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=1&pageSize=${this.props.pageSize}`;
//   this.setState({loading: true})
//   let data = await fetch(url);
//   let parsedData = await data.json()
  
//   // console.log(parsedData);
//   this.setState({
//     articles: parsedData.articles, 
//     totalResults: parsedData.totalResults,
//     loading: false})
//     // this.updateNews();
// }
async componentDidMount() {
  this.updateNews();
}

// fetchMoreData = async () => {  
//   this.setState({page: this.state.page + 1})
//   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   console.log('More data:', parsedData);


  
//   this.setState({
//       articles: this.state.articles.concat(parsedData.articles),
//       totalResults: parsedData.totalResults,
//   })
// };

fetchMoreData = async () => {
  const newPage = this.state.page + 1;
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${newPage}&pageSize=${this.props.pageSize}`;
  
  try {
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log('More data:', parsedData);

    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: newPage, // Update the page in the state
    }));
  } catch (error) {
    console.error('Error fetching more data:', error);
  }
};












  
  

  // handlePrevClick = async ()=>{
  //   console.log('prev clicked');
  //   let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   })

  //   // this.setState({page: this.state.page - 1});
  //   // this.updateNews();
  // }
  // // 9de2fa9b60034499914c74126278541a
  // // e8fc83305d2c4605ac69e1575c4e8eec
  // handleNextClick = async () =>{
  //   console.log("Next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true})
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //       console.log(parsedData);

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false,
  //     })
  //   }
  //   // this.setState({page: this.state.page + 1});
  //   // this.updateNews();
  // }

// ------- ---
  render() {
    return (
      <>
      {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{margin: '30px 0px'}}> NewsHunter - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > 
        <div className="container">
          <div className="row">
          
          {this.state.articles.map((element,index) => {
            return <div className="col-md-4" key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title?element.title:""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author} 
                  date={element.publishedAt} 
                  source={element.source.name}

                />
              </div>
        
          })}
        </div>
        </div> 
      </InfiniteScroll>
      </>
    )
  }
}

export default News;











// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=9de2fa9b60034499914c74126278541a&page=1&pageSize=6