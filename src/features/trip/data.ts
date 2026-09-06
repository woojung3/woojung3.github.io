export const trip = {
  title: "2026 추석 가족여행",
  year: 2026,
  timezone: "Asia/Tokyo",
};
export const places = {
  hakata: { name: "하카타역", query: "博多駅" },
  yufuin: { name: "유후인역", query: "由布院駅" },
  house: {
    name: "가와모토 별저 926",
    note: "湯布院町川南92-6, 由布市, 大分県 879-5103",
  },
  hotel: {
    name: "컴포트 호텔 하카타",
    note: "福岡市博多区博多駅前2丁目1-1",
  },
  dazaifu: { name: "다자이후 텐만구", query: "太宰府天満宮" },
  aquarium: { name: "마린월드 수족관", query: "マリンワールド海の中道" },
  museum: {
    name: "호빵맨 어린이 뮤지엄",
    query: "福岡アンパンマンこどもミュージアム",
  },
  airport: {
    name: "후쿠오카 공항",
    query: "福岡空港 国際線",
    note: "출국 터미널은 항공권에서 확인.",
  },
} satisfies Record<string, { name: string; query?: string; note?: string }>;
export type Place = keyof typeof places;
export interface Stop {
  photo?: {
    src: string;
    alt: string;
    caption: string;
    author: string;
    source: string;
    license: string;
    licenseName?: string;
    width?: number;
    height?: number;
  };
  id: string;
  time: string;
  title: string;
  detail: string;
  place?: Place;
  fixed?: boolean;
  note?: string;
}
export interface Day {
  date: string;
  label: string;
  weekday: string;
  number: number;
  title: string;
  intro: string;
  stay?: Place;
  route: Place[];
  stops: Stop[];
  caution?: string;
}
export const days: Day[] = [
  {
    date: "2026-09-22",
    label: "9.22",
    weekday: "화",
    number: 2,
    title: "유후인 · 온천",
    intro: "하카타역 집합 · 유후인 산책 · 숙소 온천",
    stay: "house",
    route: ["hakata", "yufuin", "house"],
    stops: [
      {
        id: "meet",
        photo: {
          author: "そらみみ",
          source:
            "https://commons.wikimedia.org/wiki/File:Hakata_Station_20180306.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0",
          src: "/spaces/kyushu/photos/hakata.webp",
          caption: "하카타역",
          alt: "하카타역 건물과 역 앞 거리",
        },
        time: "07:00",
        title: "하카타역에서 일행 합류",
        detail: "일행과 만나 커피와 아침 식사.",
        place: "hakata",
        note: "집합 위치는 출발 전 공유.",
      },
      {
        id: "outbound",
        photo: {
          width: 1000,
          height: 667,
          author: "Gala8357",
          source: "https://commons.wikimedia.org/wiki/File:Kiha71-1.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0",
          licenseName: "CC BY-SA 4.0",
          src: "/spaces/kyushu/photos/train-outbound.webp",
          caption: "유후인노모리의 초록 좌석",
          alt: "초록 좌석과 나무 바닥의 유후인노모리 객실",
        },
        time: "10:11",
        title: "유후인행 기차 출발",
        detail: "유후인노모리 3호 · 12:27 도착 · 2시간 16분",
        place: "hakata",
        fixed: true,
        note: "1호차 8ABCD · 9CD. 승강장은 역 전광판에서 확인.",
      },
      {
        id: "lunch",
        photo: {
          width: 1000,
          height: 750,
          author: "inunami",
          source:
            "https://commons.wikimedia.org/wiki/File:Yufuin_Station_exterior_2022-09-10.jpg",
          license: "https://creativecommons.org/licenses/by/2.0",
          licenseName: "CC BY 2.0",
          src: "/spaces/kyushu/photos/yufuin-station.webp",
          caption: "유후인역",
          alt: "푸른 하늘 아래 검은 목조 유후인역",
        },
        time: "12:27",
        title: "유후인 도착 · 점심",
        detail: "유후인역 도착 후 점심 식사.",
        place: "yufuin",
      },
      {
        id: "walk",
        photo: {
          author: "Tzu-hsun, Hsu",
          source:
            "https://commons.wikimedia.org/wiki/File:Lake_Kinrin_with_Morning_fog.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0",
          src: "/spaces/kyushu/photos/yufuin.webp",
          caption: "긴린코의 아침 풍경",
          alt: "산과 나무가 비치는 긴린코 호수의 물안개",
        },
        time: "오후",
        title: "거리 산책 · 숙소 체크인",
        detail: "유후인 거리 산책 후 숙소 이동. 15:00부터 셀프 체크인.",
        place: "house",
      },
      {
        id: "dinner",
        time: "저녁",
        title: "장보기 · 저녁 · 온천",
        detail: "장보기 후 숙소에서 저녁 식사 · 온천욕.",
        note: "식재료와 다음 날 아침거리 준비.",
      },
    ],
  },
  {
    date: "2026-09-23",
    label: "9.23",
    weekday: "수",
    number: 3,
    title: "하카타 · 다자이후",
    intro: "유후인 체크아웃 · 하카타 이동 · 다자이후 산책",
    stay: "hotel",
    route: ["yufuin", "hakata", "hotel", "dazaifu"],
    caution:
      "다자이후 신사와 상점은 마감 시간이 다릅니다. 늦은 오후 방문 전 영업시간 확인.",
    stops: [
      {
        id: "brunch",
        time: "오전",
        title: "체크아웃 · 아점",
        detail: "10:00까지 체크아웃한 뒤 유후인에서 아침 겸 점심 식사.",
        place: "yufuin",
      },
      {
        id: "return",
        photo: {
          width: 1000,
          height: 667,
          author: "MaedaAkihiko",
          source:
            "https://commons.wikimedia.org/wiki/File:Yufuin-no-Mori-72.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0",
          licenseName: "CC BY-SA 4.0",
          src: "/spaces/kyushu/photos/train-return.webp",
          caption: "숲을 지나는 유후인노모리",
          alt: "녹음 옆 선로를 달리는 초록색 유후인노모리 열차",
        },
        time: "12:01",
        title: "하카타행 기차 출발",
        detail: "유후인노모리 2호 · 14:19 도착 · 2시간 18분",
        place: "yufuin",
        fixed: true,
        note: "4호차 8ABCD · 9AB. QR 티켓으로 탑승합니다.",
      },
      {
        id: "bags",
        photo: {
          author: "ぱちょぴ（pacyopi）",
          source:
            "https://commons.wikimedia.org/wiki/File:Comfort_hotel_hakata.jpg",
          license: "https://creativecommons.org/licenses/by-sa/3.0",
          src: "/spaces/kyushu/photos/hotel.webp",
          caption: "컴포트 호텔 하카타",
          alt: "컴포트 호텔 하카타가 있는 건물 외관",
        },
        time: "14:19",
        title: "하카타 도착 · 짐 보관",
        detail: "컴포트 호텔 하카타로 이동 · 짐 보관 요청.",
        place: "hotel",
      },
      {
        id: "snack",
        time: "14:50–15:30",
        title: "간식 후 다자이후로",
        detail: "하카타역에서 간식이나 디저트를 먹고 출발합니다.",
        place: "hakata",
        note: "출발 전 지도에서 이동 경로 확인.",
      },
      {
        id: "shrine",
        photo: {
          src: "/spaces/kyushu/photos/dazaifu.webp",
          alt: "다자이후 텐만구 본전의 붉은 기둥과 곡선 지붕, 주변 나무",
          caption: "다자이후 텐만구 본전",
          author: "Jakub Hałun",
          source:
            "https://commons.wikimedia.org/wiki/File:20100719_Dazaifu_Tenmangu_Shrine_3328.jpg",
          license: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
        time: "16:00–18:00",
        title: "다자이후 산책",
        detail: "텐만구와 상가거리를 둘러보고 우메가에 모찌를 맛봅니다.",
        place: "dazaifu",
      },
      {
        id: "meal",
        time: "18:00 이후",
        title: "저녁 식사",
        detail: "다자이후 근처 또는 하카타로 돌아오는 길에 식사합니다.",
      },
    ],
  },
  {
    date: "2026-09-24",
    label: "9.24",
    weekday: "목",
    number: 4,
    title: "마린월드 · 호빵맨 뮤지엄",
    intro: "오전 수족관 · 오후 호빵맨 뮤지엄",
    stay: "hotel",
    route: ["hotel", "aquarium", "museum", "hotel"],
    caution:
      "수족관 쇼 시간과 뮤지엄 입장 마감 확인. 두 장소 사이 이동시간을 고려해 출발.",
    stops: [
      {
        id: "sea",
        photo: {
          author: "そらみみ (Soramimi)",
          source:
            "https://commons.wikimedia.org/wiki/File:Marine_World_Uminonakamichi_2.JPG",
          license: "https://creativecommons.org/licenses/by-sa/4.0",
          src: "/spaces/kyushu/photos/marine.webp",
          caption: "마린월드 우미노나카미치",
          alt: "맑은 하늘 아래 마린월드 수족관 외관",
        },
        time: "오전",
        title: "마린월드 수족관",
        detail: "지하철·JR로 이동해 돌고래 쇼와 바다동물을 관람합니다.",
        place: "aquarium",
        note: "돌고래 쇼 시간에 맞춰 관람.",
      },
      {
        id: "food",
        time: "점심",
        title: "수족관 근처에서 식사",
        detail: "수족관 내부 또는 인근 식당에서 점심을 먹습니다.",
      },
      {
        id: "kids",
        time: "오후",
        title: "호빵맨 어린이 뮤지엄",
        detail: "아이들 체험과 캐릭터 쇼 관람.",
        place: "museum",
        note: "방문 전 입장권과 입장 마감 확인.",
      },
      {
        id: "last",
        time: "저녁",
        title: "저녁 식사",
        detail: "하카타 또는 텐진에서 저녁 식사.",
      },
    ],
  },
  {
    date: "2026-09-25",
    label: "9.25",
    weekday: "금",
    number: 5,
    title: "귀국",
    intro: "이른 체크아웃 · 공항 이동 · 09:30 출발",
    route: ["hotel", "airport"],
    caution:
      "09:30 항공편 출발. 수속 마감과 공항 이동시간을 고려해 호텔에서 출발.",
    stops: [
      {
        id: "checkout",
        photo: {
          width: 1000,
          height: 750,
          author: "Muyo",
          source:
            "https://commons.wikimedia.org/wiki/File:Fukuoka_Airport_international_terminal.jpg",
          license: "https://creativecommons.org/licenses/by-sa/3.0",
          licenseName: "CC BY-SA 3.0",
          src: "/spaces/kyushu/photos/airport.webp",
          caption: "후쿠오카 공항 국제선 터미널",
          alt: "푸른 하늘 아래 후쿠오카 공항 국제선 터미널 전경",
        },
        time: "이른 아침",
        title: "체크아웃 · 공항 이동",
        detail: "짐을 챙겨 후쿠오카 공항으로 이동합니다.",
        place: "airport",
        note: "출발 전날 공항 이동 수단과 출발 시각 결정.",
      },
      {
        id: "flight",
        time: "09:30",
        title: "한국행 비행기 출발",
        detail: "항공권의 편명·터미널·수속 마감 확인.",
        place: "airport",
      },
    ],
  },
];
