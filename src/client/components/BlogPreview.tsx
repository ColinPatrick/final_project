import * as React from 'react';

const BlogPreview: React.FC<BlogPreviewProps> = (props) => {
    return (
                <div className="col-12">
                    <h1 className="display-1 text-center">
                        BlogPreview View
                    </h1>
                </div>
    )
}

interface BlogPreviewProps {}

export default BlogPreview;