import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IBlog } from '../utils/types';
import moment from 'moment';
import { User } from '../utils/api';

const Blogs: React.FC<BlogsProps> = props => {
    
    const { userid } = useParams<ParamsProps>();
    
    const [userBlogs, setUserBlogs] = React.useState<IBlog[]>([]);
    const [blogAuthor, setBlogAuthor] = React.useState<string>('');
    const [isUserAdmin, setIsUserAdmin] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${userid}`);
            const blogs = await res.json();
            setUserBlogs(blogs);
            setBlogAuthor(blogs[0].username);
        })();
    }, []);

    React.useEffect(() => {
        if (User.userid == userid) {
            setIsUserAdmin(true);
        };
    }, [User.userid]);
    
    if (!userBlogs) {
        return (
            <h1>Loading...</h1>
        );
    };

    if (!blogAuthor) {
        return (
            <h1>Loading...</h1>

            
            );
    };
    
    return (
        <main className="container d-flex justify-content-center">

            <div className="row d-flex justify-content-center">

                <div className="col-md-12 d-flex justify-content-center mb-3">
                    <h1 className="text-white my-4">All blogs by {blogAuthor}:</h1>
                </div>

                {isUserAdmin &&
                    <div className="col-md-12 d-flex justify-content-center mb-4">
                        <Link className="btn btn-outline-light" to={"/new/blog/compose"}>Post New Blog</Link>
                    </div>
                }
                <div className="col-md-12 d-flex justify-content-center flex-column">
                    {userBlogs.map((blog: IBlog) => (

                        <div key={`blog-${blog.id}`} className="w-100 d-flex justify-content-center">

                            <div className="w-50 card d-flex flex-wrap justify-content-center border rounded shadow p-3 my-3">

                                <Link className="h4 text-dark text-center" to={`/blog/${blog.id}`}>{blog.title}</Link>

                                <p className="card-text pt-2">{blog.content.substring(0, 125)}...</p>

                                <div className="d-flex justify-content-end">

                                    <p>{moment(userBlogs[0]._created).format("MMM Do YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

interface BlogsProps { };

interface ParamsProps {
    userid: string
};

export default Blogs;

// import { useEffect, useState } from 'react'; //
// import { useParams } from 'react-router-dom'

// const Blogs: React.FC<BlogsProps> = props => {
//     document.body.style.backgroundColor = '#B3B3B3';

//     const userid = useParams<ParamsProps>();
//     const [blogs, setBlogs] = useState([]);

//     React.useEffect(() => {
//         (async () => {
//             await fetch(`/api/blogs/`)
//                 .then(res => res.json())
//                 .then(allBlogs => setBlogs(allBlogs))
//         })()
//     }, []);

//     return (
//         <main className="container">
//             <section className="row">
//                 <div className="col-12">
//                     <h1 className="display-1 text-center">Blogs View</h1>
//                     {blogs.map((blog) => { //map through an array
//                         return (
//                             <>
                           
//                                 <h5>{blog.content}</h5>
//                                 <p>{blog.userid}</p>
//                             </>
//                         )
//                     })}


//                 </div>
//             </section>

//             <div className="card">
//                 <div className="card-body">
//                     <div className="position-static"></div>
//                     <a href="#" className="btn btn-primary">Write a blog</a>