import * as React from 'react';
import { json, User } from '../utils/api';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const ComposeBlog: React.FC<ComposeBlogProps> = props => {

    const [blogTitle, setBlogTitle] = React.useState<string>('');
    const [blogContent, setBlogContent] = React.useState<string>('');

    React.useEffect(() => {
        if (User.userid == null) {
            props.history.push('/login');
        };
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;

        let newBlogObject: { userid: number, title: string, content: string } = {
            userid: User.userid,
            title: blogTitle,
            content: blogContent
        };

        let res = await json('/api/blog', 'POST', newBlogObject);
        if (res) {
            alert('You just posted a blog!');
            props.history.push(`/blog/${res.id}`);
        };
    };

    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h5 className="text-dark">Write a blog!</h5>
                    </div>
                    <div className="card col-md-7 border shadow rounded mt-2 mb-4">
                        <div className="form-group p-3">
                            <label htmlFor="title" className="m-2">Your Blog Title:</label>
                            <input
                                value={blogTitle}
                                onChange={e => setBlogTitle(e.target.value)}
                                type="text"
                                className="form-control form-control-lg my-2"
                                placeholder="Blog Title"
                            />
                            <label htmlFor="content" className="m-2">Your Blog Content:</label>
                            <textarea
                                defaultValue={blogContent}
                                onChange={e => setBlogContent(e.target.value)}
                                rows={20}
                                className="form-control form-control-log my-2"
                                placeholder="Write your blog here..."
                            />
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-primary" onClick={ handleSubmit }>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

interface ComposeBlogProps extends RouteComponentProps { };

export default withRouter (ComposeBlog);