        const RULES = {
            glucose: { 
                name: 'Glucose', limit: 10.0, unit: 'g/100g', hazardCode: 'H0001AA', safeCode: 'S0001aA',
                healthRisk: 'Không tốt cho tim mạch & chuyển hóa: Gây kháng insulin, béo phì, tăng nguy cơ tiểu đường tuýp 2.'
            },
            sodium: { 
                name: 'Natri', limit: 600.0, unit: 'mg/100g', hazardCode: 'C0001AA', safeCode: 'S0002aA',
                healthRisk: 'Đặc biệt hại tim mạch & thận: Làm tăng thể tích máu, gây tăng huyết áp mãn tính, suy tim, suy thận.'
            },
            fat: { 
                name: 'Chất Béo', limit: 5.0, unit: 'g/100g', hazardCode: 'C0002AA', safeCode: 'S0003aA',
                healthRisk: 'Nguy cơ tim mạch: Tăng Cholesterol xấu (LDL), hình thành mảng bám xơ vữa động mạch.'
            },
            transfat: { 
                name: 'Trans Fat', limit: 0.5, unit: 'g/100g', hazardCode: 'C0003AA', safeCode: 'S0005aA',
                healthRisk: 'RẤT NGUY HIỂM CHO TIM MẠCH: Tăng vọt LDL-Cholesterol, hẹp mạch máu, gây đột quỵ và nhồi máu cơ tim.'
            },
            citric: { 
                name: 'Acid Citric', limit: 0.5, unit: 'g/100g', hazardCode: 'W0001AA', safeCode: 'S0004aA',
                healthRisk: 'Ảnh hưởng tiêu hóa: Nồng độ cao gây bào mòn men răng, kích ứng niêm mạc dạ dày, trào ngược acid.'
            },
            benzoic: { 
                name: 'Axit Benzoic', limit: 1000.0, unit: 'mg/kg', hazardCode: 'P0001AA', safeCode: 'S0006aA',
                healthRisk: 'Gây kích ứng dạ dày; khi kết hợp với Vitamin C dưới ánh sáng có thể sinh ra Benzene gây ung thư.'
            },
            color_e102: { 
                name: 'Phẩm Màu', limit: 100.0, unit: 'mg/kg', hazardCode: 'A0001AA', safeCode: 'S0007aA',
                healthRisk: 'Tác động miễn dịch & thần kinh: Dễ gây nổi mề đai, hen suyễn, liên quan chứng tăng động (ADHD) ở trẻ.'
            },
            lead: { 
                name: 'Chì', limit: 0.2, unit: 'mg/kg', hazardCode: 'M0001AA', safeCode: 'S0008aA',
                healthRisk: 'ĐỘC TỐ KIM LOẠI NẶNG: Tích tụ xương/máu, tổn thương thần kinh trung ương, giảm IQ ở trẻ, gây suy thận.'
            },
            aflatoxin: { 
                name: 'Aflatoxin', limit: 2.0, unit: 'mcg/kg', hazardCode: 'T0001AA', safeCode: 'S0009aA',
                healthRisk: 'ĐỘC TỐ TẮN CÔNG GAN: Độc tố vi nấm Nhóm 1, phá hủy tế bào gan, gây xơ gan và UNG THƯ GAN cực kỳ nguy hiểm.'
            },
            salmonella: { 
                name: 'Salmonella', limit: 0.0, unit: 'CFU', hazardCode: 'B0001AA', safeCode: 'S0010aA',
                healthRisk: 'NGỘ ĐỘC CẤP TÍNH: Sốt cao, tiêu chảy mất nước nặng, nguy cơ vi khuẩn đi vào máu gây nhiễm trùng huyết.'
            }
        };

        const PRESETS = {
            candy: { sampleName: 'Kẹo Dừa', glucose: 45.0, sodium: 120, fat: 1.2, citric: 0.2, color_e102: 120, lead: 0.01, salmonella: 0 },
            sausage: { sampleName: 'Xúc Xích', glucose: 1.5, sodium: 850, fat: 8.5, transfat: 0.6, benzoic: 1100, lead: 0.05, salmonella: 0 }
        };

        // Trích xuất 2 chữ cái đầu không dấu viết hoa
        function getPrefix2(str) {
            if (!str || !str.trim()) return '';
            const cleanStr = str.trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d").replace(/Đ/g, "D")
                .replace(/[^a-zA-Z0-9\s]/g, "");

            const words = cleanStr.split(/\s+/).filter(w => w.length > 0);
            if (words.length >= 2) {
                return (words[0][0] + words[1][0]).toUpperCase();
            } else if (words.length === 1) {
                return words[0].substring(0, 2).toUpperCase();
            }
            return '';
        }

        // Tính toán & Đánh giá thời gian thực
        function calculateRealtime() {
            let generatedCodes = [];
            let tableHTML = '';
            let activeCount = 0;
            let safeCount = 0;
            let dangerCount = 0;
            let dangerItems = [];

            const sampleNameVal = document.getElementById('sampleName') ? document.getElementById('sampleName').value : '';
            const samplePrefix = getPrefix2(sampleNameVal);

            const sampleTagElem = document.getElementById('sampleTag');
            if (sampleTagElem) {
                sampleTagElem.innerText = samplePrefix || '--';
            }

            for (const [key, rule] of Object.entries(RULES)) {
                const inputElem = document.getElementById(key);
                const rawVal = inputElem ? inputElem.value : '';

                if (rawVal !== '' && !isNaN(rawVal)) {
                    activeCount++;
                    const val = parseFloat(rawVal);
                    const isExceeded = val > rule.limit;
                    
                    const itemPrefix = getPrefix2(rule.name);
                    const baseCode = isExceeded ? rule.hazardCode : rule.safeCode;
                    const itemCode = `${itemPrefix}-${baseCode}`;

                    generatedCodes.push(itemCode);

                    if (isExceeded) {
                        dangerCount++;
                        dangerItems.push({ 
                            name: rule.name, val: val, limit: rule.limit, unit: rule.unit, 
                            healthRisk: rule.healthRisk 
                        });
                    } else {
                        safeCount++;
                    }

                    const healthStatusText = isExceeded 
                        ? `<div class="text-red-400 font-medium text-xs"><i class="fa-solid fa-triangle-exclamation mr-1"></i><strong>Vượt ngưỡng:</strong> ${rule.healthRisk}</div>`
                        : `<div class="text-emerald-400/80 text-xs"><i class="fa-solid fa-circle-check mr-1"></i>Nằm trong giới hạn cho phép</div>`;

                    tableHTML += `
                        <tr class="hover:bg-slate-700/30 transition-colors">
                            <td class="py-3 px-3 font-medium text-slate-200 align-top">${rule.name}</td>
                            <td class="py-3 px-3 font-mono text-indigo-300 align-top">${val} ${rule.unit} <span class="text-xs text-slate-500 block">Tối đa: &le;${rule.limit}</span></td>
                            <td class="py-3 px-3 font-mono font-bold align-top ${isExceeded ? 'text-red-400' : 'text-emerald-400'}">${itemCode}</td>
                            <td class="py-3 px-3 align-top">${healthStatusText}</td>
                        </tr>
                    `;
                }
            }

            let finalMasterCode = "-- Chưa nhập dữ liệu --";
            if (generatedCodes.length > 0) {
                finalMasterCode = samplePrefix 
                    ? `[${samplePrefix}] ${generatedCodes.join(' - ')}` 
                    : generatedCodes.join(' - ');
            }

            document.getElementById('resultTableBody').innerHTML = tableHTML || `<tr><td colspan="4" class="py-6 text-center text-slate-500 italic">Nhập tên mẫu và các chỉ số ở form bên trái để xem kết quả phân tích</td></tr>`;
            document.getElementById('masterCodeDisplay').innerText = finalMasterCode;
            document.getElementById('activeCount').innerText = `${activeCount} chỉ số đã nhập`;

            updateFoodReport(activeCount, safeCount, dangerCount, dangerItems);
        }

        // Cập nhật thẻ Báo Cáo
        function updateFoodReport(total, safe, danger, dangerItems) {
            document.getElementById('statTotal').innerText = total;
            document.getElementById('statSafe').innerText = safe;
            document.getElementById('statDanger').innerText = danger;

            const statusTextElem = document.getElementById('overallStatusText');
            const alertBox = document.getElementById('dangerAlertBox');
            const alertList = document.getElementById('dangerList');

            if (total === 0) {
                statusTextElem.className = "text-xl font-bold text-slate-500 mt-0.5";
                statusTextElem.innerText = "-- Chưa có dữ liệu --";
                alertBox.classList.add('hidden');
                return;
            }

            if (danger === 0) {
                statusTextElem.className = "text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-2";
                statusTextElem.innerHTML = '<i class="fa-solid fa-circle-check"></i> ĐẠT CHUẨN AN TOÀN SỨC KHỎE';
                alertBox.classList.add('hidden');
            } else {
                statusTextElem.className = "text-xl font-bold text-red-400 mt-0.5 flex items-center gap-2";
                statusTextElem.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> NGUY HIỂM - VI PHẠM AN TOÀN SỨC KHỎE';
                
                alertList.innerHTML = dangerItems.map(item => `
                    <li class="bg-red-950/40 border border-red-500/30 p-2.5 rounded-lg">
                        <div class="font-bold text-red-300 text-xs uppercase mb-0.5">
                            <i class="fa-solid fa-ban text-red-400 mr-1"></i> ${item.name}: ${item.val} ${item.unit} (Cho phép: &le;${item.limit})
                        </div>
                        <div class="text-slate-300 text-xs">${item.healthRisk}</div>
                    </li>
                `).join('');
                alertBox.classList.remove('hidden');
            }
        }

        // --- TÍNH NĂNG XUẤT FILE ---

        // 1. Xuất file CSV (Tự động phân cột & hiển thị đẹp trong Microsoft Excel)
        function exportCSV() {
            const sampleName = document.getElementById('sampleName')?.value.trim() || 'Mau_Kiem_Nghiem';
            const samplePrefix = getPrefix2(sampleName);
            
            let activeItems = [];
            for (const [key, rule] of Object.entries(RULES)) {
                const inputElem = document.getElementById(key);
                const rawVal = inputElem ? inputElem.value : '';
                if (rawVal !== '' && !isNaN(rawVal)) {
                    const val = parseFloat(rawVal);
                    const isExceeded = val > rule.limit;
                    const itemPrefix = getPrefix2(rule.name);
                    const baseCode = isExceeded ? rule.hazardCode : rule.safeCode;
                    activeItems.push({
                        name: rule.name,
                        value: val,
                        unit: rule.unit,
                        limit: rule.limit,
                        status: isExceeded ? "VƯỜT NGƯỠNG (NGUY HIỂM)" : "ĐẠT (AN TOÀN)",
                        code: `${itemPrefix}-${baseCode}`,
                        risk: isExceeded ? rule.healthRisk : "Nằm trong ngưỡng cho phép"
                    });
                }
            }

            if (activeItems.length === 0) {
                alert("Vui lòng nhập ít nhất một chỉ số kiểm nghiệm trước khi xuất file!");
                return;
            }

            // \uFEFF hỗ trợ UTF-8 Tiếng Việt
            // sep=; ép Excel chia đúng cột tự động
            let csvContent = "\uFEFF";
            csvContent += "sep=;\n"; 
            csvContent += "THÔNG TIN BÁO CÁO AN TOÀN THỰC PHẨM & TÁC HẠI SỨC KHỎE;\n";
            csvContent += `Tên Mẫu Kiểm Nghiệm:;"${sampleName}"\n`;
            csvContent += `Prefix Mẫu:;"${samplePrefix || 'N/A'}"\n`;
            csvContent += `Mã Định Danh Tổng Hợp:;"${document.getElementById('masterCodeDisplay').innerText}"\n`;
            csvContent += `Thời Gian Xuất Báo Cáo:;"${new Date().toLocaleString('vi-VN')}"\n\n`;

            // Tiêu đề các cột dữ liệu
            csvContent += "STT;Chất Đánh Giá;Hàm Lượng;Đơn Vị;Ngưỡng Cho Phép;Trạng Thái;Mã Định Danh;Cảnh Báo & Tác Hại Sức Khỏe\n";

            // Xuất từng dòng dữ liệu vào các cột tương ứng
            activeItems.forEach((item, index) => {
                const cleanRisk = item.risk.replace(/"/g, '""');
                const cleanName = item.name.replace(/"/g, '""');
                csvContent += `${index + 1};"${cleanName}";${item.value};"${item.unit}";${item.limit};"${item.status}";"${item.code}";"${cleanRisk}"\n`;
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `BaoCao_ATTP_${samplePrefix || 'Sample'}_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // 2. Xuất file JSON (Cấu trúc dữ liệu nâng cao)
        function exportJSON() {
            const sampleName = document.getElementById('sampleName')?.value.trim() || 'Mau_Kiem_Nghiem';
            const samplePrefix = getPrefix2(sampleName);

            let activeItems = [];
            for (const [key, rule] of Object.entries(RULES)) {
                const inputElem = document.getElementById(key);
                const rawVal = inputElem ? inputElem.value : '';
                if (rawVal !== '' && !isNaN(rawVal)) {
                    const val = parseFloat(rawVal);
                    const isExceeded = val > rule.limit;
                    const itemPrefix = getPrefix2(rule.name);
                    const baseCode = isExceeded ? rule.hazardCode : rule.safeCode;
                    activeItems.push({
                        id: key,
                        indicatorName: rule.name,
                        value: val,
                        unit: rule.unit,
                        limit: rule.limit,
                        isExceeded: isExceeded,
                        assignedCode: `${itemPrefix}-${baseCode}`,
                        healthRisk: isExceeded ? rule.healthRisk : null
                    });
                }
            }

            if (activeItems.length === 0) {
                alert("Vui lòng nhập ít nhất một chỉ số kiểm nghiệm trước khi xuất file!");
                return;
            }

            const jsonData = {
                sampleInfo: {
                    name: sampleName,
                    prefix: samplePrefix,
                    masterCompositeCode: document.getElementById('masterCodeDisplay').innerText,
                    exportedAt: new Date().toISOString()
                },
                summaryStats: {
                    totalTested: activeItems.length,
                    safeCount: activeItems.filter(i => !i.isExceeded).length,
                    dangerCount: activeItems.filter(i => i.isExceeded).length
                },
                testResults: activeItems
            };

            const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `BaoCao_ATTP_${samplePrefix || 'Sample'}_${Date.now()}.json`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Nạp dữ liệu mẫu nhanh
        function loadPreset(type) {
            resetForm();
            const data = PRESETS[type];
            if (!data) return;

            for (const [key, val] of Object.entries(data)) {
                const inputElem = document.getElementById(key);
                if (inputElem) inputElem.value = val;
            }
            calculateRealtime();
        }

        // Xóa form
        function resetForm() {
            const sampleElem = document.getElementById('sampleName');
            if (sampleElem) sampleElem.value = '';
            document.getElementById('manualForm').reset();
            calculateRealtime();
        }

        // Khởi chạy mặc định
        calculateRealtime();
