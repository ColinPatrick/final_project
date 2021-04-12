import * as React from 'react';

const Home: React.FC<HomeProps> = props => {

    return (
        <main className="container d-flex justify-content-center newClassNameTest mb-2">
            <section className="row d-flex justify-content-center flex-wrap my-2">
                <div className="col-md-12 d-flex justify-content-center my-2">
                    <h1 className="text-white my-2">ReactCinema</h1>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-1 mb-3">
                    <h4 className="text-white my-1">A social site for film lovers</h4>
                </div>
                <div className="col-md-12 d-flex justify-content-center my-3">
                    <img className="rounded" src="https://www.publicdomainpictures.net/pictures/300000/velka/cinema-movie.jpg" alt="homeImg" style={{height: 350, width: 850}} />
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4 mb-0">
                    <p className="text-white mb-0 mt-2">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <img className="rounded" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="TMDDpic" style={{height: 150, width: 600}} />
                </div>
            </section>
        </main>
    );
};

interface HomeProps {};

export default Home;