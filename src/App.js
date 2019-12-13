import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import BookmarkServices from './services/bookmark-services';
import BookmarkContext from './Bookmark-context';

// const bookmarks = [
//   // {
//   //   id: 0,
//   //   title: 'Google',
//   //   url: 'http://www.google.com',
//   //   rating: '3',
//   //   desc: 'Internet-related services and products.'
//   // },
//   // {
//   //   id: 1,
//   //   title: 'Thinkful',
//   //   url: 'http://www.thinkful.com',
//   //   rating: '5',
//   //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
//   // },
//   // {
//   //   id: 2,
//   //   title: 'Github',
//   //   url: 'http://www.github.com',
//   //   rating: '4',
//   //   desc: 'brings together the world\'s largest community of developers.'
//   // }
// ];

class App extends Component {
  
  state = {
      page: 'list',
      bookmarks: [],
      error: null
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    console.log(bookmarks);
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    BookmarkServices.getAllBookmarks()
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => this.setBookmarks(data))
      .catch(error => this.setState({ error }))
  }

  render() {
    const { bookmarks, page } = this.state;
    const contextValue = { 
      bookmarks: this.state.bookmarks, 
      setBookmarks: this.setBookmarks
    };
    return (
      <BookmarkContext.Provider value={contextValue}>
        <main className='App'>
          <h1>Bookmarks!</h1>
          <Nav clickPage={this.changePage} />
          <div className='content' aria-live='polite'>
            {page === 'add' && (
              <AddBookmark
                onAddBookmark={this.addBookmark}
                onClickCancel={() => this.changePage('list')}
              />
            )}
            {page === 'list' && (
              <BookmarkList
                bookmarks={bookmarks}
              />
            )}
          </div>
        </main>
      </BookmarkContext.Provider>
      );
  }
}

export default App;
