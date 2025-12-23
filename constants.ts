import { LinkItem, ProfileData } from './types';

export const FALLBACK_PROFILE: ProfileData = {
  name: "THÁI HIẾU",
  role: "THE INSIDER",
  sub_role: "Vũ khí hóa thông tin Bất động sản. Săn lùng vùng trũng trước khi đám đông ập đến.",
  avatar_url: "https://bkvcxodxaqqcfxfdzpnf.supabase.co/storage/v1/object/public/avatars/ThaiHieu.png"
};

export const FALLBACK_LINKS: LinkItem[] = [
  {
    id: '1',
    title: "MẬT MÃ QUY HOẠCH 2026",
    subtitle: "Dữ liệu nội bộ (\"Vùng Trũng\" Tỷ Đô)",
    url: "#",
    is_featured: true,
    order_index: 1
  },
  {
    id: '2',
    title: "BLUEPRINT: DÒNG TIỀN CÁ MẬP",
    subtitle: "Chiến thuật thâu tóm & Cơ cấu vốn",
    url: "#",
    is_featured: false,
    order_index: 2
  },
  {
    id: '3',
    title: "BLACKLIST: DỰ ÁN CẦN NÉ",
    subtitle: "Hồ sơ các \"xác chết\" lâm sàng",
    url: "#",
    is_featured: false,
    order_index: 3
  },
  {
    id: '4',
    title: "PRIVATE COUNCIL (1:1)",
    subtitle: "Booking Only | Portfolio > 10 Tỷ",
    url: "#",
    is_featured: false,
    order_index: 4
  }
];