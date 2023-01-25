import React from 'react';

import {MoreComment} from '../../ForCommunityPage';

const CommentDetails = ({comments}) => {
    return (
        <div>
            { comments.map(value => <MoreComment key={value.id} comment={value}/>)}
        </div>
    );
};

export {CommentDetails};
