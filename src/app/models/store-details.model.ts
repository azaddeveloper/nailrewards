import { StoreSetting } from './store-setting.model';
import { StoreHour } from './store-hour.model';

export class StoreDetails {
    address: any;
    city: any;
    facebook_link: any;
    instagram_link: any;
    land_mark: any;
    latitude: any;
    longitude: any;
    operation_hours: Array<StoreHour>;
    phone_number: any;
    email: any;
    state: any;
    store_code: any;
    store_id: any;
    store_logo: any;
    store_name: any;
    store_owner: any;
    twitter_link: any;
    google_link: any;
    schedule_appointment: any;
    zip_code: any;
    storeSettings: StoreSetting;
    app_menu:AppMenu;
}

export class AppMenu{
    news_promotion:any;
    reward_count:any;
    schedule_appointment:any;
    service_rating:any;
    social_media:any;
    spa_menu:any;
}

