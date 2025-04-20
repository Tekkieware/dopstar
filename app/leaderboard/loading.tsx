import { Loader } from "lucide-react";

export default function LoadingWait() {
  return <div className="flex min-w-screen min-h-screen justify-center items-center">
    <Loader size={20} color="#593392" />
  </div>
}
