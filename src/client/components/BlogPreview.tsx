import * as React from 'react';

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
    const [bodyPreview, setBodyPreview] = React.useState('')

    React.useEffect(() => {

        let getPreview = () => {
            let firstHundred: string
            let content = blog?.content
            firstHundred = content.substr(0, 100)
            setBodyPreview(`${firstHundred}...`)
        }

        getPreview()
    }, []
    )
    return (
        <div className="col-lg">
            <article className="card my-2 shadow">
                <div className="card-body">
                    <h1 className="card-title">{blog.title}</h1>
                    <p>{bodyPreview}</p>
                </div>
            </article>
        </div>
    )
}

interface BlogPreviewProps {
    title: string;
}

export default BlogPreview;