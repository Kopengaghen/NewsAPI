import {useEffect, useState} from "react";

function App() {
    const [news, setNews] = useState([])
    const [searchQuery, setSearchQuery] = useState("react")
    const [url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=react")
    const [loading, setLoading] = useState(false)

    const posts = () => {
        setLoading(true)
        fetch(url)
            .then(result => result.json())
            .then(data => (setNews(data.hits),
                setLoading(false)))
            .catch(error => console.log(error))
    }

    useEffect( () => {
        posts()
        }, [url])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    }

    return (
        <div>
            <h2>News</h2>
            {loading ? <h1>Loading...</h1> : ""}
            <form onSubmit={handleSubmit} >
                <input type="text" value={searchQuery} onChange={handleChange}/>
                <button>Search</button>
            </form>
            {news.map((item, index) => <p key={index}>{item.title}</p>)}
        </div>
    );
}

export default App;
