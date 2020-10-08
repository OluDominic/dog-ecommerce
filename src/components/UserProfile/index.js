import React from 'react'
import './index.scss'

const UserProfile = props => {
    const { currentUser } = props;
    const { displayName } = currentUser;

    return (
        <div className="userProfile">
            <ul>
                <li>
                    <div className="img">
                        Picture here
                    </div>
                </li>
                <li>
                    <span className="name">
                        {displayName && displayName}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default UserProfile