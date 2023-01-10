import React from 'react';

const MyMeta = (settingsMeta) => {
    const {title, description, url} = settingsMeta;
    console.log(settingsMeta,'1');
    return (
        <div>
            <meta charSet="utf-8"/>
            <meta name="description" content={description}/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="skilliant.net"/>
        </div>
    );
};

export {MyMeta};
