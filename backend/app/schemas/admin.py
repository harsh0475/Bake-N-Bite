from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    total_products: int
    total_categories: int
    total_orders: int

    pending_orders: int
    completed_orders: int

    total_revenue: float