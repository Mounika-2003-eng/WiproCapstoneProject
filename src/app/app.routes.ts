import { Routes } from '@angular/router';
import { UserDashboard } from './Components/user-dashboard/user-dashboard';
import { Register } from './Components/register/register';
import { Login } from './Components/login/login';
import { AdminDashboard } from './Components/admin-dashboard/admin-dashboard';
import { Productlist } from './Components/productlist/productlist';
import { CartList } from './Components/cart-list/cart-list';
import { AddToCart } from './Components/add-to-cart/add-to-cart';
import { WishlistComponent } from './Components/wishlist-component/wishlist-component';
import { MyOrders } from './Components/my-orders/my-orders';
import { MyCoupons } from './Components/my-coupons/my-coupons';
import { ProductManagement } from './Components/product-management/product-management';
import { SalesReportComponent } from './Components/sales-report-component/sales-report-component';
import { BulkUploadComponent } from './Components/bulk-upload-component/bulk-upload-component';
import { CouponManagement } from './Components/coupon-management/coupon-management';
import { StockManagement } from './Components/stock-management/stock-management';
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'user_dashboard',
    component: UserDashboard,
    children: [
      { path: 'products', component: Productlist },
      { path: 'cart', component: CartList },
      { path: 'add-to-cart/:productId', component: AddToCart },
      { path: 'wishlist', component: WishlistComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'my-orders', component: MyOrders },
      { path: 'my-coupons', component: MyCoupons }
      
    ]
  },
  {
    path: 'admin_dashboard',
    component: AdminDashboard,
    children: [
      { path: '', redirectTo: 'product-management', pathMatch: 'full' },
      {path: 'product-management', component: ProductManagement},
      {path: 'sales-report', component: SalesReportComponent},
      {path: 'bulk-upload', component: BulkUploadComponent},
      {path: 'coupon-management', component: CouponManagement},
      {path: 'stock-management', component: StockManagement}
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
