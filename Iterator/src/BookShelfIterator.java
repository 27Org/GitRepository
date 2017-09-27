
public class BookShelfIterator implements Iterator, java.util.Iterator {
	private BookShelf bookshelf;
	private int index;
	

	public BookShelfIterator(BookShelf bookshelf) {
		super();
		this.bookshelf = bookshelf;
		this.index = 0;
	}

	@Override
	public boolean hasNext() {
		if(index<bookshelf.getLength()){
			return true;
		}else{
		return false;
		}
	}

	@Override
	public Object next() {
		Book book=bookshelf.getBookAt(index);
		index++;
		return book;
	}

}
