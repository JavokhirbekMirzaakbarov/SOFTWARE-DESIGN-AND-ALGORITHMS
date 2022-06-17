// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Software Designs and Algorithms",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "epam", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  plugins: [require.resolve("docusaurus-lunr-search")],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: undefined,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Software Designs and Algorithms",
        logo: {
          alt: "Software Designs and Algorithms",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "https://git.epam.com/viktor_soroka/software-designs-and-algorithms",
            label: "Gitlab",
            position: "right",
          },
          {
            type: "doc",
            docId: "contents",
            label: "Start learning",
            position: "left",
          },
          {
            to: "docs/Introduction/help",
            label: "Help",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Software Designs and Algorithms, Built with Docusaurus.`,
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Start learning",
                to: "/docs/contents",
              },
              {
                to: "docs/Introduction/help",
                label: "Help",
              },
            ],
          },
          {
            title: "Sources",
            items: [
              {
                href: "https://git.epam.com/viktor_soroka/software-designs-and-algorithms",
                label: "Gitlab",
              },
            ],
          }
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
