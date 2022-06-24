import { useQuery } from '@apollo/client';
import { QUERY_ME } from "../utils/queries";

import icon1 from '../assets/DashboardIcon-1.svg'

const UserDashboard = () => {

    const { loading, data } = useQuery(QUERY_ME)
    const userData = data?.me || {}

    return (            
        <div class="dashboard">
            <h2>{userData.username}'s Dashboard</h2>

            <div class="dashboard-top">
                <div class="small-card">
                    <div class="icon left">
                        <img className="dashboard-icon" src={icon1} alt="avatar" />
                    </div>

                    <div class="right">
                        <h3>2300</h3>
                        <p>Total Points</p>
                    </div>
                </div>


                <div class="small-card">
                    <div class="icon left">
                        <img className="dashboard-icon" src={icon1} alt="avatar" />
                    </div>

                    <div class="right">
                        <h3>2</h3>
                        <p>Causes Posted</p>
                    </div>
                </div>


                <div class="small-card">
                    <div class="icon left">
                        <img className="dashboard-icon" src={icon1} alt="avatar" />
                    </div>

                    <div class="right">
                        <h3>Buy Points</h3>
                    </div>
                </div>

            </div>

            <button class="create-btn">Create a cause</button>

            <h3>Your causes</h3>
            <div class="card">
                <div class="card-top">
                <button class="create-btn edit">Edit</button>
                    <h3>Sample cause</h3>
                    <p class="date">June 16, 2022</p>
                    <p>Sample cause body</p>
                </div>
                <div class="card-bottom">
                    <button class="category-btn disaster-relief">category</button>
                </div>
            </div>
        </div>      
    )
}

export default UserDashboard;

// what is the difference between this and User Dashboard?

// all causes associated with user
// ability to edit cause
// point totals
// username
// button for shop function/component