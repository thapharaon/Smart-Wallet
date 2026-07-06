import { state } from './state.js';

export const langDict = {
    vi: {
        appDesc: "Quản lý tài chính cá nhân đa ngân sách offline", subject: "Chuyên đề thực tế 2",
        inc: "Tổng Thu", exp: "Tổng Chi", bal: "Còn Lại", inputTitle: "Ghi Chép Giao Dịch",
        date: "Ngày tháng", amount: "Số tiền", cat: "Danh mục", note: "Ghi chú", customCat: "Tên danh mục tự điền",
        btnSave: "Lưu Giao Dịch", timeline: "Dòng Thời Gian Giao Dịch", placeholderSearch: "Tìm kiếm theo ghi chú, danh mục hoặc ngày...",
        thDate: "Ngày", thType: "Loại", thDesc: "Danh mục / Ghi chú", thAmount: "Số tiền", thAct: "Hành động",
        repTitle: "Biểu Đồ Thống Kê", optExp: "Biểu đồ Tiền Chi", optInc: "Biểu đồ Tiền Thu",
        budTitle: "Thiết Lập Đa Ngân Sách", lblBType: "Loại Ngân Sách", lblBLimit: "Số Tiền Hạn Mức", lblBCustom: "Nhập tên loại ngân sách tự chọn...", btnBUp: "Thêm/Cập Nhật Ngân Sách",
        settTitle: "Cài Đặt Hệ Thống", settLang: "Ngôn ngữ (Language)", settCur: "Đơn vị tiền tệ (Currency)",
        settWarnTitle: "Cấu Hình Ngưỡng Cảnh Báo Ngân Sách", settWarnOrange: "Cảnh báo Vàng (Sắp chạm ngưỡng %)", settWarnRed: "Cảnh báo Đỏ (Vượt hạn mức %)",
        settCatTitle: "Quản Lý Danh Mục Mặc Định", settBackupTitle: "Sao Lưu & Khôi Phục", settBtnExport: "Xuất dữ liệu Sao lưu", settBtnImport: "Nhập dữ liệu cũ",
        settTheme: "Màu sắc chủ đạo", settDanger: "Khu vực nguy hiểm", settBtnClear: "Xóa tất cả dữ liệu",
        navIn: "Nhập Liệu", navCal: "Lịch & GD", navRep: "Báo Cáo", navBud: "Ngân Sách", navSet: "Cài Đặt",
        modTitle: "Chỉnh Sửa Giao Dịch", modCustom: "Tên danh mục tự sửa", modCancel: "Hủy Bỏ", modUpdate: "Cập Nhật",
        alertSaved: "Đã lưu giao dịch!", alertUpdated: "Đã cập nhật thay đổi thành công!", alertDelConf: "Bạn có thực sự muốn xóa bỏ giao dịch này?",
        alertDelBud: "Bạn có muốn xóa mục ngân sách của '{cat}'?", alertClearConf: "Xác nhận xóa toàn bộ dữ liệu? Thao tác này không thể hoàn tác.",
        alertCleaned: "Hệ thống đã được làm sạch!", alertBudSucess: "Đã thiết lập ngân sách cho mục: ", alertCustomCatReq: "Vui lòng nhập tên danh mục!",
        alertImportSuccess: "Khôi phục dữ liệu thành công!", alertImportFail: "File dữ liệu không hợp lệ!",
        noData: "Không có dữ liệu", budgetSafe: "An toàn", budgetWarning: "Sắp chạm ngưỡng ⚡", budgetDanger: "Vượt hạn mức! ⚠️", budgetGeneral: "Ngân Sách Chung (Tổng)", budgetLimitLbl: "Hạn mức: ", customOptText: "✨ Khác (Tự nhập...)"
    },
    en: {
        appDesc: "Offline multi-budget personal financial tracker", subject: "Practical Project 2",
        inc: "Total Income", exp: "Total Expense", bal: "Net Balance", inputTitle: "Transaction Logger",
        date: "Date", amount: "Amount", cat: "Category", note: "Note", customCat: "Custom Category Name",
        btnSave: "Save Transaction", timeline: "Transaction Timeline", placeholderSearch: "Search by note, category or date...",
        thDate: "Date", thType: "Type", thDesc: "Category / Note", thAmount: "Amount", thAct: "Action",
        repTitle: "Statistical Analytics", optExp: "Expense Chart", optInc: "Income Chart",
        budTitle: "Multi-Budget Management", lblBType: "Budget Category", lblBLimit: "Limit Amount", lblBCustom: "Enter custom budget name...", btnBUp: "Add/Update Budget",
        settTitle: "System Settings", settLang: "Language", settCur: "Currency",
        settWarnTitle: "Budget Alert Threshold Configuration", settWarnOrange: "Yellow Alert (Near limit %)", settWarnRed: "Red Alert (Over limit %)",
        settCatTitle: "Manage Default Categories", settBackupTitle: "Backup & Restore", settBtnExport: "Export Backup File", settBtnImport: "Import Backup File",
        settTheme: "Primary Color Theme", settDanger: "Danger Zone", settBtnClear: "Clear All System Data",
        navIn: "Entry", navCal: "Timeline", navRep: "Report", navBud: "Budget", navSet: "Settings",
        modTitle: "Edit Transaction", modCustom: "Custom Category Name", modCancel: "Cancel", modUpdate: "Update",
        alertSaved: "Transaction saved successfully!", alertUpdated: "Changes updated successfully!", alertDelConf: "Are you sure you want to delete this transaction?",
        alertDelBud: "Delete budget limit for '{cat}'?", alertClearConf: "CRITICAL: Clear all system data? This action cannot be undone.",
        alertCleaned: "System data cleared!", alertBudSucess: "Budget limit updated for: ", alertCustomCatReq: "Please enter a valid name!",
        alertImportSuccess: "Data restored successfully!", alertImportFail: "Invalid backup file format!",
        noData: "No Data Available", budgetSafe: "Safe", budgetWarning: "Approaching Limit ⚡", budgetDanger: "Over Budget Limit! ⚠️", budgetGeneral: "General Budget (Total)", budgetLimitLbl: "Limit: ", customOptText: "✨ Other (Custom text...)"
    }
};

