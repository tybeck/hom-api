import {Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookService {
  constructor() {
    //
  }

  async getPublishedPosts() {

  }

  async getReviews() {
    const fbRatingEndpoint = [process.env.FB_GRAPH_URL, process.env.FB_GRAPH_URL_RATING].join('/');
    const reviews = await axios.get(fbRatingEndpoint);
  }
}
