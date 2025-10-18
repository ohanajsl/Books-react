import { useState, useEffect } from 'react'
import {useDebounce} from 'react-use'
import Searchbar from './search'
import BookCard from './bookCard'
import './index.css'

function App() {
  const [Search, setSearch] = useState('')
  const [Loading, setLoading] = useState(false)
  const [BookList, setBookList] = useState([])
  const [error, setError] = useState("")
  const [DebounceSearchTerm, setDebounceSearchTerm] = useState('')

  //fixed pain in the a### api-call-spams whenever typing
  useDebounce(() => setDebounceSearchTerm(Search), 1000, [Search])

  const BaseUrl = 'https://openlibrary.org/search.json?'
  const Fetch = async (query='lord of the rings') => {
    setLoading(true)
    setBookList([])
    setError("")
    try {
      const endpoint = query ? `${BaseUrl}title=${encodeURIComponent(query)}` : 'lord of the rings'
      const response = await fetch(endpoint)
      console.log(response)

      if (!response.ok) {
        setBookList([])
        throw new Error("failure fetching books")
      }
      const data = await response.json()
      console.log("dataAPI : ", data)
      if (!data.docs || data.docs.length === 0) {
        setBookList([])
        setError("Failed fetching data 😭, PLease try searching again")
      }
      else {
        setBookList(Array.isArray(data?.docs) ? data.docs : [])
      }
    }
    catch (error) {
      console.error("Fetch error:", error)
      setBookList([])
      setError(error.message || "Failed to fetch books. Please try again.")
    }
    finally {
      setLoading(false)
    }
  }

useEffect (() => {
  Fetch(DebounceSearchTerm)}, [DebounceSearchTerm]
)

  return (
    <>
    <div className='container'>
    <div className='header'>
    <h1>Search for your Favourite book!</h1>
    <Searchbar Search={Search} setSearch={setSearch}/>
    </div>
    <div className='container-inner'>
      {Loading ? (<div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>) : error ? (<p style={{ color: 'red' }}>{error}</p>) : (
        <>
          <ul>
            {BookList.map((book) => (<BookCard id={book.key || book.cover_edition_key} book={book}/>))}
          </ul>
        </>
      )}
    </div>
    </div>
    </>
  )
}

export default App
