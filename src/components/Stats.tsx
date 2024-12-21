interface StatsProps {
  totalSold: number;
  totalPixels: number;
}

const Stats = ({ totalSold, totalPixels }: StatsProps) => {
  const percentageSold = (totalSold / totalPixels) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-600">Pixels Sold</h3>
        <p className="text-3xl font-bold text-solana-purple">{totalSold}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-600">Available</h3>
        <p className="text-3xl font-bold text-solana-purple">{totalPixels - totalSold}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-600">Sold</h3>
        <p className="text-3xl font-bold text-solana-purple">{percentageSold.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Stats;