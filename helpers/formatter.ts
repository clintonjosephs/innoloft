export const stripTags = (input: string) => {
  const regex = /<[^>]*>/g;
  return input.replace(regex, '');
};

export const convertToEmbedURL = (url: string) => {
  const embedURLRegex = /https:\/\/www\.youtube\.com\/embed\/([\w-]+)/;
  const isEmbedURL = embedURLRegex.test(url);

  if (isEmbedURL) {
    return url; // Return the embed URL as it is
  } else {
    const videoID = url.split('v=')[1];
    const embedURL = `https://www.youtube.com/embed/${videoID}`;
    return embedURL;
  }
};

export const getNamesAsString = (array: any) =>
array.map((item: any) => item.name).join(', ');
