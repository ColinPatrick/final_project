import * as React from 'react';
import { useParams } from 'react-router-dom';

const SingleBlog: React.FC<SingleBlogProps> = props => {

    const { blogid } = useParams<ParamsProps>();

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">SingleBlog View</h1>
                </div>
            </section>
        </main>
    );
}

interface SingleBlogProps {}

interface ParamsProps {
    blogid: string
}

export default SingleBlog;