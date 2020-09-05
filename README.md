# TMDb

The Movie Database (TMDb) API wrapper for Node.js

# Documentation

## Examples

###  Creating a wrapper instance

```js
import { V3 } from 'TMDb';

const wrapper = new V3({ api_key: '...' }, { results_per_page: 10 });
```

### Getting details for a movie

```js
const details = await wrapper.getMovie(123456).getDetails();
```

```js
const movie = await wrapper.getMovie({ query: 'the lighthouse' });

const details = await movie.getDetails();
```

```js
const { details, images, videos } = await movie.getDetails({ append_to_response: 'images,videos' }); 
```
