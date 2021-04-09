import * as React from 'react';
import { useParams } from 'react-router-dom';

const ReviewAdmin: React.FC<ReviewAdminProps> = props => {
    
    const { logid } = useParams<ParamsProps>();

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">ReviewAdmin View</h1>
                </div>
            </section>
        </main>
    );
};

interface ParamsProps {
    logid: string
};

interface ReviewAdminProps {}

export default ReviewAdmin;