// Toggle responsive navigation menu
function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('active');
}

// Web Component cho Header dùng chung
class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div class="container nav-wrapper">
                <div class="logo">
                    🛡️ FoodSafety Risk Analyzer
                </div>
                <button class="menu-btn" onclick="toggleMenu()">
                    ☰
                </button>
                <ul class="nav-links" id="nav-links">
                    <li><a href="./index.html">Trang chủ</a></li>
                    <li><a href="./index.html#tinh-nang">Tính năng</a></li>
                    <li><a href="./Phantich.html">Công cụ phân tích</a></li>
                    <li><a href="./index.html#quy-trinh">Quy trình</a></li>
                    <li><a href="./Blog.html">Blog dinh dưỡng</a></li>
                    <li><a href="./index.html#faq">FAQ</a></li>
                </ul>
            </div>
        </header>
        `;
    }
}
customElements.define('app-header', AppHeader);

// Web Component cho Footer dùng chung
class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="container">
                <p>🛡️ FoodSafety Risk Analyzer - Hệ thống phân tích & cảnh báo an toàn thực phẩm chuẩn hóa</p>
                <div class="footer-links">
                    <a href="#">Giới thiệu</a>
                    <a href="#">Điều khoản sử dụng</a>
                    <a href="#">Chính sách bảo mật</a>
                    <a href="#">Liên hệ hỗ trợ</a>
                </div>
                <p>&copy; 2026 FoodSafety. Tất cả quyền được bảo hộ.</p>
            </div>
        </footer>
        `;
    }
}
customElements.define('app-footer', AppFooter);

