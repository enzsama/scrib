import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Skeleton className="w-108 h-142 rounded-3xl" />
      </div>
    </section>
  );
};

export default Loading;
