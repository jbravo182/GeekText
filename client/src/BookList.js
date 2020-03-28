import React, {Component} from "react";
import "./ModalImage.css"
import List from "./List";
import ModalCover from "./ModalCover";
import styled from "styled-components";
import axios from 'axios';
import Pagination from "react-js-pagination";
import linq from "linq";
import API from './utils/API';
//import 'rc-pagination/assets/index.css';

const pageSize = 10;


const ListContainer = styled.div`
    width: 60%;
    padding-top: 100px;
    float: right;
`;

const NoResultsContainer = styled.div`
    text-align: center;
`;

var topSellerClicked = false;

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
			allBooks: [],
            books: [],
            fi:[],
            onPage: 1,
            order: "ASC",
            pageSize:10,
            activePage:1,
            itemsCountPerPage: 1,
            pageRangeDisplayed: 4,
            totalItemsCount: 1,
            sort: "title"
        };
        this.retriveResults = this.retriveResults.bind(this);
        this.returnList = this.returnList.bind(this);
        this.showNoResults = this.showNoResults.bind(this);
        this.changeState = this.changeState.bind(this);
        this.ASC = this.ASC.bind(this);
        this.DESC = this.DESC.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.ASC.handlePageChange = this.handlePageChange.bind(this);
        this.DESC.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() 
    {
        this.retriveResults(this.props.match.params.term);
        if(this.props.pageSize){
            this.setState({size: this.props.pageSize});
          }
    }


    handlePageChange(pageNumber) 
    {
            console.log(`active page is ${pageNumber}`);
          //  this.setState({activePage: pageNumber});
        axios.get("http://localhost:3000/#/bookList?page="+ pageNumber).then.setState({
            books:this.props.books,
            itemsCountPerPage: this.props.itemsCountPerPage,
            totalItemsCount: this.props.totalItemsCount,
            activePage: this.props.activePage
        });    
        
     }
   

    
    onChangePage = (page) =>
    {
        console.log(Math.ceil(this.state.books.length/pageSize));
        this.setState({
            onPage: page,
        });

    }

    shouldComponentUpdate(nextProps, nextState) 
    {
        console.log(nextState);
        console.log(this.state);
        if (this.props.match.params.term === nextProps.match.params.term && this.state.books.length === nextState.books.length && nextState.order === this.state.order)
        {
            return false;
        }
        else
        {
            if (!topSellerClicked)
            {
                this.retriveResults(nextProps.match.params.term);
            }
            
            return true;
        }
    }

    changeState(response) {
        this.setState({
            books: response
        });
    }
   
    setOrder(event)
    {
        console.log('TEst ' + event.target.value);
        this.setState({order: event.target.value});
    }

    setFilter(event)
    {
        console.log("Another " + event.target.value);
        this.setState({sort: event.target.value});
    }

    DESC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
        //this.forceUpdate();
    }
    
    ASC(event){
        console.log(event.target.value);
        this.setState({order: event.target.value});
        //this.forceUpdate();
    }

    

    retriveResults(term) {
        API.getAllBooks(term).then(res => this.state.allBooks = res.data).catch(err => alert("Search error - " + err));
        switch(this.state.sort.toLowerCase())
        {
            case "title":
                if (this.state.order === 'ASC')
                {
                    console.log('Entered');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.title).toArray()});
                }
                else
                {
                    console.log('Another');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.title).toArray()});
                }
                break;
            case "author":
                if (this.state.order === 'ASC')
                {
                    console.log('Entered2');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.author).toArray()});
                }
                else
                {
                    console.log('Another2');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.author).toArray()});
                }
                break;
            case "genre":
                if (this.state.order === 'ASC')
                {
                    console.log('Entered3');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.genre).toArray()});
                }
                else
                {
                    console.log('Another3');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.genre).toArray()});
                }
                break;
            case "price":
                if (this.state.order === 'ASC')
                {
                    console.log('Entered4');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.price).toArray()});
                }
                else
                {
                    console.log('Another4');
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.price).toArray()});
                }
                break;
        }
    }

    // topResults(term) {
    //     topSellerClicked = true;
    //     ServerCall("topSearchInfo", term, this.changeState);
    // }

    returnList() {
        if (this.state.books.length !== 0 && this.state.books !== "0 results")
        {
            var bookList = this.state.books.map(function(book, index){
                return <List bookInfo={book} key={index} bookIndex={index}></List>;
              })
    
            return bookList;
        }
    }

    showNoResults() {
        if (this.state.books.length === 0)
        {
            return <NoResultsContainer>
                    <p>No titles found (0 hits)</p>
                </NoResultsContainer>;
        }
    }

    render() { 
      //  this.retriveResults();
        return ( 

            <div>
                {this.showNoResults()}              
                <ListContainer>

                    <ModalCover></ModalCover>
                    <Pagination class = "d-flex justify-content-center"
activePage={this.state.activePage}
totalItemsCount={this.state.totalItemsCount}
itemsCountPerPage={this.state.itemsCountPerPage}
totalItemsCount={this.state.totalItemsCount}
pageRangeDisplayed={this.state.pageRangeDisplayed}
onChange={this.handlePageChange}
itemClass='page-item'
linkClass= 'page-link'
total = {this.state.books.length}
                        /> 
                    {this.returnList()}

                    
                </ListContainer>
                <p>ORDER THE BOOKS</p>
            <select id = "orderDropdown" defaultValue = {this.state.order} onChange = {this.setOrder}>
            <option value ={"DESC"}>DESCENDING</option>
            <option value ={"ASC"}>ASCENDING</option>
            </select>
            
            {/* {this.topResults()} */}
            
            <div id="listContainer">

            <select id = "filterDropdown" defaultValue = {this.state.order} onChange = {this.setFilter}>
            <option value ={"title"}>TITLE</option>
            <option value ={"author"}>AUTHOR</option>
            <option value ={"price"}>PRICE</option>
            <option value ={"genre"}>GENRE</option>
            </select>
                
                <button id="topSearch"  onClick = {() => this.topResults(this.props.match.params.term)}>Top Books</button>
           
            </div>
        
          
            </div>
         );
    }
}
 
export default BookList;