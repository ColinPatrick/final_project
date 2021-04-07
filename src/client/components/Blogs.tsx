import * as React from 'react';

const Blogs: React.FC<BlogsProps> = props => {
    React.useEffect(()=>{
        fetch(`/api/blogs/6`)
    }, [])
    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">Blogs View</h1>
                </div>
            </section>
        </main>
    );
}

interface BlogsProps {}

export default Blogs;