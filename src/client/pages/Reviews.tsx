import * as React from 'react';
import { useParams } from 'react-router-dom';

const Reviews: React.FC<ReviewsProps> = props => {

    const userid = useParams<ParamsProps>();

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">Reviews View</h1>
                </div>
            </section>
        </main>
    );
}

interface ReviewsProps {}

interface ParamsProps {
    userid: string;
}

export default Reviews;