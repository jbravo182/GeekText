import React, {Component} from "react";
import "./ModalImage.css"
import List from "./List";
import ModalCover from "./ModalCover";
import styled from "styled-components";
import axios from 'axios';
import Pagination from "react-js-pagination";
import linq from "linq";
import API from './utils/API';
//import Pagination from './Pagination';
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
var pageButtonClicked = false;

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
			allBooks: [],
            books: [],
            fi:[],
            pageOfItems: [],
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
        this.setOrder = this.setOrder.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() 
    {
        console.log('DidMount');
        this.retriveResults(this.props.match.params.term);
        if(this.props.pageSize > 0){
            this.setState({size: this.props.pageSize});
          }
    }
    

    shouldComponentUpdate(nextProps, nextState) 
    {
        console.log(nextState);
        console.log(this.state);
        if (this.props.match.params.term === nextProps.match.params.term && this.state.books.length === nextState.books.length && nextState.order === this.state.order && nextState.sort === this.state.sort)
        {
            console.log('Entered');
            console.log(nextProps.match.params.term + ' ' + nextState.books.length + ' ' + nextState.order + ' ' + nextState.sort);
            console.log(this.props.match.params.term + ' ' + this.state.books.length + ' ' + nextState.order + ' ' + this.state.setFilter);
            return false;
        }
        else
        {
            if (!topSellerClicked && !pageButtonClicked)
            {
                this.retriveResults(nextProps.match.params.term);
            }
            
            topSellerClicked = false;
            pageButtonClicked = false;
            return true;
        }
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
    

    retriveResults(term) {
        API.getAllBooks(term).then(res => this.state.allBooks = res.data).catch(err => alert("Search error - " + err));
        switch(this.state.sort.toLowerCase())
        {
            case "title":
                if (this.state.order === 'ASC')
                {
                    var tempBooks = linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.title).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10));
                    this.setState({books: tempBooks});
                }
                else
                {
                    var tempBooks = linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.title).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10));
                    this.setState({books: tempBooks});
                }
                break;
            case "author":
                if (this.state.order === 'ASC')
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.author).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                else
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.author).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                break;
            case "genre":
                if (this.state.order === 'ASC')
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.genre).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                else
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.genre).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                break;
            case "date":
                if (this.state.order === 'ASC')
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderBy(x => x.pub_date).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                else
                {
                    this.setState({books: linq.from(this.state.allBooks).where(x => JSON.stringify(x.title).toLowerCase().includes(term.toLowerCase())).orderByDescending(x => x.pub_date).toArray().slice((this.state.activePage * 10) - 10, (this.state.activePage * 10))});
                }
                break;
        }
    }

    topResults() 
    {
        topSellerClicked = true;
        this.setState({books: linq.from(this.state.allBooks).where(x => x.topSeller).orderBy(x => x.title).toArray()});
    }

    previousPage()
    {
        if(this.state.activePage !== 1)
        {
            pageButtonClicked = true;
            this.setState({activePage: this.state.activePage - 1});
        }
    }

    nextPage()
    {
        if(this.state.activePage <= this.state.books.length / 10)
        {
            pageButtonClicked = true;
            this.setState({activePage: this.state.activePage + 1});
        }
    }



    returnList() 
    {
        if (this.state.books.length !== 0 && this.state.books !== "0 results")
        {
            var bookList = this.state.books.map(function(book, index){
                return <List bookInfo={book} key={index} bookIndex={index}></List>;
              })
    
            return bookList;
        }
    }

    showNoResults()
    {
        if (this.state.books.length === 0)
        {
            return <NoResultsContainer>
                    <p>No titles found (0 hits)</p>
                </NoResultsContainer>;
        }
    }

    render() { 
        return ( 

            <div>
                {this.showNoResults()}              
                <ListContainer>

                    <ModalCover></ModalCover>
                    {this.returnList()}

                    
                </ListContainer>
                <p>ORDER THE BOOKS</p>
            <select id = "orderDropdown" defaultValue = {"ASC"} onChange = {this.setOrder}>
            <option value ={"DESC"}>DESCENDING</option>
            <option value ={"ASC"}>ASCENDING</option>
            </select>
            
            {/* {this.topResults()} */}
            
            <div id="listContainer">

            <select id = "filterDropdown" defaultValue = {"title"} onChange = {this.setFilter}>
            <option value ={"title"}>TITLE</option>
            <option value ={"author"}>AUTHOR</option>
            <option value ={"price"}>PRICE</option>
            <option value ={"date"}>DATE</option>
            </select>
                
                <button id="topSearch"  onClick = {() => this.topResults(this.props.match.params.term)}>Top Books</button>
           
            </div>
            <button id="previousPage"  onClick = {() => this.previousPage()}>Previous Page</button>
            <button id="nextPage"  onClick = {() => this.nextPage()}>Next Page</button>
        
            </div>
         );
    }
}
 
export default BookList;