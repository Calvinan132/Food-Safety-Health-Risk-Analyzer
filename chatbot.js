const chatbotHTML =         /* CHATBOT CONTAINER */
        .chatbot-widget {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 9999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            touch-action: none;
        }

        /* TOGGLE BUTTON */
        .chat-toggle-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #06b6d4);
            color: #fff;
            border: none;
            font-size: 1.6rem;
            cursor: grab;
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
            user-select: none;
        }

        .chat-toggle-btn:active {
            cursor: grabbing;
        }

        .chat-toggle-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(6, 182, 212, 0.6);
        }

        /* CHAT WINDOW */
        .chat-window {
            display: none;
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 350px;
            height: 480px;
            background: #161f30;
            border: 1px solid #243048;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            flex-direction: column;
            overflow: hidden;
        }

        /* CHAT HEADER */
        .chat-header {
            background: #0b0f19;
            padding: 14px 16px;
            border-bottom: 1px solid #243048;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: grab;
            user-select: none;
        }

        .chat-header:active {
            cursor: grabbing;
        }

        .chat-header-info {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            color: #f1f5f9;
        }

        .online-status {
            width: 9px;
            height: 9px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 8px #10b981;
        }

        .chat-close-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 1.2rem;
            cursor: pointer;
        }

        /* CHAT BODY & MESSAGES */
        .chat-body {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #0b0f19;
        }

        .chat-msg {
            max-width: 82%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 0.88rem;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .bot-msg {
            background: #1e293b;
            color: #f1f5f9;
            border-bottom-left-radius: 2px;
            align-self: flex-start;
            border: 1px solid #243048;
        }

        .user-msg {
            background: linear-gradient(135deg, #3b82f6, #0284c7);
            color: #fff;
            border-bottom-right-radius: 2px;
            align-self: flex-end;
        }

        /* CHIPS & INPUT AREA */
        .quick-chips {
            padding: 8px 12px;
            background: #161f30;
            display: flex;
            gap: 6px;
            overflow-x: auto;
            border-top: 1px solid #243048;
            white-space: nowrap;
        }

        .chip-btn {
            background: rgba(59, 130, 246, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            cursor: pointer;
        }

        .chip-btn:hover {
            background: rgba(59, 130, 246, 0.3);
        }

        .chat-input-area {
            padding: 12px;
            background: #161f30;
            display: flex;
            gap: 8px;
            border-top: 1px solid #243048;
        }

        .chat-input {
            flex: 1;
            background: #0b0f19;
            border: 1px solid #243048;
            border-radius: 8px;
            padding: 8px 12px;
            color: #fff;
            font-size: 0.88rem;
            outline: none;
        }

        .chat-send-btn {
            background: #10b981;
            color: #000;
            border: none;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
        }
    </style>

    <div class="chatbot-widget" id="chatbotWidget">
        <!-- TOGGLE BUTTON -->
        <button class="chat-toggle-btn" id="chatToggleBtn">💬</button>

        <!-- CHAT WINDOW -->
        <div class="chat-window" id="chatWindow">
            <div class="chat-header" id="chatHeader">
                <div class="chat-header-info">
                    <span class="online-status"></span>
                    <span>AI Trợ Lý An Toàn Thực Phẩm 🖐️</span>
                </div>
                <button class="chat-close-btn" onclick="toggleChatBox()">✕</button>
            </div>

            <div class="chat-body" id="chatBody">
                <div class="chat-msg bot-msg">
                    Xin chào! 🛡️ Tôi có thể hỗ trợ giải đáp chỉ số Natri, Đường, Hàn the hoặc Mã Composite Code. (Bạn
                    có thể kéo vị trí tôi tùy ý!)
                </div>
            </div>

            <div class="quick-chips">
                <button class="chip-btn" onclick="sendQuickMsg('Ngưỡng Natri an toàn?')">Ngưỡng Natri</button>
                <button class="chip-btn" onclick="sendQuickMsg('Composite Code là gì?')">Composite Code</button>
                <button class="chip-btn" onclick="sendQuickMsg('Hàn the có nguy hại không?')">Hàn the / Borax</button>
            </div>

            <div class="chat-input-area">
                <input type="text" id="chatInput" class="chat-input" placeholder="Nhập câu hỏi..."
                    onkeypress="if(event.key==='Enter') sendChatMessage()">
                <button class="chat-send-btn" onclick="sendChatMessage()">Gửi</button>
            </div>
        </div>
    </div>


\;

class AppChatbot extends HTMLElement {
    connectedCallback() {
        this.innerHTML = chatbotHTML;
        this.initLogic();
    }
    initLogic() {
        const widget = document.getElementById('chatbotWidget');
        const toggleBtn = document.getElementById('chatToggleBtn');
        const chatHeader = document.getElementById('chatHeader');

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let dragDistance = 0;

        // 1. KÉO THẢ DI CHUYỂN
        [toggleBtn, chatHeader].forEach(element => {
            element.addEventListener('mousedown', startDrag);
            element.addEventListener('touchstart', startDrag, { passive: false });
        });

        function startDrag(e) {
            if (e.target.classList.contains('chat-close-btn')) return;

            isDragging = true;
            dragDistance = 0;

            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

            startX = clientX;
            startY = clientY;

            const rect = widget.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            widget.style.bottom = 'auto';
            widget.style.right = 'auto';
            widget.style.left = initialLeft + 'px';
            widget.style.top = initialTop + 'px';

            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', stopDrag);
        }

        function onDrag(e) {
            if (!isDragging) return;

            const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            dragDistance = Math.hypot(deltaX, deltaY);

            if (dragDistance > 5 && e.cancelable) {
                e.preventDefault();
            }

            widget.style.left = (initialLeft + deltaX) + 'px';
            widget.style.top = (initialTop + deltaY) + 'px';
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('touchend', stopDrag);
        }

        toggleBtn.addEventListener('click', (e) => {
            if (dragDistance <= 5) {
                toggleChatBox();
            }
        });

        function toggleChatBox() {
            const win = document.getElementById('chatWindow');
            win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
        }

        // 2. TƯƠNG TÁC GỬI VÀ TRẢ LỜI CÂU HỎI
        function sendQuickMsg(text) {
            document.getElementById('chatInput').value = text;
            sendChatMessage();
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;

            // Hiển thị tin nhắn người dùng
            appendMessage(text, 'user-msg');
            input.value = '';

            // Phản hồi tự động
            setTimeout(() => {
                const reply = generateBotReply(text);
                appendMessage(reply, 'bot-msg');
            }, 500);
        }

        function appendMessage(msg, className) {
            const chatBody = document.getElementById('chatBody');
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg ${className}`;
            msgDiv.innerText = msg;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        // Bộ não xử lý câu hỏi của Bot
        function generateBotReply(userInput) {
            const lower = userInput.toLowerCase();

            if (lower.includes('natri') || lower.includes('muối')) {
                return "🧂 Ngưỡng Natri khuyến nghị của WHO là ≤ 2000mg/ngày. Trên công cụ phân tích, ngưỡng cảnh báo an toàn mặc định là ≤ 600mg/100g thực phẩm.";
            }
            else if (lower.includes('đường') || lower.includes('glucose')) {
                return "🍬 Hàm lượng Đường/Glucose tiêu chuẩn trên công cụ được đề xuất dưới ngưỡng ≤ 10g/100g sản phẩm để tránh nguy cơ béo phì và tiểu đường.";
            }
            else if (lower.includes('mã') || lower.includes('composite')) {
                return "🏷️ Composite Code là mã định danh chuẩn hóa tạo tự động gồm: [Mã Mẫu] + [Trạng Thái] + [Chỉ Số]. Bạn có thể sao chép mã này để tra cứu lại ở trang Tra Cứu.";
            }
            else if (lower.includes('hàn the') || lower.includes('borax')) {
                return "⚠️ Hàn the (Borax) là chất cấm tuyệt đối trong thực phẩm. Bất kỳ mẫu thử nào phát hiện có Hàn the hệ thống sẽ lập tức gắn nhãn VƯỢT NGƯỠNG CẢNH BÁO.";
            }
            else if (lower.includes('chào') || lower.includes('hi') || lower.includes('hello')) {
                return "Xin chào! Rất vui được hỗ trợ bạn. Bạn cần kiểm tra thông số an toàn cho loại thực phẩm nào?";
            }
            else {
                return "Cảm ơn bạn! Tôi đã nhận thông tin. Bạn có thể nhấn vào các nút gợi ý phía dưới như 'Ngưỡng Natri', 'Composite Code' hoặc 'Hàn the' để xem thông tin chi tiết.";
            }
        }
    </script>

    }
}
customElements.define('app-chatbot', AppChatbot);
