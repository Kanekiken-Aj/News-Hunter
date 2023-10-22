import React, {  useEffect,  useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0);
   // eslint-disable-next-line
  const [message, setMessage] = useState("");


 
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `${capitalizeFirstLetter(props.category)} - NewsHunter`;

  
  
//   const updateNews = async () => {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//     setLoading(true)
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     // console.log('Initial data:', parsedData);
//     setArticles(parsedData.articles)
//     setTotalResults(parsedData.totalResults)
//     setLoading(false)
//     props.setProgress(100);

// }

const updateNews = async ()=> {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json()
  props.setProgress(70);
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  props.setProgress(100);

  // Check if the code is running on a local host
const isLocal = window.location.hostname === 'localhost';

  if (!isLocal) {
    setMessage("The current project is using Developer plan of News API since it not running on localhost. News API is not available.");
  } 


}

useEffect(() => {
  updateNews();
  // eslint-disable-next-line
}, []); // Include relevant dependencies

// [props.country, props.category, props.apiKey, props.pageSize]


const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  const newPage = page + 1;
  
  try {
    const data = await fetch(url);
    const parsedData = await data.json();
    // console.log('More data:', parsedData);
    setArticles((prevArticles)=> prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(newPage);

  } catch (error) {
    console.error('Error fetching more data:', error);
  }
};
  // handlePrevClick = async ()=>{
  //   console.log('prev clicked');
  //   let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
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
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
  //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9de2fa9b60034499914c74126278541a&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
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

    return (
      <>
      {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{margin: '30px 0px', marginTop:'90px'}}> NewsHunter - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading && <Spinner/>}

        {message && <p className="message" style={{textAlign: "center"}}>{message}</p>} 
        {/* Render the message here */}
        <InfiniteScroll
          dataLength={articles? articles.length:0}
          next={fetchMoreData}
          hasMore={articles ? articles.length !== totalResults: false}
          loader={<Spinner/>}
        > 
        <div className="container">
          <div className="row">
          
          {articles && articles.map((element,index) => {
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



News.defaultProps = {
  country: 'in',
  pageSize: 8, 
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
}
export default News;








// https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=9de2fa9b60034499914c74126278541a&page=1&pageSize=6