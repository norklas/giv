import CommentList from "../components/CommentList";
import { useParams } from 'react-router-dom';
import { QUERY_CAUSE } from "../utils/queries";
import { useQuery } from '@apollo/client';

const SingleCause = () => {
    const { causeId: causeParam } = useParams();
    console.log("causeId: " + causeParam)
    const { loading, data } = useQuery(QUERY_CAUSE, {
        variables: { _id: causeParam }
    });
    const causeData = data?.cause || {};
    console.log(causeData);

    return (
        <div class="single-cause">
        <div class="card">
            <div class="single-card-top">
                <button class="category-btn category-btn-single-cause disaster-relief">Disaster Relief</button>
            </div>
            <div class="single-card-bottom">
                <h3>Support Example Charity</h3>
                <p class="date">June 16, 2022</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum eu dui id finibus. Nulla fringilla quis tellus et ultricies. Quisque aliquam lacinia mi in tincidunt. Sed vitae tincidunt sapien, non accumsan augue. Aenean id scelerisque risus. Ut interdum imperdiet nulla at laoreet. Maecenas eu lectus quam. Aenean tincidunt sodales ante vitae varius. Duis sagittis lorem quis ex posuere aliquet. Sed nisi mauris, placerat ac suscipit id, laoreet vitae sem. Nullam non diam ultricies, dictum purus eget, egestas leo.</p>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ut elit eu nibh aliquam imperdiet. Aenean semper aliquet sem, sit amet finibus ligula blandit quis. Duis vel risus sodales, condimentum lorem eu, efficitur ante. Morbi feugiat tristique eros, eget convallis augue mattis sed. Sed ultrices libero vitae lacus tincidunt, at fermentum ipsum viverra. Aliquam pharetra eget velit ac tristique. Cras sed lorem nulla. Praesent nec sollicitudin dui. Vivamus feugiat eu justo eget pellentesque. Sed a dolor vitae leo porttitor tincidunt eget eu justo. Donec vehicula consectetur nunc nec lacinia. Ut a urna ut nulla posuere tempus eget eget massa. Vestibulum ullamcorper felis sit amet lacus pellentesque pellentesque. Curabitur sit amet neque vitae libero pharetra fringilla id ut tortor. Nam ac libero tellus.</p>
                <div class="author">Erica Trenholm</div>
                <button class="web-btn">Visit website</button>
            </div>
        </div>

        <div class="card">
            <div class="comment-card-top">
                <h3>5 Comments</h3>
            </div>
            <div class="comment-card-bottom">
                <CommentList />
            </div>
        </div>
    </div>
    )
}

export default SingleCause;