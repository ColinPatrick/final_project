import * as React from 'react';
import { useEffect, useState } from 'react';

const Watchlist: React.FC<WatchlistProps> = props => {
    const [lists, setLists] = useState ([]); // 

    React.useEffect(()=>{
        fetch(`/api/watchlist/6`)//
        .then(res => res.json())//
        .then(allLists => setLists(allLists))// set to state with setList instead of console.log
        
    }, []);
    return (
        <main className="container">
            <section className="row">
                {lists.map(list => (//
                    <div className="col-md-6" key={list.id}>
                        <div className="card shadow my-2">
                            <div className="card-body">
                                <h4 className="card-title">{list.listname}</h4>

                            </div>
                        </div>
                    </div>//
                ))}
                <div className="col-12">
                    <h1 className="display-1 text-center">Watchlist View</h1>
                </div>
            </section>
        </main>
    );
}

interface WatchlistProps {}

export default Watchlist;

