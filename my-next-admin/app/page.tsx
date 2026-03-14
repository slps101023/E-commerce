import Image from 'next/image';

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
    <div className="bg-retro-bg min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {images.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            
            {/* 圖片容器 */}
            <div className="relative aspect-[3/2] overflow-hidden rounded-retro shadow-sm">
              <Image
                src={item.src}
                alt={`IMG_${item.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* 文字區塊：使用我們自定義的 retro-ink */}
            <div className="mt-4">
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
  );
}