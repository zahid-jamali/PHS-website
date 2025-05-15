import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enResources = {
  translation: {
    // Navigation
    "Home": "Home",
    "Products": "Products",
    "About": "About",
    "Contact": "Contact",
    "Research": "Research",
    "Blog": "Blog",
    "Account": "Account",
    "Sign In": "Sign In",
    "Register": "Register",
    "Create Account": "Create Account",
    "My Account": "My Account",
    "Logout": "Logout",
    "Cart": "Cart",
    
    // Homepage
    "Discover the Power of Pink Himalayan Salt": "Discover the Power of Pink Himalayan Salt",
    "Premium Quality Direct from Khewra Salt Mine": "Premium Quality Direct from Khewra Salt Mine",
    "Shop Now": "Shop Now",
    "Learn More": "Learn More",
    "Why Choose Our Salt": "Why Choose Our Salt",
    "Featured Products": "Featured Products",
    "Add to Cart": "Add to Cart",
    "View Details": "View Details",
    
    // Product categories
    "Salt Lamps": "Salt Lamps",
    "Cooking Salt": "Cooking Salt",
    "Bath & Spa": "Bath & Spa",
    "Animal Licks": "Animal Licks",
    "Salt Bricks & Tiles": "Salt Bricks & Tiles",
    
    // Product details
    "Availability": "Availability",
    "In Stock": "In Stock",
    "Out of Stock": "Out of Stock",
    "Quantity": "Quantity",
    "Description": "Description",
    "Benefits": "Benefits",
    "Specifications": "Specifications",
    "Related Products": "Related Products",
    "Reviews": "Reviews",
    
    // About page
    "Our Story": "Our Story",
    "The Salt Mine": "The Salt Mine",
    "Our Process": "Our Process",
    "Quality Assurance": "Quality Assurance",
    "About Dr. Abdul PHS": "About Dr. Abdul PHS",
    
    // Contact page
    "Get in Touch": "Get in Touch",
    "Send Message": "Send Message",
    "Name": "Name",
    "Email": "Email",
    "Phone": "Phone",
    "Message": "Message",
    "Subject": "Subject",
    "Address": "Address",
    "Your message has been sent!": "Your message has been sent!",
    
    // Account
    "Order History": "Order History",
    "Order Tracking": "Order Tracking",
    "Profile": "Profile",
    "Addresses": "Addresses",
    "Payment Methods": "Payment Methods",
    "Notifications": "Notifications",
    "Shipping Details": "Shipping Details",
    "Tracking Number": "Tracking Number",
    "Order Summary": "Order Summary",
    "Subtotal": "Subtotal",
    "Shipping": "Shipping",
    "Free": "Free",
    "Total": "Total",
    "Order #": "Order #",
    "Delivered": "Delivered",
    "Shipped": "Shipped",
    "Processing": "Processing",
    "Tracking": "Tracking",
    "Track Order": "Track Order",
    "Order Date": "Order Date",
    "Account Information": "Account Information",
    "Personal Information": "Personal Information",
    "Update your account details and contact information": "Update your account details and contact information",
    "First Name": "First Name",
    "Last Name": "Last Name",
    "Email Address": "Email Address",
    "Phone Number": "Phone Number",
    "Save Changes": "Save Changes",
    "Change Password": "Change Password",
    "Update your password to maintain account security": "Update your password to maintain account security",
    "Current Password": "Current Password",
    "New Password": "New Password",
    "Confirm New Password": "Confirm New Password",
    "Update Password": "Update Password",
    "Shipping Addresses": "Shipping Addresses",
    "Default": "Default",
    "Edit": "Edit",
    "Set as Default": "Set as Default",
    "Add New Address": "Add New Address",
    
    // Authentication
    "Sign In to Your Account": "Sign In to Your Account",
    "Enter your credentials to access your account": "Enter your credentials to access your account",
    "Password": "Password",
    "Forgot Password?": "Forgot Password?",
    "Don't have an account?": "Don't have an account?",
    "Create a New Account": "Create a New Account",
    "Enter your details to create a new account": "Enter your details to create a new account",
    "Confirm Password": "Confirm Password",
    "I agree to the": "I agree to the",
    "Terms of Service": "Terms of Service",
    "and": "and",
    "Privacy Policy": "Privacy Policy",
    "Already have an account?": "Already have an account?",
    "Signing In...": "Signing In...",
    "Creating Account...": "Creating Account...",
    
    // Chat
    "Customer Support": "Customer Support",
    "Enter your name": "Enter your name",
    "Join": "Join",
    "Type a message...": "Type a message...",
    "Connecting...": "Connecting...",
    
    // Wholesale
    "Wholesale Inquiries": "Wholesale Inquiries",
    "Become a Distributor": "Become a Distributor",
    "Company Name": "Company Name",
    "Business Type": "Business Type",
    "Estimated Monthly Volume": "Estimated Monthly Volume",
    "Interested Products": "Interested Products",
    "Submit Inquiry": "Submit Inquiry",
    
    // Footer
    "Subscribe to newsletter": "Subscribe to our newsletter",
    "Get updates on new products": "Get updates on new products and special offers",
    "Subscribe": "Subscribe",
    "Quick Links": "Quick Links",
    "Customer Service": "Customer Service",
    "Shipping and Returns": "Shipping & Returns",
    "FAQ": "FAQ",
    "Terms and Conditions": "Terms & Conditions",
    "Privacy Policy": "Privacy Policy",
    "Connect With Us": "Connect With Us",
    "All rights reserved": "All rights reserved",
    
    // Misc
    "Search": "Search",
    "Search for products": "Search for products",
    "Read More": "Read More",
    "Back": "Back",
    "Next": "Next",
    "Previous": "Previous",
    "Loading...": "Loading...",
    "No results found": "No results found",
    "Share": "Share",
    "Print": "Print",
    "Download": "Download",
  }
};

