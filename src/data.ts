import { Question, ClassHistoryItem } from './types';

export const BASE_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Scratch cơ bản",
    level: "Thông hiểu",
    text: "Trong Scratch, để thực hiện khối lệnh lặp đi lặp lại vô hạn lần một hành động nào đó, em sử dụng khối lệnh nào?",
    A: "Khối lệnh 'repeat 10'",
    B: "Khối lệnh 'forever'",
    C: "Khối lệnh 'if... then'",
    D: "Khối lệnh 'repeat until'",
    correct: "B",
    explain: "Khối lệnh 'forever' giúp vòng lặp thực thi liên tục không ngừng cho đến khi người dùng bấm nút đỏ Stop."
  },
  {
    id: 2,
    category: "Scratch cơ bản",
    level: "Nhận biết",
    text: "Nhân vật mặc định xuất hiện đầu tiên khi khởi động phần mềm Scratch là nhân vật nào?",
    A: "Một chú rùa nhỏ",
    B: "Một chú mèo dễ thương",
    C: "Một chú cún con",
    D: "Một chiếc máy bay siêu tốc",
    correct: "B",
    explain: "Chú mèo màu cam là linh vật và nhân vật mặc định đầu tiên của Scratch."
  },
  {
    id: 3,
    category: "Mạng Internet",
    level: "Nhận biết",
    text: "Để tìm kiếm thông tin về bài học Lịch sử Việt Nam trên Internet, trang web tìm kiếm phổ biến nhất hiện nay là gì?",
    A: "Google (google.com)",
    B: "Scratch (scratch.mit.edu)",
    C: "Word (Microsoft Word)",
    D: "Gmail (gmail.com)",
    correct: "A",
    explain: "Google là công cụ tìm kiếm dữ liệu, thông tin, hình ảnh phổ biến nhất trên toàn thế giới hiện tại."
  },
  {
    id: 4,
    category: "Thư điện tử",
    level: "Thông hiểu",
    text: "Địa chỉ thư điện tử (Email) nào sau đây viết ĐÚNG cấu trúc chuẩn?",
    A: "nguyenvanan.gmail.com",
    B: "nguyenvanan@gmail.com",
    C: "nguyenvanan@gmail@com",
    D: "nguyenvanan#gmail.com",
    correct: "B",
    explain: "Thư điện tử phải có ký tự '@' phân tách giữa tên người dùng và tên miền nhà cung cấp dịch vụ."
  },
  {
    id: 5,
    category: "Mạng Internet",
    level: "Vận dụng",
    text: "Khi một người lạ gửi tin nhắn trên mạng yêu cầu em cung cấp số điện thoại của bố mẹ và địa chỉ nhà, em nên ứng xử thế nào?",
    A: "Cung cấp ngay lập tức để làm quen",
    B: "Không cung cấp và báo ngay cho bố mẹ hoặc giáo viên biết",
    C: "Rủ bạn cùng lớp gửi chung cho vui",
    D: "Hẹn gặp mặt người đó ở ngoài công viên",
    correct: "B",
    explain: "Để bảo vệ an toàn thông tin cá nhân và tránh nguy hiểm, tuyệt đối không chia sẻ dữ liệu nhạy cảm cho người lạ trên mạng."
  },
  {
    id: 6,
    category: "Soạn thảo văn bản",
    level: "Thông hiểu",
    text: "Để chèn một bảng (Table) gồm 3 cột và 4 dòng vào văn bản Word, em chọn thẻ nào trên thanh bảng chọn?",
    A: "Thẻ Home (Trang chủ)",
    B: "Thẻ Insert (Chèn)",
    C: "Thẻ Design (Thiết kế)",
    D: "Thẻ View (Hiển thị)",
    correct: "B",
    explain: "Mọi thao tác chèn đối tượng bên ngoài (hình ảnh, bảng, hình vẽ) đều nằm trong thẻ 'Insert'."
  },
  {
    id: 7,
    category: "Trình chiếu",
    level: "Nhận biết",
    text: "Trong Microsoft PowerPoint, để bắt đầu trình chiếu bài thuyết trình từ trang slide đầu tiên, em nhấn phím nào trên bàn phím?",
    A: "Phím F5",
    B: "Phím ESC",
    C: "Phím Enter",
    D: "Phím Spacebar (Dấu cách)",
    correct: "A",
    explain: "Phím F5 là phím tắt tiêu chuẩn dùng để bắt đầu trình chiếu toàn màn hình bài thuyết trình PowerPoint."
  },
  {
    id: 8,
    category: "Scratch cơ bản",
    level: "Vận dụng",
    text: "Nếu muốn nhân vật Scratch vẽ một hình vuông hoàn hảo, mỗi góc quay của nhân vật phải là bao nhiêu độ?",
    A: " Quay 60 độ",
    B: " Quay 90 độ",
    C: " Quay 120 độ",
    D: " Quay 180 độ",
    correct: "B",
    explain: "Góc của một hình vuông là 90 độ, do đó nhân vật cần rẽ góc 90 độ sau mỗi cạnh để tạo hình vuông."
  },
  {
    id: 9,
    category: "Thư điện tử",
    level: "Nhận biết",
    text: "Nút lệnh nào giúp em tải tệp đính kèm (hình ảnh, bài tập về nhà) từ hòm thư điện tử về máy tính cá nhân?",
    A: "Nút gửi (Send)",
    B: "Nút Tải xuống (Download - biểu tượng mũi tên chỉ xuống)",
    C: "Nút Chuyển tiếp (Forward)",
    D: "Nút Thùng rác (Delete)",
    correct: "B",
    explain: "Biểu tượng mũi tên đi xuống chính là nút tải xuống dữ liệu về máy tính."
  },
  {
    id: 10,
    category: "Soạn thảo văn bản",
    level: "Nhận biết",
    text: "Để lưu bài văn em vừa soạn thảo thành tệp tin trên máy tính, em dùng tổ hợp phím tắt nào?",
    A: "Tổ hợp phím Ctrl + C",
    B: "Tổ hợp phím Ctrl + V",
    C: "Tổ hợp phím Ctrl + S",
    D: "Tổ hợp phím Ctrl + Z",
    correct: "C",
    explain: "Phím tắt 'Ctrl + S' (Save) dùng để lưu tài liệu tức thì, giúp hạn chế rủi ro mất dữ liệu."
  }
];

