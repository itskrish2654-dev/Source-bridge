# Source Bridge website

Source Bridge is a static HTML, CSS, and JavaScript website. The complete production site is in [`dist/`](dist/); it does not need a package install or a framework build.

## Cloudflare Pages Git deployment

Connect this repository to Cloudflare Pages using these settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root |
| Build command | `exit 0` |
| Build output directory | `dist` |

The `dist/` directory includes `index.html`, local images and fonts, CSS, JavaScript, `robots.txt`, and `sitemap.xml`. Keep the build output directory set to `dist` so `index.html` is served from the site root.

Photo credits are in [IMAGE_CREDITS.md](IMAGE_CREDITS.md). Font license texts are in `dist/assets/fonts/`.
