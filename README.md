# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Search

Search is supported by [docusaurus-lunr-search](https://github.com/lelouch77/docusaurus-lunr-search). Search is only available after the `npm run build` command is run and then the build folder is served by using `npm run serve` command.
