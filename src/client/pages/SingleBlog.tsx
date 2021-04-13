import * as React from 'react';
import { User } from '../utils/api';
import { IBlog } from '../utils/types';
import { useParams, Link } from 'react-router-dom';

const SingleBlog: React.FC<SingleBlogProps> = props => {

    const { blogid } = useParams<ParamsProps>();

    const [singleBlog, setSingleBlog] = React.useState<IBlog>();
    const [isUserAdmin, setIsUserAdmin] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetch(`/api/blog/${blogid}`)
        .then(res => res.json())
        .then(blog => setSingleBlog(blog));
    }, []);

    React.useEffect(() => {
        if(singleBlog){
            if (User.userid == singleBlog.userid) {
                setIsUserAdmin(true);
            } else {
                console.log('User is not admin.')
            };
        };
    }, [singleBlog]);

    if (!singleBlog) {
        return (
            <h1>Loading...</h1>
        );
    };

    return (
        <main className="container d-flex justify-content-center">
            <section className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center flex-wrap my-5">
                    <div className="w-100 d-flex justify-content-center">
                        <h1 className="text-center text-white my-3">{singleBlog.title}</h1>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h4 className="text-white">By {singleBlog.username}</h4>
                    </div>
                    <div className="card w-50 d-flex justify-content-center rounded shadow mt-3">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="card-text p-4">{singleBlog.content}</p>
                        </div>
                        {isUserAdmin && 
                            <div className="w-100 d-flex justify-content-end">
                                <Link to={`/blog/admin/${singleBlog.id}`} className="btn btn-outline-secondary m-2">Amin Options</Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </main>
    );
};

interface SingleBlogProps {};

interface ParamsProps {
    blogid: string
};

export default SingleBlog;