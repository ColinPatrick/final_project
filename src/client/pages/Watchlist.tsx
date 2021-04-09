import * as React from 'react';
import { useParams } from 'react-router-dom';

const Watchlist: React.FC<WatchlistProps> = props => {
    
    const { userid } = useParams<ParamsProps>();

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">Watchlist View</h1>
                </div>
            </section>
        </main>
    );
}

interface ParamsProps {
    userid: string
}

interface WatchlistProps {}

export default Watchlist;