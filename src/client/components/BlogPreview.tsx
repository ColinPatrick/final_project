NOT USING ANYMORE.  

SAVE FOR IF WE WANT TO USE LATER.

import * as React from 'react';
import { Link } from 'react-router-dom'


const BlogPreview: React.FC<BlogPreviewProps> = ({mostRecentBlog}) => {
    const [bodyPreview, setBodyPreview] = React.useState('')

    return (
        <div className="row-12 mt-3">
                <h6>Most recent blog post</h6>
            <div className="col-lg">
                <article className="card my-2 shadow">
                    <div className="card-body">
                        <h1 className="card-title">{mostRecentBlog.title}</h1>
                        <p>{ mostRecentBlog.content }</p>
                        <Link to="/Blogs/:userid" className='btn btn-outline-primary'>Go To Blogs</Link>
                    </div>
                </article>
            </div>
        </div>
    )
}

interface BlogPreviewProps {
    title?: string,
    mostRecentBlog: any;
}

export default BlogPreview;


            {/* BLOGS CARD */ }
    // <div className="row-12">
    //     <BlogPreview key={`blog-preview-${mostRecentBlog.id}`} mostRecentBlog={mostRecentBlog} />
    //     <Link to={`/blogs/${userid}`} className='btn btn-outline-primary'>Go To Blogs</Link>
    // </div>