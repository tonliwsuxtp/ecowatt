// Simulates network latency
const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DashboardData {
  dailyPct: number
  monthlyPct: number
  stats: { label: string; value: string; sub: string; color: string }[]
  weeklyKwh: number[]
  deviceActive: number
  deviceTotal: number
  monthlyTrend: number[]
  weeklyAlerts: number[]
}

export interface AdviceData {
  pieData: { label: string; value: number; color: string }[]
  dailyTip: { action: string; saving: string }
  monthlyTip: { action: string; saving: string }
  monthlyActions: string[]
}

export interface SummaryData {
  month: string
  totalBaht: number
  overBaht: number
  prevMonthBaht: number
  avgDailyBaht: number
  changePct: number
  sparklineData: number[]
  envTip: string
}

export interface SummaryDetailData {
  topDevices: { rank: number; name: string; pct: number }[]
  peakTime: string
  tips: string[]
}

export interface RoomDevice {
  id: number
  name: string
  on: boolean
}

export interface Room {
  id: number
  label: string
  img: string
  devices: RoomDevice[]
}

// ─── Mock fetch functions ─────────────────────────────────────────────────────

export async function fetchDashboard(): Promise<DashboardData> {
  await delay(900)
  return {
    dailyPct: 24,
    monthlyPct: 56,
    stats: [
      { label: 'วันนี้',     value: '2.4 kWh', sub: '฿ 8.40',          color: '#4A9EE8' },
      { label: 'เดือนนี้',   value: '68 kWh',  sub: '฿ 238.00',        color: '#5BC4B5' },
      { label: 'เฉลี่ย/วัน', value: '3.2 kWh', sub: '฿ 11.20',         color: '#F0954A' },
      { label: 'ประหยัดได้', value: '15%',     sub: 'vs เดือนที่แล้ว', color: '#5BC45B' },
    ],
    weeklyKwh: [30, 45, 28, 60, 42, 55, 38],
    deviceActive: 4,
    deviceTotal: 6,
    monthlyTrend: [380, 420, 360, 410, 240],
    weeklyAlerts: [2, 0, 3, 1, 4, 1, 2],
  }
}

export async function fetchAdvice(): Promise<AdviceData> {
  await delay(700)
  return {
    pieData: [
      { label: 'แอร์',    value: 45, color: '#3B6BAE' },
      { label: 'ตู้เย็น', value: 35, color: '#7AAFD4' },
      { label: 'อื่น ๆ',  value: 20, color: '#B8D9EE' },
    ],
    dailyTip: { action: 'ปิดไฟเมื่อไม่ใช้งาน', saving: 'ประหยัด ~5 บาท/วัน' },
    monthlyTip: { action: 'ตั้งแอร์ 26°C', saving: 'ลดได้ ~200 บาท/เดือน' },
    monthlyActions: [
      'ใช้ปลั๊กพ่วงที่มีสวิตช์',
      'ใช้เครื่องใช้ไฟฟ้าในช่วงเวลาเหมาะสม',
    ],
  }
}

export async function fetchSummary(): Promise<SummaryData> {
  await delay(800)
  return {
    month: 'ตุลาคม',
    totalBaht: 1450,
    overBaht: 150,
    prevMonthBaht: 1300,
    avgDailyBaht: 48.33,
    changePct: 5.07,
    sparklineData: [60, 55, 62, 50, 58, 52, 65, 60, 70, 75, 68, 80],
    envTip: 'หากลดการใช้ 10% ต่อเดือน คุณจะลดต้นทุนได้ประมาณ 130 บาท และลดการปล่อยก๊าซเรือนกระจก',
  }
}

export async function fetchSummaryDetail(): Promise<SummaryDetailData> {
  await delay(700)
  return {
    topDevices: [
      { rank: 1, name: 'เครื่องปรับอากาศ', pct: 35 },
      { rank: 2, name: 'ตู้เย็น',           pct: 25 },
      { rank: 3, name: 'เครื่องทำน้ำอุ่น',  pct: 15 },
    ],
    peakTime: '18:00 - 22:00 น.',
    tips: [
      'ปรับแอร์ขึ้น 1-2°C (ลดการใช้พลังงานได้มาก)',
      'ตั้งเวลาปิดเครื่องใช้ไฟฟ้าที่ไม่ใช้ (smart-plug schedule)',
      'ใช้เตา/หม้อไฟพร้อมกันให้น้อยลงหรือย้ายบางกิจกรรมไปช่วงเช้า/บ่าย',
    ],
  }
}

export async function fetchRooms(): Promise<Room[]> {
  await delay(800)
  return [
    {
      id: 1,
      label: 'ห้องนั่งเล่น',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=60',
      devices: [
        { id: 1, name: 'เครื่องปรับอากาศ', on: false },
        { id: 2, name: 'ไฟเพดาน',          on: false },
        { id: 3, name: 'ทีวี',             on: false },
        { id: 4, name: 'ปลั๊กไฟ',          on: false },
      ],
    },
    {
      id: 2,
      label: 'ห้องนอน\nน้องฟาร์',
      img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=60',
      devices: [
        { id: 1, name: 'เครื่องปรับอากาศ', on: false },
        { id: 2, name: 'โคมไฟหัวเตียง',   on: false },
        { id: 3, name: 'พัดลม',            on: false },
        { id: 4, name: 'ปลั๊กไฟ',          on: false },
      ],
    },
    {
      id: 3,
      label: 'ห้องน้ำชั้น 2',
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=120&q=60',
      devices: [
        { id: 1, name: 'ไฟเพดาน', on: false },
        { id: 2, name: 'ปลั๊กไฟ', on: false },
      ],
    },
  ]
}