export const INITIAL_CLASS_HISTORY: ClassHistoryItem[] = [
  { name: "Nguyễn Văn An", class: "5A1", category: "Scratch cơ bản", correct: "8/10", score: 8.0, tier: "Hiệp sĩ Công nghệ", date: "2026-06-01" },
  { name: "Trần Quốc Cường", class: "5A1", category: "Mạng Internet", correct: "9/10", score: 9.0, tier: "Sứ giả Thông tin", date: "2026-06-03" },
  { name: "Lê Thị Bình", class: "5A2", category: "Tổng hợp", correct: "10/10", score: 10.0, tier: "Trạng nguyên VinaIT", date: "2026-06-04" },
  { name: "Phạm Minh Duy", class: "5A3", category: "Soạn thảo văn bản", correct: "6/10", score: 6.0, tier: "Chiến binh Công nghệ", date: "2026-06-05" }
];

export const INITIAL_CLASSES: Record<string, string[]> = {
  "5A1": ["Nguyễn Văn An", "Lê Thị Bình", "Trần Quốc Cường", "Phạm Minh Duy", "Hoàng Mỹ Duyên"],
  "5A2": ["Bùi Tiến Dũng", "Phan Thanh Hải", "Nguyễn Minh Khang", "Trần Mai Anh"],
  "5A3": ["Đỗ Gia Bảo", "Vũ Quốc Khánh", "Nguyễn Hải Yến", "Nguyễn Tuấn Tú"]
};

export const AVATARS = ['🚀', '👾', '🐱', '🐼', '🤖', '🐯', '🦁', '🦊', '🦖', '🦄'];
export const TOPICS = ["Scratch cơ bản", "Mạng Internet", "Thư điện tử", "Soạn thảo văn bản", "Trình chiếu"];
export const LEVELS = ["Nhận biết", "Thông hiểu", "Vận dụng"];
export const CLASS_OPTIONS = ["5A1", "5A2", "5A3", "5A4"];
