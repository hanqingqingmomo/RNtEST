// @flow

function normalize(str: string) {
  if (str.startsWith('file://')) {
    // make sure file protocol has max three slashes
    str = str.replace(/(\/{0,3})\/*/g, '$1');
  } else {
    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');

    // remove consecutive slashes
    str = str.replace(/([^:\s\%\3\A])\/+/g, '$1/');
  }

  // remove trailing slash before parameters or hash
  str = str.replace(/\/(\?|&|#[^!])/g, '$1');

  // replace ? in parameters with &
  str = str.replace(/(\?.+)\?/g, '$1&');

  return str;
}

export function build({
  base = '',
  path,
  query = {},
}: {
  base: string,
  path: string,
  query: Object,
}) {
  const q = Object.keys(query)
    .filter(param => query[param] !== null && query[param] !== undefined)
    .map(param => `${param}=${query[param]}`)
    .join('&');

  const url = normalize(`${base}/${path}${q !== '' ? `?${q}` : ''}`);

  console.log(url);
  return url;
}