export function applyLocalization() {
    const d = langDict[state.currentLang];

    document.getElementById('txt-app-desc').innerText = d.appDesc;
    document.getElementById('txt-header-subject').innerText = d.subject;
    document.getElementById('lbl-total-income').innerText = d.inc;
    document.getElementById('lbl-total-expense').innerText = d.exp;
    document.getElementById('lbl-total-balance').innerText = d.bal;
    document.getElementById('lbl-input-title').innerHTML = `<i class="fa-solid fa-circle-plus text-${state.activeTheme}-400 mr-2 header-icon-color"></i>${d.inputTitle}`;
    document.getElementById('lbl-f-date').innerText = d.date;
    document.getElementById('lbl-f-amount').innerText = d.amount;
    document.getElementById('f-amount').placeholder = state.currentLang === 'vi' ? 'Nhập số tiền...' : 'Enter amount...';
    document.getElementById('lbl-f-category').innerText = d.cat;
    document.getElementById('lbl-f-custom').innerText = d.customCat;
    document.getElementById('lbl-f-note').innerText = d.note;
    document.getElementById('f-note').placeholder = state.currentLang === 'vi' ? 'Nhập lý do chi tiêu...' : 'Enter note details...';
    document.getElementById('btn-submit-form').innerText = d.btnSave;

    document.getElementById('lbl-timeline-title').innerText = d.timeline;
    document.getElementById('search-tx').placeholder = d.placeholderSearch;

    const row = document.getElementById('table-header-row');
    row.innerHTML = `<th class="py-2">${d.thDate}</th><th class="py-2">${d.thType}</th><th class="py-2">${d.thDesc}</th><th class="py-2 text-right">${d.thAmount}</th><th class="py-2 text-center">${d.thAct}</th>`;

    document.getElementById('lbl-report-title').innerHTML = `<i class="fa-solid fa-chart-pie mr-2 text-${state.activeTheme}-400 header-icon-color"></i>${d.repTitle}`;
    const rSelect = document.getElementById('report-type');
    rSelect.innerHTML = `<option value="chi">${d.optExp}</option><option value="thu">${d.optInc}</option>`;

    document.getElementById('lbl-budget-title').innerHTML = `<i class="fa-solid fa-bullseye mr-2 text-${state.activeTheme}-400 header-icon-color"></i>${d.budTitle}`;
    document.getElementById('lbl-b-type').innerText = d.lblBType;
    document.getElementById('lbl-b-limit').innerText = d.lblBLimit;
    document.getElementById('lbl-b-custom-name').innerText = d.lblBCustom;
    document.getElementById('budget-custom-name').placeholder = state.currentLang === 'vi' ? 'Ví dụ: Nuôi mèo, Đi chơi...' : 'e.g. Travel, Coffee...';
    document.getElementById('lbl-b-btn').innerText = d.btnBUp;

    document.getElementById('lbl-sett-title').innerHTML = `<i class="fa-solid fa-sliders mr-2 text-${state.activeTheme}-400 header-icon-color"></i>${d.settTitle}`;
    document.getElementById('lbl-sett-lang').innerText = d.settLang;
    document.getElementById('lbl-sett-currency').innerText = d.settCur;
    document.getElementById('lbl-sett-warn-title').innerText = d.settWarnTitle;
    document.getElementById('lbl-sett-warn-orange').innerText = d.settWarnOrange;
    document.getElementById('lbl-sett-warn-red').innerText = d.settWarnRed;
    document.getElementById('lbl-sett-cat-title').innerText = d.settCatTitle;
    document.getElementById('lbl-sett-backup-title').innerText = d.settBackupTitle;
    document.getElementById('lbl-sett-btn-export').innerText = d.settBtnExport;
    document.getElementById('lbl-sett-btn-import').innerText = d.settBtnImport;
    document.getElementById('lbl-sett-theme').innerText = d.settTheme;
    document.getElementById('lbl-sett-danger').innerText = d.settDanger;
    document.getElementById('lbl-sett-btn-clear').innerText = d.settBtnClear;

    document.getElementById('lbl-modal-title').innerHTML = `<i class="fa-solid fa-user-gear text-${state.activeTheme}-400 mr-1 modal-icon-color"></i>${d.modTitle}`;
    document.getElementById('lbl-m-date').innerText = d.date;
    document.getElementById('lbl-m-amount').innerText = d.amount;
    document.getElementById('lbl-m-category').innerText = d.cat;
    document.getElementById('lbl-m-custom').innerText = d.modCustom;
    document.getElementById('lbl-m-note').innerText = d.note;
    document.getElementById('lbl-m-btn-cancel').innerText = d.modCancel;
    document.getElementById('btn-save-modal').innerText = d.modUpdate;

    document.getElementById('nav-txt-input').innerText = d.navIn;
    document.getElementById('nav-txt-calendar').innerText = d.navCal;
    document.getElementById('nav-txt-report').innerText = d.navRep;
    document.getElementById('nav-txt-budget').innerText = d.navBud;
    document.getElementById('nav-txt-settings').innerText = d.navSet;

    document.getElementById('sett-lang').value = state.currentLang;
    document.getElementById('sett-currency').value = state.currentCurrency;

    const calHeader = document.getElementById('calendar-days-header');
    calHeader.innerHTML = state.currentLang === 'vi' ?
        `<div>CN</div><div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div>` :
        `<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>`;
}
