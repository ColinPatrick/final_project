import * as React from 'react';
import { useParams } from 'react-router-dom';

const BlogAdmin: React.FC<BlogAdminProps> = props => {

    const { blogid } = useParams<ParamsProps>();

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">BlogAdmin View</h1>
                </div>
            </section>
        </main>
    );
}

interface BlogAdminProps {}

interface ParamsProps {
    blogid: string
}

export default BlogAdmin;