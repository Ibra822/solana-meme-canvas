interface StatsProps {
  totalSold: number;
  totalPixels: number;
}

const Stats = ({ totalSold, totalPixels }: StatsProps) => {
  const percentageSold = (totalSold / totalPixels) * 100;

  return (
    <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto">
      <div className="bg-white/10 p-1 rounded-lg border border-solana-purple/20">
        <h3 className="text-[8px] font-pixel text-[#9b87f5]">Pixels Sold</h3>
        <p className="text-xs font-pixel text-solana-purple">{totalSold}</p>
      </div>
      <div className="bg-white/10 p-1 rounded-lg border border-solana-purple/20">
        <h3 className="text-[8px] font-pixel text-[#9b87f5]">Available</h3>
        <p className="text-xs font-pixel text-solana-purple">{totalPixels - totalSold}</p>
      </div>
      <div className="bg-white/10 p-1 rounded-lg border border-solana-purple/20">
        <h3 className="text-[8px] font-pixel text-[#9b87f5]">Sold</h3>
        <p className="text-xs font-pixel text-solana-purple">{percentageSold.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Stats;