// Arabic translations
const arResources = {
  translation: {
    // Navigation
    "Home": "الرئيسية",
    "Products": "المنتجات",
    "About": "عن الشركة",
    "Contact": "اتصل بنا",
    "Research": "الأبحاث",
    "Blog": "المدونة",
    "Account": "الحساب",
    "Sign In": "تسجيل الدخول",
    "Register": "تسجيل",
    "Create Account": "إنشاء حساب",
    "My Account": "حسابي",
    "Logout": "تسجيل الخروج",
    "Cart": "سلة التسوق",
    
    // Homepage
    "Discover the Power of Pink Himalayan Salt": "اكتشف قوة ملح الهيمالايا الوردي",
    "Premium Quality Direct from Khewra Salt Mine": "جودة ممتازة مباشرة من منجم ملح خيورا",
    "Shop Now": "تسوق الآن",
    "Learn More": "اعرف المزيد",
    "Why Choose Our Salt": "لماذا تختار ملحنا",
    "Featured Products": "منتجات مميزة",
    "Add to Cart": "أضف إلى السلة",
    "View Details": "عرض التفاصيل",
    
    // Product categories
    "Salt Lamps": "مصابيح الملح",
    "Cooking Salt": "ملح الطبخ",
    "Bath & Spa": "الحمام والسبا",
    "Animal Licks": "ملح الحيوانات",
    "Salt Bricks & Tiles": "قوالب وبلاط الملح",
    
    // Product details
    "Availability": "التوفر",
    "In Stock": "متوفر",
    "Out of Stock": "غير متوفر",
    "Quantity": "الكمية",
    "Description": "الوصف",
    "Benefits": "الفوائد",
    "Specifications": "المواصفات",
    "Related Products": "منتجات ذات صلة",
    "Reviews": "التقييمات",
    
    // About page
    "Our Story": "قصتنا",
    "The Salt Mine": "منجم الملح",
    "Our Process": "عمليتنا",
    "Quality Assurance": "ضمان الجودة",
    "About Dr. Abdul PHS": "عن دكتور عبدالله لملح الهيمالايا",
    
    // Contact page
    "Get in Touch": "تواصل معنا",
    "Send Message": "إرسال رسالة",
    "Name": "الاسم",
    "Email": "البريد الإلكتروني",
    "Phone": "الهاتف",
    "Message": "الرسالة",
    "Subject": "الموضوع",
    "Address": "العنوان",
    "Your message has been sent!": "تم إرسال رسالتك!",
    
    // Account
    "Order History": "سجل الطلبات",
    "Order Tracking": "تتبع الطلب",
    "Profile": "الملف الشخصي",
    "Addresses": "العناوين",
    "Payment Methods": "طرق الدفع",
    "Notifications": "الإشعارات",
    "Shipping Details": "تفاصيل الشحن",
    "Tracking Number": "رقم التتبع",
    "Order Summary": "ملخص الطلب",
    "Subtotal": "المجموع الفرعي",
    "Shipping": "الشحن",
    "Free": "مجاني",
    "Total": "الإجمالي",
    "Order #": "طلب رقم #",
    "Delivered": "تم التوصيل",
    "Shipped": "تم الشحن",
    "Processing": "قيد المعالجة",
    "Tracking": "التتبع",
    "Track Order": "تتبع الطلب",
    "Order Date": "تاريخ الطلب",
    "Account Information": "معلومات الحساب",
    "Personal Information": "المعلومات الشخصية",
    "Update your account details and contact information": "تحديث معلومات حسابك ومعلومات الاتصال",
    "First Name": "الاسم الأول",
    "Last Name": "اسم العائلة",
    "Email Address": "البريد الإلكتروني",
    "Phone Number": "رقم الهاتف",
    "Save Changes": "حفظ التغييرات",
    "Change Password": "تغيير كلمة المرور",
    "Update your password to maintain account security": "قم بتحديث كلمة المرور للحفاظ على أمان حسابك",
    "Current Password": "كلمة المرور الحالية",
    "New Password": "كلمة المرور الجديدة",
    "Confirm New Password": "تأكيد كلمة المرور الجديدة",
    "Update Password": "تحديث كلمة المرور",
    "Shipping Addresses": "عناوين الشحن",
    "Default": "افتراضي",
    "Edit": "تعديل",
    "Set as Default": "تعيين كافتراضي",
    "Add New Address": "إضافة عنوان جديد",
    
    // Authentication
    "Sign In to Your Account": "تسجيل الدخول إلى حسابك",
    "Enter your credentials to access your account": "أدخل بيانات الاعتماد للوصول إلى حسابك",
    "Password": "كلمة المرور",
    "Forgot Password?": "نسيت كلمة المرور؟",
    "Don't have an account?": "ليس لديك حساب؟",
    "Create a New Account": "إنشاء حساب جديد",
    "Enter your details to create a new account": "أدخل بياناتك لإنشاء حساب جديد",
    "Confirm Password": "تأكيد كلمة المرور",
    "I agree to the": "أوافق على",
    "Terms of Service": "شروط الخدمة",
    "and": "و",
    "Privacy Policy": "سياسة الخصوصية",
    "Already have an account?": "لديك حساب بالفعل؟",
    "Signing In...": "جاري تسجيل الدخول...",
    "Creating Account...": "جاري إنشاء الحساب...",
    
    // Chat
    "Customer Support": "دعم العملاء",
    "Enter your name": "أدخل اسمك",
    "Join": "انضمام",
    "Type a message...": "اكتب رسالة...",
    "Connecting...": "جاري الاتصال...",
    
    // Wholesale
    "Wholesale Inquiries": "استفسارات الجملة",
    "Become a Distributor": "كن موزعًا",
    "Company Name": "اسم الشركة",
    "Business Type": "نوع العمل",
    "Estimated Monthly Volume": "الحجم الشهري المقدر",
    "Interested Products": "المنتجات المهتم بها",
    "Submit Inquiry": "إرسال الاستفسار",
    
    // Footer
    "Subscribe to newsletter": "اشترك في نشرتنا الإخبارية",
    "Get updates on new products": "احصل على تحديثات حول المنتجات الجديدة والعروض الخاصة",
    "Subscribe": "اشترك",
    "Quick Links": "روابط سريعة",
    "Customer Service": "خدمة العملاء",
    "Shipping and Returns": "الشحن والإرجاع",
    "FAQ": "الأسئلة الشائعة",
    "Terms and Conditions": "الشروط والأحكام",
    "Privacy Policy": "سياسة الخصوصية",
    "Connect With Us": "تواصل معنا",
    "All rights reserved": "جميع الحقوق محفوظة",
    
    // Misc
    "Search": "بحث",
    "Search for products": "البحث عن منتجات",
    "Read More": "قراءة المزيد",
    "Back": "رجوع",
    "Next": "التالي",
    "Previous": "السابق",
    "Loading...": "جاري التحميل...",
    "No results found": "لم يتم العثور على نتائج",
    "Share": "مشاركة",
    "Print": "طباعة",
    "Download": "تنزيل",
  }
};

