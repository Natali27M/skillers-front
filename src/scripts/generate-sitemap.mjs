import {writeFileSync} from 'fs';
import {globby} from 'globby';
import prettier from 'prettier';
import reactRouterToArray from 'react-router-to-array';


async function generate() {
    const prettierConfig = await prettier.resolveConfig('./.prettier.js');
    const pages = await globby([
        './App.js/Routes'
        // 'data/**/*.mdx',
        // '!data/*.mdx',
        // '!pages/_*.js',
        // '!pages/api',
        // '!pages/404.js'
    ]);

    // console.log(array);
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
        .map((page) => {
            const path = page
                .replace('pages', '')
                .replace('data', '')
                .replace('.js', '')
                .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return `
              <url>
                  <loc>${`http://localhost:3003/${route}`}</loc>
              </url>
            `;
        })
        .join('')}
    </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    // eslint-disable-next-line no-sync
    writeFileSync('public/sitemap.xml', formatted);
}

generate();
