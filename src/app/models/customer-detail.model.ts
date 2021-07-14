import { StoreReward } from './store-reward.model';

export class CustomerDetail{
    contact_number:any;
    created_at:any;
    customer_id:any;
    customer_rating:StoreRatingDetails;
    dob:any;
    earned_points:any;
    active_rewards:Array<StoreReward>;
    email:any;
    first_name:any="";
    gender:any;
    last_name:any;
    profile_image:any;
    rewards_count:any;
    selected_store:any;
    store_id:any;
    total_transaction_amount:any;
    total_visit:any;
    transaction_history:Array<TransactionHistory>;
    customer_transaction_chart:ChartData
}
class ChartData{
    x:any;
    y:any;
}
export class TransactionHistory{
    amount:any;
    customer_id:any;
    store_id:any;
    transaction_date:any;
    transaction_id:any;
    transaction_remark:any;
    transaction_type:any;
    type_id:any;
    type_remark:any;
}
export class StoreRatingDetails{
    created_at:any;
    customer_id:any;
    feedback:any;
    id:any;
    image:any;
    last_update:any;
    rating:any;
    store_id:any;
}