
function Searchbar({Search, setSearch}) {
    return(
            <div className="input-container">
                <input type="text" value={Search} onChange={(event) => setSearch(event.target.value)} className="input" placeholder="one search, millions of results" name="text"/>
            </div>
    )
}

export default Searchbar