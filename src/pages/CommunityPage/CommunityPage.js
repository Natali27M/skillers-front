import React from 'react';
import {Outlet} from 'react-router-dom';

import css from './CommunityPage.module.css';
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
