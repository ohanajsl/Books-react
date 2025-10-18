import { useState, useEffect } from "react";

function BookCard({book: {author_name, edition_count, first_publish_year, language, title, author_key, ia}}) {
    const [formats, setFormats] = useState({});
    const [loadingFormats, setLoadingFormats] = useState(false);

        useEffect(() => {
        if (!ia) return;

        const id = Array.isArray(ia) ? ia[0] : ia;
        const DLUrl = `https://archive.org/download`;

        const format = {
            PDF: `${DLUrl}/${id}.pdf`,
            EPUB: `${DLUrl}/${id}.epub`,
            TXT: `${DLUrl}/${id}.txt`,
            Read: `https://archive.org/stream/${id}`
        };

        setLoadingFormats(true);
        try {
            setFormats(format);
        } catch (error) {
            console.error(`${error}: failed fetching formats`);
        } finally {
            setLoadingFormats(false);
        }
    }, [ia]);


    return(
        <div className="book-card">
            <img className="book-cover" src={author_key ? `https://covers.openlibrary.org/a/olid/covers/olid/${author_key}-L.jpg` : './assets/no-image.webp'}/>
            <img className="author" src={author_key ? `https://covers.openlibrary.org/a/olid/${author_key}-L.jpg` : './assets/no-image.webp'} alt={author_name} />
            <div className="details">
                <h1 className="title">{title}</h1>
                <h2 className="author-name">Author Name[s]: {Array.isArray(author_name) ? author_name.join(', ') : author_name || 'Unavailable'}</h2>
                <h4>Edition: {edition_count}</h4>
                <p>Year published: {first_publish_year}</p>
                <p>{Array.isArray(language) ? `Available Languages: ${language.join(', ')}` : language || 'Language Unavailable'}</p>
                {loadingFormats ? (
                    <p>Loading formats...</p>
                ) : Object.keys(formats).length > 0 ? (
                    Object.entries(formats).map(([format, url]) => (
                        <a key={format} href={url} target="_blank" rel="noopener noreferrer" download={format !== 'Read'}>
                            <button className="button">{format}</button>
                        </a>
                    ))
                ) : (
                    <p>No downloads available</p>
                )}
                <p>note: download may not be available due to copyright issues</p>
            </div>
        </div>
    )
}

export default BookCard

//{DLUrl ? (<a href={DLUrl} target="_blank" download rel="referrer" ><button>Download PDF</button></a>) : (<p>no pdf available</p>)}