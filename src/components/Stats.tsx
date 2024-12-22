interface StatsProps {
  totalSold: number;
  totalPixels: number;
}

const Stats = ({ totalSold, totalPixels }: StatsProps) => {
  const percentageSold = (totalSold / totalPixels) * 100;

  return (
    <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto">
      <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-pixel text-[8px] uppercase tracking-wider">Pixels Sold</span>
        </div>
        <div className="text-[#1EAEDB] font-bold font-pixel text-[10px]">{totalSold}</div>
      </div>
      <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)] relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-pixel text-[8px] uppercase tracking-wider">Available</span>
          <span className="absolute right-2 top-2 bg-[#ea384c] text-white px-2 py-0.5 rounded text-[8px] font-pixel animate-pulse">
            LIVE
          </span>
        </div>
        <div className="text-[#1EAEDB] font-bold font-pixel text-[10px]">{totalPixels - totalSold}</div>
      </div>
      <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-pixel text-[8px] uppercase tracking-wider">Sold</span>
        </div>
        <div className="text-[#1EAEDB] font-bold font-pixel text-[10px]">{percentageSold.toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default Stats;