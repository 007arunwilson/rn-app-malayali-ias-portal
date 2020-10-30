import _ from 'lodash';

const parseApiResponse = (response, options) => {
  let data;

  if (response.data && response.data.data && options && options.returnArray) {
    if (!response.data.data.length) {
      data = [];
    } else if (Array.isArray(response.data.data)) {
      data = response.data.data;
    } else {
      data = [response.data.data];
    }
  } else if (
    response.data &&
    response.data.data &&
    response.data.data.length &&
    response.data.data.length === 1
  ) {
    [data] = response.data.data;
  } else if (
    response.data &&
    response.data.data &&
    response.data.data.length &&
    response.data.data.length
  ) {
    data = response.data.data;
  }

  const error =
    response.status !== 200 &&
    response.data &&
    response.data.data &&
    (response.data.data.length > 1
      ? response.data.status_text
      : response.data.status_text[0]);
  const { status } = response;
  return {
    data,
    error,
    status,
  };
};

const truncate = (text, { limit, offset, byWord, elipses = true }) => {
  let truncatedText;
  if (byWord) {
    const textSplitted = text.split(' ');
    if (textSplitted.length > (offset || limit)) {
      truncatedText = `${textSplitted.slice(0, limit).join(' ')}${
        elipses && ' ...'
      }`;
    } else {
      truncatedText = text;
    }
  } else {
    truncatedText = _.truncate(text.replace(/<(?:.|\n)*?>/gm, ''), {
      length: limit,
    });
  }
  return truncatedText;
};

export { parseApiResponse, truncate };
