import React from 'react';

const BookmarkContext = React.createContext({
  bookmarks: [],
  setBookmarks: function(){}
});

export default BookmarkContext;