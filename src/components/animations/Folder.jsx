import { useState, useEffect } from 'react';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  const maxItems = 4;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(-1); // -1 means none, 0-3 means that item is pulled out
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';
  const paper4 = darkenColor('#ffffff', 0.15);

  // Autoplay logic
  useEffect(() => {
    let timer;
    const runCycle = async () => {
      // 1. Open Folder
      setOpen(true);
      await new Promise(r => setTimeout(r, 600));

      // 2. View each item one by one
      for (let i = 0; i < maxItems; i++) {
        setActiveItem(i);
        await new Promise(r => setTimeout(r, 2000));
        setActiveItem(-1);
        await new Promise(r => setTimeout(r, 400));
      }

      // 3. Close Folder
      setOpen(false);
      
      // 4. Wait before next cycle
      timer = setTimeout(runCycle, 3000);
    };

    runCycle();
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      setActiveItem(-1);
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
    '--paper-4': paper4
  };

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = index => {
    // If this item is active, pull it out more prominently
    if (activeItem === index) {
      return 'translate(-50%, -140%) scale(1.4) rotate(0deg)';
    }
    
    // Default open positions
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    if (index === 3) return 'translate(-50%, -40%) rotate(-5deg)'; // New row/item
    return '';
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-400 ease-out cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined,
          display: 'inline-block'
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            let sizeClasses = '';
            if (i === 0) sizeClasses = 'w-[70%] h-[80%]';
            if (i === 1) sizeClasses = 'w-[80%] h-[75%]';
            if (i === 2) sizeClasses = 'w-[90%] h-[80%]';
            if (i === 3) sizeClasses = 'w-[85%] h-[80%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-500 ease-in-out ${
                  !open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'
                } ${sizeClasses} flex items-center justify-center overflow-hidden`}
                style={{
                  ...(!open ? {} : { transform: transformStyle, zIndex: activeItem === i ? 50 : 20 }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : i === 2 ? paper3 : paper4,
                  borderRadius: '10px',
                  boxShadow: activeItem === i ? '0 20px 40px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-400 ease-out ${
              !open ? 'group-hover:[transform:skew(12deg)_scaleY(0.75)]' : ''
            }`}
            style={{
              backgroundColor: 'rgba(212, 168, 83, 0.25)', // Semi-transparent Gold
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212, 168, 83, 0.3)',
              borderRadius: '3px 12px 12px 12px',
              boxShadow: 'inset 0 3px 12px rgba(255,255,255,0.1)',
              ...(open && { transform: 'skew(12deg) scaleY(0.75)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-400 ease-out ${
              !open ? 'group-hover:[transform:skew(-12deg)_scaleY(0.75)]' : ''
            }`}
            style={{
              backgroundColor: 'rgba(212, 168, 83, 0.35)', // Slightly more opaque front flap
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '3px 12px 12px 12px',
              boxShadow: '0 -3px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.2)',
              ...(open && { transform: 'skew(-12deg) scaleY(0.75)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
