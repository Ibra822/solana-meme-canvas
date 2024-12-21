interface StatsProps {
  totalSold: number;
  totalPixels: number;
}

const Stats = ({ totalSold, totalPixels }: StatsProps) => {
  const percentageSold = (totalSold / totalPixels) * 100;

  return (
    <div className="grid grid-cols-3 gap-1 max-w-3xl mx-auto">
      <div className="bg-white/10 p-2 rounded-sm border border-solana-purple/20">
        <h3 className="text-xs font-semibold text-solana-purple">Pixels Sold</h3>
        <p className="text-sm font-bold text-white">{totalSold}</p>
      </div>
      <div className="bg-white/10 p-2 rounded-sm border border-solana-purple/20">
        <h3 className="text-xs font-semibold text-solana-purple">Available</h3>
        <p className="text-sm font-bold text-white">{totalPixels - totalSold}</p>
      </div>
      <div className="bg-white/10 p-2 rounded-sm border border-solana-purple/20">
        <h3 className="text-xs font-semibold text-solana-purple">Sold</h3>
        <p className="text-sm font-bold text-white">{percentageSold.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Stats;