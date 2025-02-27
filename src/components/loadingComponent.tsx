import { LucideLoaderCircle } from "lucide-react";

const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 bg-slate-400/5 flex items-center justify-center">
      <div>
        <LucideLoaderCircle className="w-7 h-7 animate-spin text-white" />
      </div>
    </div>
  );
};

export default LoadingComponent;
