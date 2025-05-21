import { MapPin, Building } from "lucide-react";

type HistoricalItem = {
  year: string;
  title?: string;
  description: string;
  icon: "pin" | "building";
};

type HistoricalItemsProps = {
  items: HistoricalItem[];
};

export default function HistoricalItems({ items }: HistoricalItemsProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 my-6">
      {items.map((item, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            {item.icon === "pin" ? (
              <MapPin className="w-5 h-5 text-blue-500 mr-2" />
            ) : (
              <Building className="w-5 h-5 text-blue-500 mr-2" />
            )}
            <h3 className="font-medium text-gray-900 m-0">{item.year}</h3>
          </div>
          <p className="text-sm m-0">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
