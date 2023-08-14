import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '2wglf01p',
  dataset: 'production',
  apiVersion: '2023-07-29',
  useCdn: true,
  token:'skDh2UjYDPdu2pttkCEWL42syRFLYtwkJUAOcS7pT84TqA3O7zdwlEIbjTXjIim7nO23077ZQpDO9gtyeS4iwgK3hD40FKJfUSNI6UWjsLg9lPKTPRl0LnLg1DuNcANljdnzLYy75oC84b8pgVw2jri9uElc33OJOIB1anzPoVJPmw5mfozl',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);