import config from '../config';


const BookmarksServices = {
  getAllBookmarks(){
    return fetch(`${config.API_ENDPOINT_LOCAL}/bookmarks`, {
      headers: {
        'Authorization': `Bearer ${config.API_KEY}` 
      }
    })
      .then(bookmarks => bookmarks);
  },

  searchBookmarks(){},

  addBookmark(){},

  deleteBookmark(id){},

  updateBookmark(){}
};

export default BookmarksServices;