import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Link as LinkIcon, Palette, Settings2, SlidersHorizontal } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('L');
  const [includeMargin, setIncludeMargin] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qrcode.png';
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-8 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">QR Code Generator</h1>
        <p className="text-slate-500 text-lg">Create minimal, optimized QR codes for any URL instantly.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                <LinkIcon size={16} /> URL or Text
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 my-6"></div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
              <Palette size={16} /> Colors
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fgColor" className="block text-xs font-medium text-slate-500 mb-1">Foreground</label>
                <div className="flex gap-2 items-center">
                  <input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 p-1 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <span className="text-sm font-mono text-slate-600">{fgColor}</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="bgColor" className="block text-xs font-medium text-slate-500 mb-1">Background</label>
                <div className="flex gap-2 items-center">
                  <input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 p-1 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <span className="text-sm font-mono text-slate-600">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-6"></div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
              <Settings2 size={16} /> Advanced
            </h3>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                <SlidersHorizontal size={14} /> Error Correction Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['L', 'M', 'Q', 'H'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                      level === l 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Higher levels make the QR code denser but more reliable. By default, it uses the lowest possible version for your data length.
              </p>
            </div>

            <label className="flex items-center gap-3 mt-4 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={includeMargin}
                  onChange={(e) => setIncludeMargin(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
              </div>
              <span className="text-sm font-medium text-slate-700 select-none">Include Quiet Zone Margin</span>
            </label>
            
            <div>
              <label htmlFor="size" className="block text-xs font-medium text-slate-500 mb-1">Export Size ({size}px)</label>
              <input
                id="size"
                type="range"
                min="128"
                max="1024"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
          <div className="bg-slate-50 w-full h-full rounded-xl flex flex-col items-center justify-center p-8 border border-slate-100 border-dashed relative">
            
            {url ? (
              <div className="flex flex-col items-center gap-8 fade-in">
                <div 
                  className="p-4 bg-white rounded-2xl shadow-xl transition-all hover:scale-105 duration-300 border border-slate-100"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={url}
                    size={size}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level={level}
                    includeMargin={includeMargin}
                  />
                </div>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium shadow-md transition-all hover:-translate-y-0.5"
                >
                  <Download size={18} />
                  Download PNG
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <LinkIcon size={48} className="mx-auto mb-4 opacity-20" />
                <p>Enter a URL to generate your QR Code</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
