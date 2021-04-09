import * as React from 'react';
import { Link } from 'react-router-dom'


const ReviewPreview: React.FC<ReviewPreviewProps> = ({ mostRecentReview }) => {
    //const [mostRecentReview, setmostRecentReview] = React.useState('')

    // React.useEffect(() => {

    //     let getPreview = () => {
    //         let firstHundred: string
    //         let content = review?.content
    //         firstHundred = content.substr(0, 100)
    //         setmostRecentReview(`${firstHundred}...`)
    //     }

    //     getPreview()
    // }, []
    // )
    return (
        <div className="row-12 mt-3">
                <h6>Most recent review</h6>
            <div className="col-lg">
                <article className="card my-2 shadow">
                    <div className="card-body">
                        <h1 className="card-title">{mostRecentReview.title}</h1>
                        <p>{ mostRecentReview.content }</p>
                        <Link to="/Reviews" className='btn btn-outline-primary'>Go To Reviews</Link>
                    </div>
                </article>
            </div>
        </div>
    )
}

interface ReviewPreviewProps {
    title?: string,
    mostRecentReview: any;
}

export default ReviewPreview;