// Chinese translations
const zhResources = {
  translation: {
    // Navigation
    "Home": "首页",
    "Products": "产品",
    "About": "关于我们",
    "Contact": "联系我们",
    "Research": "研究",
    "Blog": "博客",
    "Account": "账户",
    "Sign In": "登录",
    "Register": "注册",
    "Create Account": "创建账户",
    "My Account": "我的账户",
    "Logout": "退出登录",
    "Cart": "购物车",
    
    // Homepage
    "Discover the Power of Pink Himalayan Salt": "探索喜马拉雅粉盐的力量",
    "Premium Quality Direct from Khewra Salt Mine": "直接来自凯拉盐矿的优质产品",
    "Shop Now": "立即购买",
    "Learn More": "了解更多",
    "Why Choose Our Salt": "为什么选择我们的盐",
    "Featured Products": "精选产品",
    "Add to Cart": "加入购物车",
    "View Details": "查看详情",
    
    // Product categories
    "Salt Lamps": "盐灯",
    "Cooking Salt": "烹饪盐",
    "Bath & Spa": "沐浴和水疗",
    "Animal Licks": "动物舔盐",
    "Salt Bricks & Tiles": "盐砖和瓷砖",
    
    // Product details
    "Availability": "库存状态",
    "In Stock": "有货",
    "Out of Stock": "缺货",
    "Quantity": "数量",
    "Description": "描述",
    "Benefits": "益处",
    "Specifications": "规格",
    "Related Products": "相关产品",
    "Reviews": "评论",
    
    // About page
    "Our Story": "我们的故事",
    "The Salt Mine": "盐矿",
    "Our Process": "我们的工艺",
    "Quality Assurance": "质量保证",
    "About Dr. Abdul PHS": "关于Abdul博士喜马拉雅粉盐",
    
    // Contact page
    "Get in Touch": "联系我们",
    "Send Message": "发送消息",
    "Name": "姓名",
    "Email": "电子邮件",
    "Phone": "电话",
    "Message": "消息",
    "Subject": "主题",
    "Address": "地址",
    "Your message has been sent!": "您的消息已发送！",
    
    // Account
    "Order History": "订单历史",
    "Order Tracking": "订单跟踪",
    "Profile": "个人资料",
    "Addresses": "地址",
    "Payment Methods": "支付方式",
    "Notifications": "通知",
    "Shipping Details": "配送详情",
    "Tracking Number": "跟踪号码",
    "Order Summary": "订单摘要",
    "Subtotal": "小计",
    "Shipping": "运费",
    "Free": "免费",
    "Total": "总计",
    "Order #": "订单 #",
    "Delivered": "已送达",
    "Shipped": "已发货",
    "Processing": "处理中",
    "Tracking": "跟踪",
    "Track Order": "跟踪订单",
    "Order Date": "订单日期",
    "Account Information": "账户信息",
    "Personal Information": "个人信息",
    "Update your account details and contact information": "更新您的账户详情和联系信息",
    "First Name": "名",
    "Last Name": "姓",
    "Email Address": "电子邮件地址",
    "Phone Number": "电话号码",
    "Save Changes": "保存更改",
    "Change Password": "更改密码",
    "Update your password to maintain account security": "更新密码以维护账户安全",
    "Current Password": "当前密码",
    "New Password": "新密码",
    "Confirm New Password": "确认新密码",
    "Update Password": "更新密码",
    "Shipping Addresses": "配送地址",
    "Default": "默认",
    "Edit": "编辑",
    "Set as Default": "设为默认",
    "Add New Address": "添加新地址",
    
    // Authentication
    "Sign In to Your Account": "登录您的账户",
    "Enter your credentials to access your account": "输入您的凭据以访问您的账户",
    "Password": "密码",
    "Forgot Password?": "忘记密码？",
    "Don't have an account?": "没有账户？",
    "Create a New Account": "创建新账户",
    "Enter your details to create a new account": "输入您的详细信息以创建新账户",
    "Confirm Password": "确认密码",
    "I agree to the": "我同意",
    "Terms of Service": "服务条款",
    "and": "和",
    "Privacy Policy": "隐私政策",
    "Already have an account?": "已有账户？",
    "Signing In...": "登录中...",
    "Creating Account...": "创建账户中...",
    
    // Chat
    "Customer Support": "客户支持",
    "Enter your name": "输入您的姓名",
    "Join": "加入",
    "Type a message...": "输入消息...",
    "Connecting...": "连接中...",
    
    // Wholesale
    "Wholesale Inquiries": "批发咨询",
    "Become a Distributor": "成为分销商",
    "Company Name": "公司名称",
    "Business Type": "业务类型",
    "Estimated Monthly Volume": "预计月销量",
    "Interested Products": "感兴趣的产品",
    "Submit Inquiry": "提交咨询",
    
    // Footer
    "Subscribe to newsletter": "订阅我们的通讯",
    "Get updates on new products": "获取新产品和特别优惠的更新",
    "Subscribe": "订阅",
    "Quick Links": "快速链接",
    "Customer Service": "客户服务",
    "Shipping and Returns": "配送和退货",
    "FAQ": "常见问题",
    "Terms and Conditions": "条款和条件",
    "Privacy Policy": "隐私政策",
    "Connect With Us": "与我们联系",
    "All rights reserved": "版权所有",
    
    // Misc
    "Search": "搜索",
    "Search for products": "搜索产品",
    "Read More": "阅读更多",
    "Back": "返回",
    "Next": "下一个",
    "Previous": "上一个",
    "Loading...": "加载中...",
    "No results found": "未找到结果",
    "Share": "分享",
    "Print": "打印",
    "Download": "下载",
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: enResources,
      ar: arResources,
      zh: zhResources
    },
    interpolation: {
      escapeValue: false, // React already escapes
    }
  });

export default i18n;