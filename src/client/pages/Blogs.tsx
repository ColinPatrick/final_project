import * as React from 'react';
import { useEffect, useState } from 'react'; //
import { useParams } from 'react-router-dom'

const Blogs: React.FC<BlogsProps> = props => {
    document.body.style.backgroundColor = '#B3B3B3';

    const userid = useParams<ParamsProps>();
    const [blogs, setBlogs] = useState([]);

    React.useEffect(() => {
        (async () => {
            await fetch(`/api/blogs/`)
                .then(res => res.json())
                .then(allBlogs => setBlogs(allBlogs))
        })()
    }, []);

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">Blogs View</h1>
                    {blogs.map((blog) => { //map through an array
                        return (
                            <>
                           
                                <h5>{blog.content}</h5>
                                <p>{blog.userid}</p>
                            </>
                        )
                    })}


                </div>
            </section>

            <div className="card">
                <div className="card-body">
                    <div className="position-static"></div>
                    <a href="#" className="btn btn-primary">Write a blog</a>
                </div>
            </div>
        </main>
    );


}

interface BlogsProps { }

interface ParamsProps {
    userid: string;
}

export default Blogs;


