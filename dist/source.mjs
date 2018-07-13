class Component {
  constructor() {
    this.html = () => {};

    this.style = () => {};

    this.data = () => {
      return {};
    };

    this.scripts = () => {};

    this.tags = () => {};
  }

  render() {
    return this.html();
  }

}

class StaticComponent {}

StaticComponent.render = () => {
  return {
    html: StaticComponent.html(),
    css: StaticComponent.style(),
    tags: StaticComponent.tags()
  };
};

StaticComponent.html = () => 'hello world';

StaticComponent.style = () => 'style';

StaticComponent.tags = () => {
  return {};
};

function ScriptTag({ src = false, url = false, async = true, defer = true, type }) {
  if (!url && !src) return '';

  if (url) url = `src="${url}"`;

  return `<script ${async ? 'async ' : ''} ${defer ? 'defer ' : ''} ${url || ''} >${src || ''}</script>`;
}

function StyleTag({ src = false, url = false }) {
  if (!url && !src) return '';

  if (url) url = `src="${url}"`;

  return `<style ${url || ''} >${src || ''}</style>`;
}

function Head(tags = []) {
  return {
    // language=HTML
    html: `
        <head>
            
            ${unwrapTags(tags)}
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
        </head>
    `
  };
}

function unwrapTags(tags) {
  return tags.map(tag => {
    switch (tag.type) {
      case 'title':
        return `<title> ${tag.title} </title>`;
      case 'meta':
        return `<meta />`;
      case 'style':
        return StyleTag(tag);
      case 'script':
        return ScriptTag(tag);
      default:
        return `<unknoknTag${tag.type}/>`;
    }
  }).join(' /n');
}

class Router {}

const renderToString = (layout, params, { HeadFactory, FootFactory = null } = { HeadFactory: Head, FootFactory: null }) => {
  const [headTags, footerTags, HTMLParams] = buildTags(layout, params);

  const head = HeadFactory(headTags);

  const foot = FootFactory ? FootFactory(footerTags) : footerTags.join(' ');

  HTMLParams.head = head;

  HTMLParams.foot = foot;

  return layout.html(HTMLParams);
};

const buildTags = (layout, params) => {};

buildTags.referencePrototype = {
  html: '',
  style: '',
  exports: ''
};

export { Component, StaticComponent, Head, unwrapTags, Router, ScriptTag, StyleTag, renderToString };
