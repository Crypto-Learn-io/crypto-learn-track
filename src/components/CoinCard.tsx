
import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;
}

const CoinCard = ({ id, name, symbol, price, change24h, image }: CoinCardProps) => {
  const isPositive = change24h >= 0;
  
  return (
    <Link to={`/coin/${id}`} className="crypto-card flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={image} alt={name} className="w-8 h-8 rounded-full" />
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground uppercase">{symbol}</p>
          </div>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs ${isPositive ? 'bg-green-500/10 text-crypto-green' : 'bg-red-500/10 text-crypto-red'}`}>
          {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
          {Math.abs(change24h).toFixed(2)}%
        </div>
      </div>
      <div className="mt-auto">
        <p className="font-semibold text-xl">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    </Link>
  );
};

export default CoinCard;
