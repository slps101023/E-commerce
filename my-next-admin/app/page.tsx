import Image from 'next/image';
import Navbar from '@/app/ui/dashboerd/Navbar';

// 模擬圖片資料
const images = [
  { id: '4985', size: '3.9 MB', src: 'https://picsum.photos/seed/p1/600/400' },
  { id: '5214', size: '4 MB', src: 'https://picsum.photos/seed/p2/600/400' },
  { id: '3851', size: '3.8 MB', src: 'https://picsum.photos/seed/p3/600/400' },
  { id: '4278', size: '4.1 MB', src: 'https://picsum.photos/seed/p4/600/400' },
  { id: '6842', size: '4 MB', src: 'https://picsum.photos/seed/p5/600/400' },
  { id: '3284', size: '3.9 MB', src: 'https://picsum.photos/seed/p6/600/400' },
  { id: '4841', size: '3.8 MB', src: 'https://picsum.photos/seed/p7/600/400' },
  { id: '5644', size: '4 MB', src: 'https://picsum.photos/seed/p8/600/400' },
];

export default function Gallery() {
  return (
    <main className="bg-retro-bg min-h-screen">
      <Navbar />
      <div className="bg-retro-bg min-h-screen p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {images.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-white/30 p-3 rounded-[24px] border border-white/50 transition-all duration-300 hover:bg-white/60 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* bg-white/30: 微微透出的白色底座，與背景產生色差
            p-3: 增加留白，製造「相框」感
            rounded-[24px]: 比圖片更圓一點點，層次更豐富
            hover:-translate-y-2: 懸停時往上飄，增加動態深度
        */}

              {/* 圖片容器 */}
              <div className="relative aspect-[3/2] overflow-hidden rounded-retro shadow-inner">
                <Image
                  src={item.src}
                  alt={`IMG_${item.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* 文字區塊 */}
              <div className="mt-4 px-1">
                <p className="text-[14px] font-bold text-retro-ink tracking-tight">
                  IMG_{item.id}.HEIC
                </p>
                <p className="text-[12px] text-retro-slate font-medium mt-0.5">
                  {item.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}