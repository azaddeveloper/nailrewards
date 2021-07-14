import { StoreRatingDetails } from "./customer-detail.model";

export class AvgRating {
  ratings_counts: Array<any>;
  total_review: any;
  avg_rating: any;
}

export class RecentRating {
  recent_rating: Array<StoreRatingDetails>;
  image_url: any;
}

class RatingData {
  created_at: any;
  customer_id: any;
  feedback: any;
  first_name: any;
  id: any;
  image: any;
  last_name: any;
  last_update: any;
  rating: any;
  store_id: any;
}
