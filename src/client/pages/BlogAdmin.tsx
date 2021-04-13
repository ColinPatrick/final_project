import * as React from 'react';
import { json, User } from '../utils/api';
import { useParams, withRouter, RouteComponentProps } from 'react-router-dom';

const BlogAdmin: React.FC<BlogAdminProps> = props => {

    const { blogid } = useParams<ParamsProps>();

    const [blogTitle, setBlogTitle] = React.useState<string>('');
    const [blogContent, setBlogContent] = React.useState<string>('');
    const [blogAuthor, setBlogAuthor] = React.useState<string>('');
    const [blogUserid, setBlogUserid] = React.useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blog/${blogid}`);
            const blog = await res.json();
            setBlogTitle(blog.title);
            setBlogContent(blog.content);
            setBlogAuthor(blog.username);
            setBlogUserid(blog.userid);
        })();
    }, [blogid]);

    React.useEffect(() => {
        if (!User.userid) {
            setIsLoggedIn(false);
        };
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let editBlogObject: { content: string } = {
            content: blogContent
        };
        
        let res = await json(`/api/blog/${blogid}`, 'PUT', editBlogObject);
        if (res) {
            props.history.push(`/blog/${blogid}`);
        };
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let res = await json(`/api/blog/${blogid}`, 'DELETE');
        if (res) {
            props.history.push(`/blogs/${blogUserid}`);
        };
    };


    if (!isLoggedIn) {
        return (<div className="container d-flex justify-content-center my-2">
            <div className="row d-flex justify-content-center my-2">
                <div className="col-md-8 d-flex justify-content-center my-2">
                    <h1 className="my-3">You are not logged in. Please go to the login page to sign in.</h1>
                </div>
            </div>
        </div>);
    };

    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h3 className="text-white">{blogAuthor}</h3>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h5 className="text-white">Edit your blog: {blogTitle}</h5>
                    </div>
                    <div className="card col-md-7 border shadow rounded mt-2">
                        <div className="form-group p-3">
                            <label htmlFor="review" className="m-2">Your Blog Content:</label>
                            <textarea
                                defaultValue={blogContent}
                                onChange={e => setBlogContent(e.target.value)}
                                rows={20}
                                className="form-control form-control-log my-2"
                                placeholder="Edit your blog here..."
                            />
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-outline-danger" onClick={ handleDelete }>Delete Blog</button>
                                <button className="btn btn-outline-primary" onClick={ handleSubmit }>Save Edits</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

interface BlogAdminProps extends RouteComponentProps { };

interface ParamsProps {
    blogid: string
};

export default withRouter (BlogAdmin);