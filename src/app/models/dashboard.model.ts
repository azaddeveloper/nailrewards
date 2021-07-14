export class Dashboard{
    customers_chart_data:CustomersChart;
    recent_customers:RecentCustomers;
    total_customer:any;
    total_news:any;
    total_rewards:any;
    total_visitor:any;
    total_transaction:any;
    visitor_chart_data:VisitorChart;
    transaction_chart_data:TransactionChart;
}

class CustomersChart{
    x:any;
    y:any;
}
class VisitorChart{
    x:any;
    y:any;
}
class TransactionChart{
    x:any;
    y:any;
}
export class RecentCustomers{
    customer_id:any;
    store_id:any;
    first_name:any;
    last_name:any;
    email:any;
    gender:any;
    dob:any;
    selected_store:any;
    profile_image:any;
    contact_number:any;
    created_at:any;
}