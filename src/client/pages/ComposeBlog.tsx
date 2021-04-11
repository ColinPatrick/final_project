import * as React from 'react';

const ComposeBlog: React.FC<ComposeBlogProps> = props => {

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">ComposeBlog View</h1>
                </div>
            </section>
        </main>
    );
}

interface ComposeBlogProps {}

export default ComposeBlog;