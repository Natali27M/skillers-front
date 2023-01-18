import React from 'react';
import {Outlet} from 'react-router-dom';

import {CommunityHeader} from '../../components';

const CommunityPage = () => {
    return (
        <div>
            <CommunityHeader/>
            <Outlet/>
        </div>
    );
};

export {CommunityPage};
